import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { env } from './config/env.js';
import { requireApiKey } from './middleware/api-key.js';
import { errorHandler, notFoundHandler } from './middleware/error-handler.js';
import { requestContext } from './middleware/request-context.js';
import { v1Router } from './routes/v1.js';

export const app = express();

app.disable('x-powered-by');
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));
app.use(requestContext);

app.get('/health', (req, res) => {
  res.json({
    success: true,
    service: env.apiName,
    uptime: Math.round(process.uptime())
  });
});

app.use('/v1', requireApiKey, v1Router);

app.use(notFoundHandler);
app.use(errorHandler);
