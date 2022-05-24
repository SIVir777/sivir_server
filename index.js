require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./router/index.js');
const errorMiddleware = require('./middlewares/error-middleware.js');

const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}));
app.use('/api', router);
app.use(errorMiddleware);

app.listen(PORT, () => console.log(`SERVER started on PORT = ${PORT}`));
