import 'dotenv/config';
import config from 'config';

const NODE_ENV = process.env.NODE_ENV;
const SESSION_SECRET = process.env.SESSION_SECRET || '';
const SESSION_SALT = process.env.SESSION_SALT || '';
const LOG_LEVEL_CONSOLE = config.get<string>('log.level.console');
const LOG_LEVEL_FILE = config.get<string>('log.level.file');

const CORS_ALLOWED_ORIGNS = process.env.CORS_ALLOWED_ORIGNS;
const SERVER_PORT = process.env.SERVER_PORT;
const DATABASE_URL = process.env.DATABASE_URL;

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
const smtpSecureAsString = process.env.SMTP_SECURE;
const SMTP_SECURE: boolean = smtpSecureAsString ? smtpSecureAsString.toLowerCase() === 'true' : true;

const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME || '';
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || '';
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || '';

const ACCESS_TOKEN_EXPIRES_IN_AS_SECONDS = 3600;
const REFRESH_TOKEN_EXPIRES_IN_AS_SECONDS = 86400;
const ID_TOKEN_EXPIRES_IN_AS_SECONDS = 86400;
const RESET_PASSWORD_TOKEN_EXPIRY_DURATION_IN_HOURS = 24;

const RESET_PASSWORD_LINK = 'http://localhost:3000/reset-password?token=';
const MAIL_SENDER = '"MyApp" <manumuradev@gmail.com>';

export const appConfig = {
  NODE_ENV,
  SESSION_SECRET,
  SESSION_SALT,
  CORS_ALLOWED_ORIGNS,
  SERVER_PORT,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASSWORD,
  SMTP_SECURE,
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  LOG_LEVEL_CONSOLE,
  LOG_LEVEL_FILE,
  RESET_PASSWORD_LINK,
  MAIL_SENDER,
};
