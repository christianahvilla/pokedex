import { Injectable } from '@nestjs/common';
import { HttpClient } from '../http-client.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AxiosResponse } from 'axios';
import { HttpService as NestHttpService } from '@nestjs/axios';

@Injectable()
export class HttpService implements HttpClient {
  constructor(private readonly axiosClient: NestHttpService) {}

  get<T = any>(url: string, config?: any): Observable<T> {
    return this.axiosClient
      .get<T>(url, config)
      .pipe(map((response: AxiosResponse) => response.data));
  }

  post<T = any>(url: string, data?: any, config?: any): Observable<T> {
    return this.axiosClient
      .post<T>(url, data, config)
      .pipe(map((response: AxiosResponse) => response.data));
  }

  delete<T = any>(url: string, config?: any): Observable<T> {
    return this.axiosClient
      .delete<T>(url, config)
      .pipe(map((response: AxiosResponse) => response.data));
  }

  put<T = any>(url: string, data?: any, config?: any): Observable<T> {
    return this.axiosClient
      .put<T>(url, data, config)
      .pipe(map((response: AxiosResponse) => response.data));
  }
}
