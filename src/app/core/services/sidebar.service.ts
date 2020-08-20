import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any[]=[
    {
      titulo: 'Dashboard',
      icono: 'admin_panel_settings',
      submenu: [
        {titulo: 'Main', url: '/dashboard/' },
        {titulo: 'ProgressBar', url: '/dashboard/progress' },
        {titulo: 'Graficas', url: '/dashboard/graficas1' },
      ]
    },
    {
      titulo: 'Administracion',
      icono: 'shopping_bag',
      submenu: [
        {titulo: 'Rubros', url: '/dashboard/rubro' },
      ]
    }
  ]

  constructor() { }
}
