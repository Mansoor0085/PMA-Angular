import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Product } from './product.model';
import { GlobalErrorHandlerService } from './global-error-handler.service';

@Injectable({
  providedIn: 'root'
})


export class ProductServiceService {
  private apiUrl: string = 'https://localhost:7034/api';

  constructor(
    private http: HttpClient,
    private errorHandler: GlobalErrorHandlerService
  ) {}

  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/Products`).pipe(
      catchError((error) => this.errorHandler.handleError(error))
    );
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/Products/id?id=${id}`).pipe(
      catchError((error) => this.errorHandler.handleError(error))
    );
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/Products`, product).pipe(
      catchError((error) => this.errorHandler.handleError(error))
    );
  }

  updateProduct(product: Product): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/Products`, product).pipe(
      catchError((error) => this.errorHandler.handleError(error))
    );
  }

  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Products/${productId}`).pipe(
      catchError((error) => this.errorHandler.handleError(error))
    );
  }
}
