import { createAppInstance, setupMiddleware } from './app';

async function bootstrap() {
  const app = await createAppInstance();

  setupMiddleware(app);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
