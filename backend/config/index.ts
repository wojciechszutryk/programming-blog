import dotenv from "dotenv";
import config from "./config.json";

dotenv.config();

type DB = {
  dialect: string;
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
};

type Security = {
  secretKey: string;
  expiresIn: string;
};

type Server = {
  port: number;
};

const {
  DB_DIALECT = "",
  DB_PORT = "0",
  DB_HOST = "",
  DB_DATABASE = "",
  DB_USERNAME = "",
  DB_PASSWORD = "",
} = process.env;

const db: DB = {
  dialect: DB_DIALECT,
  port: parseInt(DB_PORT, 10),
  host: DB_HOST,
  database: DB_DATABASE,
  username: DB_USERNAME,
  password: DB_PASSWORD,
};

const { server, security } = config;

export const $db: DB = db;
export const $server: Server = server;
export const $security: Security = security;
