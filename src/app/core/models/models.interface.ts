/**
 * Santa Cruz - Bolivia
 * project: Tabito SuperOfertas
 * package:
 * author:  Merlo
 **/

export enum ProvidersEnum {
  GOOGLE = "google_mobile",
  FACEBOOK = "facebook",
  GOOGLE_WEB = "google_web",
}

export class Usuario {
  uid:string | null;
  email:string | null;
  nombre:string | null;
  avatar:string | null;
  provider: ProvidersEnum;

  password: string | null;

  
  imagenes:Array<any> | null;
  fecha_nacimiento:Date | null;
  genero:string | null;
  en_busca:string | null;
  sobre_mi:string | null;
  amigos:Array<any> | null;
  altura:string | null;
  peso:string | null;
  estado_sentimental:string | null;
  fecha_alta:string | null;
  intereses:Array<string> | null;
  ubicacion:string | null;
}