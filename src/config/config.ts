import 'dotenv/config';
import config from 'config';

const NODE_ENV = process.env.NODE_ENV;
const LOG_LEVEL_CONSOLE = config.get<string>('log.level.console');
const LOG_LEVEL_FILE = config.get<string>('log.level.file');
const DOMAIN_FE = process.env.DOMAIN_FE;
const SERVER_PORT = process.env.SERVER_PORT;

const ACCESS_SECRET = config.get<string>('token.secret.access');
const REFRESH_SECRET = config.get<string>('token.secret.refresh');
const SESSION_SALT = config.get<string>('token.salt');

const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE_PORT = +(process.env.DATABASE_PORT || '0');
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_NAME = NODE_ENV !== 'test' ? process.env.DATABASE_NAME : config.get<string>('database.name');

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = +(process.env.SMTP_PORT || '0');
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
const MAIL_SENDER = process.env.MAIL_SENDER;

const smtpSecureAsString = process.env.SMTP_SECURE;
const SMTP_SECURE: boolean = smtpSecureAsString ? smtpSecureAsString.toLowerCase() === 'true' : true;

const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME || '';
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || '';
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || '';

const ACCESS_TOKEN_EXPIRES_IN_AS_SECONDS = 3600;
const REFRESH_TOKEN_EXPIRES_IN_AS_SECONDS = 86400;
const ID_TOKEN_EXPIRES_IN_AS_SECONDS = 86400;
const RESET_PASSWORD_TOKEN_EXPIRY_DURATION_IN_HOURS = 24;

const ID_TOKEN_PRIVATE_KEY_AS_BASE64 = process.env.ID_TOKEN_PRIVATE_KEY_AS_BASE64 as string;
const ID_TOKEN_PRIVATE_KEY = Buffer.from(ID_TOKEN_PRIVATE_KEY_AS_BASE64, 'base64').toString('utf8');

const ID_TOKEN_PUBLIC_KEY_AS_BASE64 = process.env.ID_TOKEN_PUBLIC_KEY_AS_BASE64 as string;
const ID_TOKEN_PUBLIC_KEY = Buffer.from(ID_TOKEN_PUBLIC_KEY_AS_BASE64, 'base64').toString('utf8');

export const appConfig = {
  NODE_ENV,
  LOG_LEVEL_CONSOLE,
  LOG_LEVEL_FILE,
  DOMAIN_FE,
  SERVER_PORT,

  ACCESS_SECRET,
  REFRESH_SECRET,
  SESSION_SALT,

  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,

  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASSWORD,
  SMTP_SECURE,
  MAIL_SENDER,

  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,

  ID_TOKEN_PRIVATE_KEY,
  ID_TOKEN_PUBLIC_KEY_AS_BASE64,
  ID_TOKEN_PUBLIC_KEY,
};
