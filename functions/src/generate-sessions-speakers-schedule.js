import * as functions from 'firebase-functions';
import { firestore } from 'firebase-admin';
import mapSessionsSpeakersSchedule from './schedule-generator/speakers-sessions-schedule-map';

export const sessionsWrite = functions.firestore
  .document('sessions/{sessionId}')
  .onWrite(async () => {
    return generateAndSaveData();
  });

export const scheduleWrite = functions.firestore
  .document('schedule/{scheduleId}')
  .onWrite(async () => {
    const scheduleConfig = functions.config().schedule;
    if (!scheduleConfig || typeof scheduleConfig.enabled === 'undefined') {
      console.error(
        // eslint-disable-next-line
        'Schedule config is NOT set! Run `firebase functions:config:set schedule.enabled=true`, redeploy functions and try again.'
      );
      return null;
    }
    if (scheduleConfig.enabled === 'true') {
      return generateAndSaveData();
    }
    return null;
  });

async function generateAndSaveData() {
  const sessionsPromise = firestore().collection('sessions').get();
  const schedulePromise = firestore().collection('schedule').orderBy('date', 'desc').get();

  const [sessionsSnapshot, scheduleSnapshot] = await Promise.all([
    sessionsPromise,
    schedulePromise,
  ]);

  const sessions = {};
  const schedule = {};

  sessionsSnapshot.forEach((doc) => {
    sessions[doc.id] = doc.data();
  });

  scheduleSnapshot.forEach((doc) => {
    schedule[doc.id] = doc.data();
  });

  let generatedData = {};
  const scheduleConfig = functions.config().schedule;
  if (!scheduleConfig || typeof scheduleConfig.enabled === 'undefined') {
    console.error(
      // eslint-disable-next-line
      'Schedule config is NOT set! Run `firebase functions:config:set schedule.enabled=true`, redeploy functions and try again.'
    );
    return null;
  }
  const scheduleEnabled = scheduleConfig.enabled === 'true';

  if (scheduleEnabled) {
    generatedData = mapSessionsSpeakersSchedule(sessions, schedule)
  }

  // If changed speaker does not have assigned session(s) yet

  saveGeneratedData(generatedData.sessions, 'generatedSessions');
  saveGeneratedData(generatedData.schedule, 'generatedSchedule');
}

function saveGeneratedData(data, collectionName) {
  if (!data || !Object.keys(data).length) return;

  for (let index = 0; index < Object.keys(data).length; index++) {
    const key = Object.keys(data)[index];
    firestore().collection(collectionName).doc(key).set(data[key]);
  }
}
