import express from 'express';
import userRoutes from './routes/user';
import dotenv from 'dotenv'; 
import shortenRoutes from './routes/shorten';
import { authMiddleware } from './middlewares/auth';

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para interpretar JSON
app.use(express.json());

app.use("/users",userRoutes);
app.use("/shorten",authMiddleware,shortenRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
