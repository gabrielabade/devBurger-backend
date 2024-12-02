import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import { extname } from 'node:path';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

// Configuração do cliente S3
const s3 = new S3Client({
  region: process.env.S3_REGION || 'us-east-1',
  endpoint: process.env.S3_ENDPOINT_URL, // Apenas se estiver usando S3 compatível
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true, // Força o uso do estilo de caminho (necessário para MinIO, DigitalOcean Spaces, etc.)
});

// Configuração do Multer com S3
const multerConfig = {
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME, // Nome do bucket S3
    acl: 'public-read', // Permissão pública para o arquivo
    key: (req, file, cb) => {
      // Gerar um nome único para o arquivo (usando UUID e a extensão do arquivo original)
      const fileName = `${uuidv4()}${extname(file.originalname)}`;
      // A chave será o nome e caminho dentro do bucket
      cb(null, `uploads/${fileName}`);
    },
  }),
  limits: {
    fileSize: 50 * 1024 * 1024, // Limite de 50MB para o arquivo
  },
};

export default multerConfig;
