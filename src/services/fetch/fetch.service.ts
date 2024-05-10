import { Injectable } from '@nestjs/common';
import { HttpClient } from '../http-client.interface';
import { from, Observable } from 'rxjs';

@Injectable()
export class FetchService implements HttpClient {
  get<T = any>(url: string, config?: any): Observable<T> {
    return from(fetch(url, config).then((response) => response.json()));
  }
  post<T = any>(url: string, data?: any, config?: any): Observable<T> {
    return from(
      fetch(url, {
        ...config,
        body: data,
      }).then((response) => response.json()),
    );
  }

  delete<T = any>(url: string, config?: any): Observable<T> {
    return from(fetch(url, config).then((response) => response.json()));
  }
  put<T = any>(url: string, data?: any, config?: any): Observable<T> {
    return from(
      fetch(url, {
        ...config,
        body: data,
      }).then((response) => response.json()),
    );
  }
}
