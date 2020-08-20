import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { AppBlankComponent } from './layouts/blank/blank.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren:
         () => import('./pages/pages.module').then(m => m.PagesModule)
      },
      {
        path: '',
        loadChildren:
          () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },

    ]
  },
  {
    path: 'autenticacion',
    component: AppBlankComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./autenticacion/autenticacion.module').then(m => m.AutenticacionModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'authentication/404'
  }
];
