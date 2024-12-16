import db, { Sequelize } from '../models';
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
          {
            model: db.Users,
            as: 'user',
            required: true,
            where: {
              id: Sequelize.col('BookingSchedule.user_id'), // Điều kiện để lấy người dùng
            },
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
let updateStatusBookingScheduleById = (id, newStatusId) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Tìm booking schedule qua id
      let bookingSchedule = await db.BookingSchedule.findOne({
        where: { id: id },
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

      // Nếu không tìm thấy bookingSchedule, trả về reject
      if (!bookingSchedule) {
        return reject('Booking Schedule không tồn tại');
      }

      // Cập nhật statusId
      bookingSchedule.status_id = newStatusId;

      // Lưu lại thay đổi
      await bookingSchedule.save();

      resolve(bookingSchedule);
    } catch (e) {
      reject(e);
    }
  });
};

let updateStatusBookingScheduleByIdWithDoctor = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Tìm booking schedule qua id
      let bookingSchedule = await db.BookingSchedule.findOne({
        where: { id: data.id },
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

      // Nếu không tìm thấy bookingSchedule, trả về reject
      if (!bookingSchedule) {
        return reject('Booking Schedule không tồn tại');
      }

      // Cập nhật statusId
      bookingSchedule.status_id = data.status_id;
      bookingSchedule.image = data.image;
      bookingSchedule.result = data.result;
      bookingSchedule.reDate = data.reDate;
      // Lưu lại thay đổi
      await bookingSchedule.save();

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
  updateStatusBookingScheduleById: updateStatusBookingScheduleById,
  updateStatusBookingScheduleByIdWithDoctor:
    updateStatusBookingScheduleByIdWithDoctor,
};
