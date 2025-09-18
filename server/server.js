import express from 'express';
import connectDB from './lib/mongodb.js';
import 'dotenv/config';
import cors from 'cors';
import routes from './routes/routes.js';

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

const allowedOrigins = [
    process.env.FRONTEND_URL,
    'https://puzzle-paradise.onrender.com',
    'http://localhost:5173'
];

app.use(cors({
    origin: function(origin, callback){
        // allow requests with no origin (like curl or server-to-server)
        if (!origin) return callback(null, true);

        const isAllowed = allowedOrigins.includes(origin)
            || /\.vercel\.app$/.test(origin); // Allow Vercel preview domains

        if (isAllowed) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

app.get('/', (req, res)=>{
    res.send("API is running...")
})

// Global error handler (e.g., Multer, ImageKit, validation)
// Must be after routes
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    if (err?.name === 'MulterError') {
        return res.status(400).json({ success: false, message: `Upload error: ${err.message}` });
    }
    if (err?.message === 'Not allowed by CORS') {
        return res.status(403).json({ success: false, message: err.message });
    }
    res.status(500).json({ success: false, message: err?.message || 'Internal Server Error' });
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});






