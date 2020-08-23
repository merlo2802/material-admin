/**
	proyecto: Tabito Promociones
	autor: Alvaro Merlo
	fecha: 16-08-2020
	email: alvaromerlo2802@gmail.com
 */

import { EstadoEnum } from './enums/estadoEnum';
export class RubroModel {
  id : string  | undefined;
  nombre : string | undefined;
  descripcion : string | undefined;
  imagenUrl ?: any;
  estado : EstadoEnum | undefined;
  fileRef?: string;
}
