import bookingScheduleService from '../services/bookingScheduleService';
let postCreatebookingSchedule = async (req, res) => {
  let bookingSchedule = {
    name: req.body.name,
    user_id: req.body.user_id,
    doctor_id: req.body.doctor_id,
    user_id: req.body.user_id,
    id_clinic: req.body.id_clinic,
    id_time: req.body.id_time,
    price: req.body.price,
    date: req.body.date,
    status_id: 1,
  };
  try {
    await bookingScheduleService.createNewBookingSchedule(bookingSchedule);
    res.status(200).json({ status: 200, message: 'Đặt lịch thành công.' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};
let handleGetAllbookingScheduleByUserId = async (req, res) => {
  let userId = req.body.user_id;

  if (!userId) {
    return res.status(400).json({
      errCode: 1,
      errMessage: 'Chưa có user_id',
    });
  }

  try {
    let bookingScheduleByUserId =
      await bookingScheduleService.postbookingScheduleByUserId(userId);

    // Kiểm tra nếu không có bản ghi nào
    if (bookingScheduleByUserId.length === 0) {
      return res.status(200).json({
        errCode: 0,
        errMessage: 'Bạn chưa đặt lịch khám lần nào.',
        bookingSchedule: [],
      });
    }

    return res.status(200).json({
      errCode: 0,
      errMessage: 'OKE',
      bookingSchedule: bookingScheduleByUserId,
    });
  } catch (error) {
    console.error('Error in handleGetAllbookingScheduleByUserId:', error);
    return res.status(500).json({
      errCode: 1,
      errMessage: 'Internal server error: ' + error.message,
    });
  }
};

let handleGetAllbookingScheduleByDoctorId = async (req, res) => {
  let doctorId = req.body.doctor_id;
  if (!doctorId) {
    return res.status(400).json({
      errCode: 1,
      errMessage: 'chưa có DoctorId',
    });
  }
  try {
    let bookingScheduleByDoctorId =
      await bookingScheduleService.postbookingScheduleByDoctorId(doctorId);

    // Kiểm tra nếu không có bản ghi nào
    if (bookingScheduleByDoctorId.length === 0) {
      return res.status(200).json({
        errCode: 0,
        errMessage: 'Chưa có bệnh nhân nào đặt',
        bookingSchedule: [],
      });
    }

    return res.status(200).json({
      errCode: 0,
      errMessage: 'OKE',
      bookingSchedule: bookingScheduleByDoctorId,
    });
  } catch (error) {
    console.error('Error in handleGetAllbookingScheduleByDoctorId: ', error);
    return res.status(500).json({
      errCode: 1,
      errMessage: 'Internal server error: ' + error.message,
    });
  }
};
let handleGetAllbookingSchedule = async (req, res) => {
  try {
    let bookingSchedule = await bookingScheduleService.getBookingSchedule();

    // Kiểm tra nếu không có bản ghi nào
    if (bookingSchedule.length === 0) {
      return res.status(200).json({
        errCode: 0,
        errMessage: 'Chưa có bệnh nhân nào đặt',
        bookingSchedule: [],
      });
    }

    return res.status(200).json({
      errCode: 0,
      errMessage: 'OKE',
      bookingSchedule: bookingSchedule,
    });
  } catch (error) {
    console.error('Error in handleGetAllbookingScheduleByDoctorId: ', error);
    return res.status(500).json({
      errCode: 1,
      errMessage: 'Internal server error: ' + error.message,
    });
  }
};
let updateStatus = async (req, res) => {
  try {
    // Lấy id và statusId từ request body
    let { id, statusId } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!id || !statusId) {
      return res.status(400).json({
        message: 'Thiếu id hoặc statusId',
      });
    }

    // Gọi service để cập nhật status
    let updatedBookingSchedule =
      await bookingScheduleService.updateStatusBookingScheduleById(
        id,
        statusId,
      );

    // Trả về response thành công
    return res.status(200).json({
      message: 'Cập nhật status thành công',
      data: updatedBookingSchedule,
    });
  } catch (error) {
    // Xử lý lỗi
    return res.status(500).json({
      message: 'Cập nhật status thất bại',
      error: error.message,
    });
  }
};

let updateDoctorBySchedule = async (req, res) => {
  try {
    // Lấy id và statusId từ request body
    let { id, status_id, image, result, reDate } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!id || !status_id) {
      return res.status(400).json({
        message: 'Thiếu id hoặc status_id',
      });
    }

    // Gọi service để cập nhật status
    let updatedBookingSchedule =
      await bookingScheduleService.updateStatusBookingScheduleByIdWithDoctor({
        id,
        status_id,
        image,
        result,
        reDate,
      });

    // Trả về response thành công
    return res.status(200).json({
      message: 'Cập nhật thành công',
      data: updatedBookingSchedule,
    });
  } catch (error) {
    // Xử lý lỗi
    return res.status(500).json({
      message: 'Cập nhật thất bại',
      error: error.message,
    });
  }
};
module.exports = {
  postCreatebookingSchedule: postCreatebookingSchedule,
  handleGetAllbookingScheduleByUserId: handleGetAllbookingScheduleByUserId,
  handleGetAllbookingScheduleByDoctorId: handleGetAllbookingScheduleByDoctorId,
  handleGetAllbookingSchedule: handleGetAllbookingSchedule,
  updateStatus: updateStatus,
  updateDoctorBySchedule: updateDoctorBySchedule,
};
