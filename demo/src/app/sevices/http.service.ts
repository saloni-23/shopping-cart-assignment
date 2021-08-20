import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Banner } from '../models/banner.interface';
import { Categories } from '../models/categories.interface';
import { Product } from '../models/product.inteface';
import { CartResponse } from '../models/response.inteface';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  constructor(private readonly _httpService: HttpClient) { }


  getBannersList() : Observable<Banner[]> {
    return this._httpService.get<Banner[]>(`${environment.serverUrl}` + '/banners');
  }

  getProductsList() : Observable<Product[]> {
    return this._httpService.get<Product[]>(`${environment.serverUrl}`+ '/products');
  }

  getCategoriesList() : Observable<Categories[]> {
    return this._httpService.get<Categories[]>(`${environment.serverUrl}`+ '/categories');
  }

  addProductToCart(id : string) : Observable<CartResponse> {
    return this._httpService.post<CartResponse>(`${environment.serverUrl}`+ '/addToCart', id);
  }
}
