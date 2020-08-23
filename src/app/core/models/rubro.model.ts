/**
	proyecto: Tabito Promociones
	autor: Alvaro Merlo
	fecha: 16-08-2020
	email: alvaromerlo2802@gmail.com
 */

import { EstadoEnum } from './enums/estadoEnum';
export interface RubroModel {
  id?: string;
  nombre: string;
  descripcion: string;
  imagenUrl?: any;
  estado?: EstadoEnum;
  fileRef?: string;
}
