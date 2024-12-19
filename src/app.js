import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import popularityRoutes from './routes/updatePopularity.js';
import getItemBySlugRoutes from './routes/getItemBySlug.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

const corsOptions = {
    origin: 'https://topwomen.careers',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/v1', popularityRoutes);
app.use('/v1', getItemBySlugRoutes);

app.listen(PORT, () => {
    console.log(`Server http://localhost:${PORT} started`);
});
