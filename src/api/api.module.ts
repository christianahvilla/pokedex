import { Global, Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { HttpModule } from '@nestjs/axios';
import { HttpService } from 'src/services/http/http.service';
import { FetchService } from 'src/services/fetch/fetch.service';
import { httpClientFactory } from 'src/services/http-client.factory';

@Global()
@Module({
  imports: [HttpModule],
  providers: [ApiService, HttpService, FetchService, httpClientFactory],
  exports: [ApiService],
})
export class ApiModule {}
