import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.routes)
    },
    {
        path: 'dashboard',
        canActivate: [authGuard],
        loadComponent: () => import('./features/dashboard/dashboard/dashboard.component').then(m => m.DashboardComponent)
    },
    {
        path:"products",
        canActivate: [authGuard],
        loadComponent: () => import('./features/product/product.component').then(m => m.ProductComponent)
    },
     {
        path:"orders",
        canActivate: [authGuard],
        loadComponent: () => import('./features/orders/orders.component').then(m => m.OrdersComponent)
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/auth/login'
    }
];
