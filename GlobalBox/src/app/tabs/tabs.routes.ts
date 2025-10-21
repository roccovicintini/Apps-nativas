import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const tabsRoutes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () => import('../component/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'carrito',
        loadComponent: () => import('../component/carrito/carrito.component').then(m => m.CarritoComponent)
      },
      {
        path: 'pago',
        loadComponent: () => import('../component/pago/pago.component').then(m => m.PagoComponent)
      },
      {
        path: 'rastreo',
        loadComponent: () => import('../component/rastreo/rastreo.component').then(m => m.RastreoComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('../pages/profile/profile.component').then(m => m.ProfileComponent)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];
