const express = require("express");
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const xss = require('xss-clean');

const batchsRoutes = require('./routes/batchs');

// initializing app
const app = express();

// load environment variables
dotenv.config({ path: './config/config.env' });

const connectDB = require('./config/db');

// Setting maximum requests to 1000 request per 10 mins for every user
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 1000
});
app.use(limiter);

connectDB();


app.use(helmet());

// Body parser
app.use(express.json());

// Prevent XSS attacks
app.use(xss());

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use("/batchs", batchsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`server running on port ${PORT}`));
