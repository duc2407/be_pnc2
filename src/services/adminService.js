import db from '../models';

let getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.Users.findAll({
        attributes: {
          exclude: ['password'],
        },
        where: { roleId: 5 },
      });
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};
let getAllDoctors = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctors = await db.Users.findAll({
        attributes: {
          exclude: ['password'],
        },
        where: { roleId: 4 },
      });
      resolve(doctors);
    } catch (e) {
      reject(e);
    }
  });
};
let getAllSales = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let sales = await db.Users.findAll({
        attributes: {
          exclude: ['password'],
        },
        where: { roleId: 3 },
      });
      resolve(sales);
    } catch (e) {
      reject(e);
    }
  });
};
let getAllExperts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let experts = await db.Users.findAll({
        attributes: {
          exclude: ['password'],
        },
        where: { roleId: 2 },
      });
      resolve(experts);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getAllUsers: getAllUsers,
  getAllDoctors: getAllDoctors,
  getAllSales: getAllSales,
  getAllExperts: getAllExperts,
};
