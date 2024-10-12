import dotenv from 'dotenv';
import app from './app';

// Carrega as variáveis do arquivo .env
dotenv.config();
const port = +process.env.APP_PORT;

app.listen(port, () => console.log(`🚀 App is running at port ${port}...`));
