import express from 'express';
import connectDB from './lib/mongodb.js';
import 'dotenv/config';
import cors from 'cors';
import routes from './routes/routes.js';

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:3000', 'http://localhost:5173'];

app.use(cors({
    origin: function(origin, callback){
        // allow requests with no origin
          if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

app.get('/', (req, res)=>{
    res.send("API is running...")
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});






