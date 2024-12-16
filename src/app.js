require('dotenv').config();
import express from 'express';
import initRoutesApi from './routes/api.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import connection from './configs/connectBD.js';
import cors from 'cors';
const app = express();
// Cấu hình CORS
app.use(cors({ origin: 'http://localhost:2407', credentials: true }));

// Các middleware
app.use(methodOverride('_method'));
app.use(cookieParser('secret'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Kết nối cơ sở dữ liệu
connection();

// Khởi tạo các route
initRoutesApi(app);

// Middleware xử lý lỗi
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Lắng nghe trên port
app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
