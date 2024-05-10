export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.MONGO_DB,
  port: process.env.PORT || 3000,
  httpClient: process.env.HTTP_CLIENT || 'axios',
});
