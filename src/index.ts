import dotenv from 'dotenv';
dotenv.config();

import app from './interfaces/http/app';
import logger from './infrastructure/logging/logger';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
