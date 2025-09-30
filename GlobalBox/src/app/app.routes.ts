
import { Routes } from '@angular/router';
import { tabsRoutes } from './tabs/tabs.routes';

export const routes: Routes = [
  {
    path: '',
    children: tabsRoutes,
  },
];
