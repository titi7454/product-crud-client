import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = 'https://manifest-setup-387002.ey.r.appspot.com/api/products/';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(this.url);
  }

  deleteProduct(id: string, token: string): Observable<any> {
    return this.http.delete(this.url + id, {
      body: { jwt: token },
    });
  }

  createProduct(product: Product): Observable<any> {
    return this.http.post(this.url, product);
  }

  getProduct(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  editProduct(id: string, product: Product): Observable<any> {
    return this.http.put(this.url + id, product);
  }
  getToken(id: string): Observable<any> {
    return this.http.get(this.url + 'get-token/' + id);
  }
}
