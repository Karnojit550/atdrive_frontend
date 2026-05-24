import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../../core/services/weather.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnDestroy {
  weatherData: any;
  isLoading = false;
  private destroy$ = new Subject<void>();

  constructor(
    private weatherService: WeatherService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getWeather();
  }

  getWeather() {
    this.isLoading = true;
    this.weatherService
      .getCurrentWeather()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.weatherData = res.data;
          this.isLoading = false;
        },
        error: (err) => {
          this.toastr.error('Failed to fetch weather data');
          this.isLoading = false;
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
