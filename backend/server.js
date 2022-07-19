const express = require('express');
const app = express();
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const notFound = require('./middleware/errorHandler');
const cors = require('cors');
app.use(express.json());

require("dotenv/config");
connectDB();

app.use(cors({
    credentials: true,
    origin:true
}))

app.use('/user', userRoutes);

app.use('/message', messageRoutes);

app.use(notFound);

const port = process.env.PORT 

app.listen(port, (req, res) => {
    console.log(`Started on port ${port}...`);
})