import notificationService from '../services/notificationService';
let handleGetAllNotificationByIdUser = async (req, res) => {
  let data = { recipient_id: req.body.recipient_id };
  let notifications = await notificationService.getAllNotifications(data);
  return res.status(200).json({
    errCode: 0,
    errMessage: 'OKE',
    notifications: notifications,
  });
};
let postCreateNotification = async (req, res) => {
  let notification = {
    id: req.body.id,
    title: req.body.title,
    body: req.body.body,
    recipient_id: req.body.recipient_id,
  };
  try {
    await notificationService.createNotification(notification);
    res.status(200).json({ status: 200, message: 'Tạo thông báo thành công' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};
module.exports = {
  handleGetAllNotificationByIdUser: handleGetAllNotificationByIdUser,
  postCreateNotification: postCreateNotification,
};
