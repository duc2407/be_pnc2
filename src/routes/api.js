import express from 'express';
import userController from '../controller/userController';
import adminController from '../controller/adminController';
import clinicController from '../controller/clinicController';
import timeScheduleController from '../controller/timeScheduleController';
import bookingSchedulesController from '../controller/bookingSchedulesController';
import priceController from '../controller/priceController';
import paymentController from '../controller/paymentController';

let router = express.Router();
let initRoutesApi = (app) => {
  //admin
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
  //expert
  //sale
  //doctor
  router.post(
    '/api/get-all-booking-schedule-by-doctor-id',
    bookingSchedulesController.handleGetAllbookingScheduleByDoctorId,
  );
  //user
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
