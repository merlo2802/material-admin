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
          () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  },
  {
    path: '',
    component: AppBlankComponent,
    children: [
      {
        path: 'autenticacion',
        loadChildren: () => import('./autenticacion/autenticacion.module').then(m => m.AutenticacionModule)
      }
    ]
  },
  // {
  //   path: 'autenticacion',
  //   component: AppBlankComponent,
  //   loadChildren: () => import('./autenticacion/autenticacion.module').then(m => m.AutenticacionModule)
  // },
  {
    path: '**',
    redirectTo: 'authentication/404'
  }
];