import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggerService } from 'src/modules/logger/logger.service';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, body, query } = req;

    const start = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const duration = Date.now() - start;

      this.loggerService.log(
        `
        Request: ${method} ${originalUrl} ${statusCode}
        Query: ${JSON.stringify(query)}
        Body: ${JSON.stringify(body)}
        Duration: ${duration}ms
        `,
        HttpLoggerMiddleware.name,
      );
    });

    next();
  }
}
