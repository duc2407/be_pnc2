import timeScheduleService from '../services/timeScheduleService';
let handleGetAllTime = async (req, res) => {
  let times = await timeScheduleService.getAllTime();
  return res.status(200).json({
    errCode: 0,
    errMessage: 'OKE',
    times: times,
  });
};
module.exports = { handleGetAllTime: handleGetAllTime };
