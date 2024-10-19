import db from '../models';
let createNewBookingSchedule = (bookingSchedule) => {
  return new Promise(async (resolve, reject) => {
    let newBookingSchedule = await db.BookingSchedule.create(bookingSchedule);
    resolve(newBookingSchedule);
  });
};
let postbookingScheduleByUserId = async (user_id) => {
  try {
    // Kiểm tra xem user_id có hợp lệ không
    if (!user_id) {
      throw new Error('user_id is required');
    }

    console.log('Received user_id:', user_id); // Log user_id nhận được

    let bookingScheduleByUserId = await db.BookingSchedule.findAll({
      where: { user_id: user_id },
      include: [
        {
          model: db.Clinic,
          as: 'clinic',
        },
        {
          model: db.Status,
          as: 'status',
          attributes: ['id', 'name_status'],
        },
      ],
    });

    return bookingScheduleByUserId;
  } catch (e) {
    console.error('Error in postbookingScheduleByUserId:', e);
    throw e;
  }
};

let postbookingScheduleByDoctorId = (doctor_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let bookingScheduleByDoctorId = await db.BookingSchedule.findAll({
        where: { doctor_id: doctor_id },
        include: [
          {
            model: db.Clinic,
            as: 'clinic',
          },
          {
            model: db.Status,
            as: 'status',
            attributes: ['id', 'name_status'],
          },
        ],
      });
      resolve(bookingScheduleByDoctorId);
    } catch (e) {
      reject(e);
    }
  });
};

let getBookingSchedule = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let bookingSchedule = await db.BookingSchedule.findAll({
        include: [
          {
            model: db.Clinic,
            as: 'clinic',
          },
          {
            model: db.Status,
            as: 'status',
            attributes: ['id', 'name_status'],
          },
        ],
      });
      resolve(bookingSchedule);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createNewBookingSchedule: createNewBookingSchedule,
  postbookingScheduleByUserId: postbookingScheduleByUserId,
  postbookingScheduleByDoctorId: postbookingScheduleByDoctorId,
  getBookingSchedule: getBookingSchedule,
};
