const express = require('express');
const env = require('dotenv'); //For the .env File
const mongoose = require('mongoose'); //For MongoDB Connection and Data Schema
const path = require('path');
const cors = require('cors');

//Configurations
const app = express();
env.config();

//Routes
const authenticationRoutes = require('./routes/authentication');
const adminAuthRouetes = require('./routes/admin/authentication');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const initialDataRoutes = require('./routes/admin/initialData');

//Middlewares
app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')))
app.use('/OTP', authenticationRoutes);
app.use('/OTP', adminAuthRouetes);
app.use('/OTP', categoryRoutes);
app.use('/OTP', productRoutes);
app.use('/OTP', cartRoutes);
app.use('/OTP', initialDataRoutes);


//MongoDB Connection
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.r22ypyw.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
    {useNewUrlParser: true, useUnifiedTopology: true}
).then(() => {
    console.log("Database Connection Successful!")
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})