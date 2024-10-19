import db from '../models';
let getAllTime = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let times = await db.TimeSchedule.findAll();
      resolve(times);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = { getAllTime: getAllTime };
