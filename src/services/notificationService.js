import db from '../models';
let createNotification = (data) => {
  return new Promise(async (resolve, reject) => {
    let newNotification = await db.Notifications.create(data);
    resolve(newNotification);
  });
};
let getAllNotifications = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let notifications = await db.Notifications.findAll({
        where: { recipient_id: data.recipient_id },
      });
      resolve(notifications);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createNotification: createNotification,
  getAllNotifications: getAllNotifications,
};
