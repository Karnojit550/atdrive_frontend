 import { Injectable } from '@angular/core';

import { ApiService } from './api-service.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService { 


 constructor(private api: ApiService) {}

    getCurrentWeather(): Observable<any> {
        return this.api.get<any>('weather/current');
    }
}
