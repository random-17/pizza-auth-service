import app from './app';
import { env } from './config/env';
import { logger } from './config/logger';

function bootstrap() {
  try {
    app.listen(env.PORT, () =>
      logger.info(`Application is running on: http://localhost:${env.PORT}`),
    );
  } catch (err) {
    if (err instanceof Error) {
      logger.error(err);
      setTimeout(() => process.exit(1), 1000);
    }
  }
}

bootstrap();
