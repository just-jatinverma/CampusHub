import { config } from 'dotenv';

config();

const _constants = {
  port: process.env.PORT,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
};

export const constants = Object.freeze(_constants);
