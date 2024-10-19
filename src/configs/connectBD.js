const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('pnc2', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',
  dialectModule: require('mysql2'),
});


const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default connection;
