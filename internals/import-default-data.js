import { initializeFirebase, firestore } from './firebase-config';
import data from '../docs/default-firebase-data.json';

const importSpeakers = () => {
  const speakers = data.speakers;
  if (!Object.keys(speakers).length) {
    return false;
  }
  console.log('\tImporting', Object.keys(speakers).length, 'speakers...');

  const batch = firestore.batch();

  Object.keys(speakers).forEach((speakerId, order) => {
    batch.set(firestore.collection('speakers').doc(speakerId), {
      ...speakers[speakerId],
      order,
    });
  });

  return batch.commit().then((results) => {
    console.log('\tImported data for', results.length, 'speakers');
    return results;
  });
};

const importGallery = () => {
  const gallery = data.gallery;
  if (!Object.keys(gallery).length) {
    return false;
  }
  console.log('\tImporting gallery...');

  const batch = firestore.batch();

  Object.keys(gallery).forEach((docId) => {
    batch.set(firestore.collection('gallery').doc(`${docId}`.padStart(3, 0)), {
      url: gallery[docId],
      order: docId,
    });
  });

  return batch.commit().then((results) => {
    console.log('\tImported data for', results.length, 'images');
    return results;
  });
};

const importNews = () => {
  const news = data.news;
  if (!Object.keys(news).length) {
    return false;
  }
  console.log('\tImporting news...');

  const batch = firestore.batch();

  Object.keys(news).forEach((docId) => {
    batch.set(firestore.collection('news').doc(docId), news[docId]);
  });

  return batch.commit().then((results) => {
    console.log('\tImported data for', results.length, 'news posts');
    return results;
  });
};

const importOpini = () => {
  const opini = data.opini;
  if (!Object.keys(opini).length) {
    return false;
  }
  console.log('\tImporting opini...');

  const batch = firestore.batch();

  Object.keys(opini).forEach((docId) => {
    batch.set(firestore.collection('opini').doc(docId), opini[docId]);
  });

  return batch.commit().then((results) => {
    console.log('\tImported data for', results.length, 'opini  posts');
    return results;
  });
};

const importVideos = () => {
  const docs = data.videos;
  if (!Object.keys(docs).length) {
    return false;
  }
  console.log('\tImporting videos...');

  const batch = firestore.batch();

  Object.keys(docs).forEach((docId) => {
    batch.set(firestore.collection('videos').doc(`${docId}`.padStart(3, 0)), {
      ...docs[docId],
      order: docId,
    });
  });

  return batch.commit().then((results) => {
    console.log('\tImported data for', results.length, 'videos');
    return results;
  });
};

const importSessions = () => {
  const docs = data.sessions;
  if (!Object.keys(docs).length) {
    return false;
  }
  console.log('\tImporting sessions...');

  const batch = firestore.batch();

  Object.keys(docs).forEach((docId) => {
    batch.set(firestore.collection('sessions').doc(docId), docs[docId]);
  });

  return batch.commit().then((results) => {
    console.log('\tImported data for', results.length, 'sessions');
    return results;
  });
};

const importSchedule = () => {
  const docs = data.schedule;
  if (!Object.keys(docs).length) {
    return false;
  }
  console.log('\tImporting schedule...');

  const batch = firestore.batch();

  Object.keys(docs).forEach((docId) => {
    batch.set(firestore.collection('schedule').doc(docId), {
      ...docs[docId],
      date: docId,
    });
  });

  return batch.commit().then((results) => {
    console.log('\tImported data for', Object.keys(docs).length, 'days');
    return results;
  });
};

const importNotificationsConfig = async () => {
  const notificationsConfig = data.notifications.config;
  console.log('Migrating notifications config...');
  const batch = firestore.batch();

  batch.set(firestore.collection('config').doc('notifications'), notificationsConfig);

  return batch.commit().then((results) => {
    console.log('\tImported data for notifications config');
    return results;
  });
};

initializeFirebase()
  .then(() => importNews())
  .then(() => importOpini())
  .then(() => importGallery())
  .then(() => importNotificationsConfig())
  .then(() => importSchedule())
  .then(() => importSessions())
  .then(() => importSpeakers())
  .then(() => importVideos())

  .then(() => {
    console.log('Finished');
    process.exit();
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });
