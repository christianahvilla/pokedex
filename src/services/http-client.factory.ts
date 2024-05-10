import { HttpService } from './http/http.service';
import { FetchService } from './fetch/fetch.service';
import { HttpClient } from './http-client.interface';
import { ConfigService } from '@nestjs/config';

export const httpClientFactory = {
  provide: 'HTTP_CLIENT',
  useFactory: (
    httpService: HttpService,
    fetchService: FetchService,
    configService: ConfigService,
  ): HttpClient => {
    const service = configService.get<string>('httpClient');

    switch (service) {
      case 'axios':
        return httpService;
      case 'fetch':
        return fetchService;
      default:
        throw new Error(`Unsupported HTTP service: ${service}`);
    }
  },
  inject: [HttpService, FetchService, ConfigService],
};
