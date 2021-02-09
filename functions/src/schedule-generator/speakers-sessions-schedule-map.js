function sessionsSpeakersScheduleMap(sessionsRaw, scheduleRaw) {
  let schedule = {};
  const sessions = {};
  let scheduleTags = [];

  for (const dayKey of Object.keys(scheduleRaw)) {
    const month = scheduleRaw[dayKey];
    let dayTags = [];
    const timeslots = [];
    const extensions = {};

    const timeslotLen = month.timeslots.length;
    for (let timeslotsIndex = 0; timeslotsIndex < timeslotLen; timeslotsIndex++) {
      const timeslot = month.timeslots[timeslotsIndex];
      let innerSessions = [];

      const sessionsLen = timeslot.sessions.length;
      for (let sessionIndex = 0; sessionIndex < sessionsLen; sessionIndex++) {
        const subSessions = [];

        const subSessionsLen = timeslot.sessions[sessionIndex].items.length;
        for (let subSessionIndex = 0; subSessionIndex < subSessionsLen; subSessionIndex++) {
          const sessionId = timeslot.sessions[sessionIndex].items[subSessionIndex];
          const subsession = sessionsRaw[sessionId];
          const mainTag = subsession.tags ? subsession.tags[0] : 'General';
          // const endTimeRaw = timeslot.sessions[sessionIndex].extend
          //   ? day.timeslots[timeslotsIndex + timeslot.sessions[sessionIndex].extend - 1].endTime
          //   : timeslot.endTime;
          // const endTime =
          //   subSessionsLen > 1
          //     ? getEndTime(
          //       dayKey,
          //       timeslot.startTime,
          //       endTimeRaw,
          //       subSessionsLen,
          //       subSessionIndex + 1
          //     )
          //     : endTimeRaw;
          // const startTime =
          //   subSessionsLen > 1 && subSessionIndex > 0
          //     ? sessions[timeslot.sessions[sessionIndex].items[subSessionIndex - 1]].endTime
          //     : timeslot.startTime;

          if (subsession.tags) {
            dayTags = [...new Set([...dayTags, ...subsession.tags])];
          }
          scheduleTags = addTagTo(scheduleTags || [], mainTag);

          const finalSubSession = Object.assign({}, subsession, {
            mainTag,
            id: sessionId.toString(),
            month: dayKey,
          });

          subSessions.push(finalSubSession);
          sessions[sessionId] = finalSubSession;
        }

        const start = `${timeslotsIndex + 1} / ${sessionIndex + 1}`;
        const end = `${timeslotsIndex + (timeslot.sessions[sessionIndex].extend || 0) + 1} / ${
          sessionsLen !== 1
            ? sessionIndex + 2
            : Object.keys(extensions).length
              ? Object.keys(extensions)[0]
              : 1
          }`;

        if (timeslot.sessions[sessionIndex].extend) {
          extensions[sessionIndex + 1] = timeslot.sessions[sessionIndex].extend;
        }

        innerSessions = [
          ...innerSessions,
          {
            gridArea: `${start} / ${end}`,
            items: subSessions,
          },
        ];
      }

      for (const [key, value] of Object.entries(extensions)) {
        if (value === 1) {
          delete extensions[key];
        } else {
          extensions[key] = value - 1;
        }
      }

      timeslots.push(
        Object.assign({}, timeslot, {
          sessions: innerSessions,
        })
      );
    }

    schedule = Object.assign({}, schedule, {
      [dayKey]: Object.assign({}, month, {
        timeslots
      }),
    });
  }

  return {
    sessions,
    schedule,
  };
}


function addTagTo(array, element) {
  if (array.indexOf(element) < 0) {
    return [...array, element];
  }
}

export default sessionsSpeakersScheduleMap;
