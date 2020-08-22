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
        path: 'administracion',
        loadChildren:
         () => import('./administracion/administracion.module').then(m => m.AdministracionModule)
      },
      {
        path: 'seguridad',
        loadChildren:
         () => import('./seguridad/seguridad.module').then(s => s.SeguridadModule)
      },
      {
        path: 'configuracion',
        loadChildren:
         () => import('./configuracion/configuracion.module').then(c => c.ConfiguracionModule)
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
