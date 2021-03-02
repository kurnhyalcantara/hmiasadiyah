import {
  importBlog,
  importGallery,
  importNotificationsConfig,
  importSchedule,
  importSessions,
  importSpeakers,
  importVideos,
} from './utils';

importBlog()
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
  .catch((err: Error) => {
    console.log(err);
    process.exit();
  });
