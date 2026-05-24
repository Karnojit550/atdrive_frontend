import { Injectable } from '@angular/core';

import { ApiService } from './api-service.service';
import { Observable, tap } from 'rxjs';
import { ProductResponse } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {


    constructor(private api: ApiService) { }

    getProduct(page: number, limit: number): Observable<ProductResponse> {
        return this.api.get<any>(`products?page=${page}&limit=${limit}`);
    }

    createProduct(body: any): Observable<any> {

        return this.api.post('products/create', body);

    }

    updateProduct(id: number, body: any): Observable<any> {

        return this.api.put(`products/${id}`, body);

    }

    deleteProduct(id: number): Observable<any> {

        return this.api.delete(
            `products/${id}`
        );

    }

}
