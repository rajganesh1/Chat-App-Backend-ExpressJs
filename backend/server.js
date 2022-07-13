const express = require('express');
const app = express();
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const notFound = require('./middleware/errorHandler');
app.use(express.json());

require("dotenv/config");
connectDB();

app.use('/api/user', userRoutes);

app.use('/api/chat', chatRoutes);

app.use('/api/message', messageRoutes);

app.use(notFound);

const port = process.env.PORT 

app.listen(port, (req, res) => {
    console.log(`Started on port ${port}...`);
})