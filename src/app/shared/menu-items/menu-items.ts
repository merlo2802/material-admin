/*
Autor: Riovaldo Telleria
Proyecto: PlenitudNet
Fecha: 22-06-2020
Email: riovaldotc@gmail.com
*/

import { Injectable } from '@angular/core';

export interface Menu {
  urlModulo: string;
  nombre: string;
  tipo: string;
  icono: string;
  inverseModulo: Menu[];
}

const MENUITEMS: Menu[] = [
  { urlModulo: 'seguridad', nombre: 'Seguridad', tipo: 'modulo', icono: 'dns', inverseModulo:[
      
  ]},
  { urlModulo: 'administracion', nombre: 'Administración', tipo: 'modulo', icono: 'dns', inverseModulo:[
    {urlModulo: 'rubro', nombre: 'Rubros', tipo: 'submodulo', icono: 'dns', inverseModulo:[]},
    {urlModulo: 'categoria', nombre: 'Categorías', tipo: 'submodulo', icono: 'dns', inverseModulo:[]},
    {urlModulo: 'item', nombre: 'Items', tipo: 'submodulo', icono: 'dns', inverseModulo:[]},
  ]},
  { urlModulo: 'promociones', nombre: 'Promoción', tipo: 'modulo', icono: 'dns', inverseModulo:[
    
  ]},
  { urlModulo: 'usuarios-moviles', nombre: 'Usuarios Móviles', tipo: 'modulo', icono: 'dns', inverseModulo:[
    
  ]},
  { urlModulo: 'configuracion', nombre: 'Configuración', tipo: 'modulo', icono: 'dns', inverseModulo:[
    {urlModulo: 'pais', nombre: 'Países', tipo: 'submodulo', icono: 'dns', inverseModulo:[]},
    {urlModulo: 'ciudad', nombre: 'Ciudades', tipo: 'submodulo', icono: 'dns', inverseModulo:[]},
  ]},
];

///// SESSION PARA BACKEND ///////
// const usuario = JSON.parse(localStorage.getItem('USUARIO_LOGIN'));
/////////////////

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }


  ////// seccion de listar el menu desde el backend //////
 /* public MENUITEMS: Menu[] = [];
  getMenuitem(): Menu[] {
	if (usuario && this.MENUITEMS.length == 0) this.MENUITEMS = usuario.listaModulo;
    return this.MENUITEMS;
  }
  
  public menu(menu: any) {
	this.MENUITEMS = menu;
  } */
}

