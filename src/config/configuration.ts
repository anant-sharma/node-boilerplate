export default () => ({
  APP_NAME: process.env.APP_NAME || '',
  PORT: parseInt(process.env.PORT || '', 10) || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'a_very_secure_secret',
});
