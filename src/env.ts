// env.ts
export interface ENVType {
  JWT_KEY: string;
  MONGO_URL: string;
  MINIO_URL: string;
  MINIO_ACCESS_ID: string;
  MINIO_ACCESS_KEY: string;
}

function getEnv(name: string): string {
  const val = process.env[name];
  if (!val) {
    throw new Error(`${name} not declared in .env`);
  }
  return val;
}

const env = {
  JWT_KEY: getEnv("JWT_KEY"),
  MONGO_URL: getEnv("MONGO_URL"),
  MINIO_URL: getEnv("MINIO_URL"),
  MINIO_ACCESS_ID: getEnv("MINIO_ACCESS_ID"),
  MINIO_ACCESS_KEY: getEnv("MINIO_ACCESS_KEY"),
}

export default env;
