import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { SimpleLoaderComponent } from './shared/components/simple-loader/simple-loader.component';
import { CommonModule } from '@angular/common';
import { SidebarService } from './core/services/sidebar.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SidebarComponent, SimpleLoaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'atdrive_frontend';
  sidebarOpen = false;
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private sidebarService: SidebarService
  ) {}

  ngOnInit(): void {
    this.sidebarService.isOpen$
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        this.sidebarOpen = state;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  isAuthPage(): boolean {
    return this.router.url.includes('/auth');
  }

  closeSidebar(): void {
    this.sidebarService.close();
  }
}
