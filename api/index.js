require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const categoryRoute = require('./routes/categories');



const app = express();
const port = process.env.PORT || 5000;


//MONGO CONNECTION
const connection = async () => {
    try {
        mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');
    } catch (err) {
        throw err;
    }
}

//MULTER STORAGE
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    }, filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
})

const upload = multer({ storage: storage })
app.post('/api/upload', upload.single('file'), (req, res) => {
    res.status(200).json('File is uploaded');
})


//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/images', express.static(path.join(__dirname, "/images")))




app.use('/api/auth/', authRoute);
app.use('/api/user/', userRoute);
app.use('/api/posts/', postRoute);
app.use('/api/category/', categoryRoute)

app.listen(port, () => {
    console.log('Listining on port ' + port);
    connection()
})