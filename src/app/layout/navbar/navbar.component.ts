import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SidebarService } from '../../core/services/sidebar.service';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { User } from '../../core/models/auth.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: User | null = null;
  showProfileMenu = false;
  avatarLetter = '';

  constructor(
    private sidebarService: SidebarService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.user = this.authService.getUser();
    if (this.user) {
      // Get first letter of username or name for avatar
      this.avatarLetter = (this.user.name || this.user.username || '?').charAt(0).toUpperCase();
    }
  }

  toggleSidebar(): void {
    this.sidebarService.toggle();
  }

  toggleProfileMenu(): void {
    this.showProfileMenu = !this.showProfileMenu;
  }

  closeProfileMenu(): void {
    this.showProfileMenu = false;
  }

  logout(): void {
    this.showProfileMenu = false;
    this.authService.logout();
  }
}
