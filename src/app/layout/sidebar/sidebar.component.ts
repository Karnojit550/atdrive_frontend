import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../core/services/sidebar.service';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, MatListModule, MatIconModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

    isOpen$;

  constructor(private sidebarService: SidebarService) {

    this.isOpen$ = this.sidebarService.isOpen$;

  }

  toggleSidebar(): void {

    this.sidebarService.toggle();

  }
}