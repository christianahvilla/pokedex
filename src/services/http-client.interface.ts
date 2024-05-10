import { Observable } from 'rxjs';

export interface HttpClient {
  get<T = any>(url: string, config?: any): Observable<T>;
  post<T = any>(url: string, data?: any, config?: any): Observable<T>;
  delete<T = any>(url: string, config?: any): Observable<T>;
  put<T = any>(url: string, data?: any, config?: any): Observable<T>;
}
