import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api-service.service';
import { Order } from '../models/order,model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  constructor(private http: HttpClient, private api: ApiService) { }

  getOrders(page: number, limit: number): Observable<any> {
    return this.api.get(`orders/list?page=${page}&limit=${limit}`);
  }

  createOrder(payload: any): Observable<any> {
    return this.api.post(`orders/create`, payload);
  }

  updateOrder(id: string, payload: any): Observable<any> {

    return this.api.put(`orders/${id}`, payload);
  }

  statusChange(id: string): Observable<any> {

    return this.api.Patch(`orders/${id}`, { });
  }
}
