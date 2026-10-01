const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const topicRoute = require('./routes/topicRoute')
const questionRoute = require('./routes/questionRoute');
const path = require('path');
dotenv.config();
const app = express();
connectDB();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/topic', topicRoute);
app.get('/', (req, res) => {
    res.send('Backend Working');
});
app.use('/api/questions', questionRoute);
app.use('/api/result', require('./routes/quizResult'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});