import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { HttpClient } from 'src/services/http-client.interface';

@Injectable()
export class ApiService {
  constructor(
    @Inject('HTTP_CLIENT')
    private readonly httpClient: HttpClient,
  ) {}

  fetchDataFromExternalApi<T>(url: string, config: any): Observable<T> {
    return this.httpClient.get(url, config);
  }

  postDataToExternalApi<T>(url: string, data: any, config: any): Observable<T> {
    return this.httpClient.post(url, data, config);
  }

  updateDataInExternalApi<T>(
    url: string,
    data: any,
    config: any,
  ): Observable<T> {
    return this.httpClient.put(url, data, config);
  }

  deleteDataFromExternalApi<T>(url: string, config: any): Observable<T> {
    return this.httpClient.delete(url, config);
  }
}
