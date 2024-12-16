import express from 'express';
import userController from '../controller/userController';
import adminController from '../controller/adminController';
import clinicController from '../controller/clinicController';
import timeScheduleController from '../controller/timeScheduleController';
import bookingSchedulesController from '../controller/bookingSchedulesController';
import priceController from '../controller/priceController';
import paymentController from '../controller/paymentController';
import doctorController from '../controller/doctorController';
import notificationController from '../controller/notificationController';
import diagnosisController from '../controller/diagnosisController';
import typeProductController from '../controller/typeProductController';
import uploadController from '../controller/uploadController';
import cartController from '../controller/cartController';
import orderController from '../controller/orderController';
import adressController from '../controller/adressController';
let router = express.Router();

const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const upload = multer({ dest: 'uploads/' });
cloudinary.config({
  cloud_name: 'dwrzqougi',
  api_key: '323394711275381',
  api_secret: 'ufwifjVxqrBBLMuWi6KAaUZaMZ4',
});

// Cấu hình nơi lưu trữ (Cloudinary)
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'demo', // Thư mục trong Cloudinary
//     allowedFormats: ['jpg', 'png'],
//   },
// });
let initRoutesApi = (app) => {
  router.post(
    '/api/upload',
    upload.single('image'),
    uploadController.uploadImage,
  );
  //admin
  router.post('/api/login-management', doctorController.handleLoging);
  router.post(
    '/api/create-employee',
    adminController.postCreateDoctorSaleExpert,
  );
  router.get('/api/get-all-experts', adminController.handleGetAllExpert);
  router.get('/api/get-all-sales', adminController.handleGetAllSale);
  router.get('/api/get-all-doctors', adminController.handleGetAllDoctor);
  router.get('/api/get-all-users', adminController.handleGetAllUsers);
  router.get('/api/get-all-price', priceController.handleGetAllPrice);
  router.get('/api/get-all-clinics', clinicController.handleGetAllClinics);
  router.get(
    '/api/get-all-booking-schedule',
    bookingSchedulesController.handleGetAllbookingSchedule,
  );
  router.post(
    '/api/create-notification',
    notificationController.postCreateNotification,
  );
  //expert
  router.get('/api/symptom', diagnosisController.handleGetAllSymptom);
  router.get('/api/diseases', diagnosisController.getDiseases);
  router.post('/api/diagnosis', diagnosisController.diagnose);
  //sale
  //doctor
  router.post(
    '/api/get-all-booking-schedule-by-doctor-id',
    bookingSchedulesController.handleGetAllbookingScheduleByDoctorId,
  );
  router.put(
    '/api/update-about-schedule',
    bookingSchedulesController.updateDoctorBySchedule,
  );
  //user
  router.post(
    '/api/get-all-order-by-userid',
    orderController.getAllOrdersByUserId,
  );
  router.delete(
    '/api/delete-product-on-cart',
    cartController.deleteProductOnCart,
  );
  router.put('/api/cart/update-quantity', cartController.updateQuantityInCart);
  router.post('/api/create-cart', cartController.postCreateCart);
  router.post('/api/create-adress-user', adressController.createAdress);
  router.post('/api/add-cart', cartController.postAddProductOnCart);
  router.post('/api/create-order', orderController.createOrder);
  router.get(
    '/api/get-all-product-by-type',
    typeProductController.handleGetAllProductbyType,
  );
  router.post(
    '/api/get-notification-by-user',
    notificationController.handleGetAllNotificationByIdUser,
  );
  router.post(
    '/api/update-status-booking-schedule',
    bookingSchedulesController.updateStatus,
  );
  router.put('/api/update-avatar', userController.updateAvatar);
  router.put('/api/update-id-payment', userController.updateUserController);
  router.post('/api/get-payment-by-id', paymentController.postPaymentById);
  router.post('/api/create-payment', paymentController.postCreatePayment);
  router.post(
    '/api/create-booking-schedule',
    bookingSchedulesController.postCreatebookingSchedule,
  );
  router.post(
    '/api/get-all-booking-schedule-by-user-id',
    bookingSchedulesController.handleGetAllbookingScheduleByUserId,
  );
  router.get('/api/get-all-times', timeScheduleController.handleGetAllTime); // times

  router.post('/api/login', userController.handleLoging);

  router.post('/api/register-user', userController.postCreateUser);
  router.get('/api', (req, res) => {
    res.send('active');
  });

  return app.use('/', router);
};
module.exports = initRoutesApi;
