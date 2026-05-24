import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../../core/services/loader-service.service';
import { MatProgressSpinnerModule }from '@angular/material/progress-spinner';

@Component({
  selector: 'app-simple-loader',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './simple-loader.component.html',
  styleUrl: './simple-loader.component.css'
})
export class SimpleLoaderComponent {
  constructor(public loader:LoaderService){}
}
