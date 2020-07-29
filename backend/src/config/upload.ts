import path from 'path';
import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  tmpFolder: string;
  uploadsFolder: string;
  driver: 's3' | 'disk';
  multer: {
    storage: StorageEngine;
  };
  config: {
    disk: {};
    aws: {
      bucket: string;
    };
  };
}

export default {
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),
  driver: process.env.STORAGE_DRIVER,
  multer: {
    storage: multer.diskStorage({
      destination: path.resolve(tmpFolder, 'uploads'),
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('HEX');
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  },
  config: {
    disk: {},
    aws: {
      bucket: 'app-gobarber-gsb6',
    },
  },
} as IUploadConfig;
