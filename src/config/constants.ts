import { config } from 'dotenv';

config();

const _constants = {
  port: process.env.PORT,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  imageKitPublicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  imageKitPrivateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  imageKitUrlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
};

export const constants = Object.freeze(_constants);
