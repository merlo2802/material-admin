import { EstadoEnum } from './enums/estadoEnum';
export interface Pais {
  id?: string,
  nombre: string,
  descripcion: string,
  estado: EstadoEnum
}