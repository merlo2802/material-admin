/**
	proyecto: Tabito Promociones
	autor: Alvaro Merlo
	fecha: 16-08-2020
	email: alvaromerlo2802@gmail.com
 */

import { EstadoEnum } from './enums/estadoEnum';

export class CaterogiaModel {
  id: string ;
  nombre:string | null;
  descripcion:string | null;
  rubroId: string ;
  categoriaPadre: CaterogiaModel | null;
  imagenUrl: string | null 
  estado: EstadoEnum ;


}