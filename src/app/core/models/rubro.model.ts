/**
	proyecto: Tabito Promociones
	autor: Alvaro Merlo
	fecha: 16-08-2020
	email: alvaromerlo2802@gmail.com
 */

import { EstadoEnum } from './enums/estadoEnum';
export class RubroModel {
  id : string ;
  nombre : string | null;
  descripcion : string | null;
  imagenUrl : string | null;
  estado : EstadoEnum | null;
}
