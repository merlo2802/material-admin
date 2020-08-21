import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RubroModel } from '../models/rubro.model';
import {finalize, map} from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {FileI} from "../models/interfaces/file.interface";
import {Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/storage";

@Injectable({
  providedIn: 'root'
})
export class PageService {
  //imagenes en firebase storage
  private filepath :any ;
  private downloadUrl: Observable<string>
  private url = environment.apiUrl;
  constructor(
    private http:HttpClient,
    private storage: AngularFireStorage,
  ) { }

  GuardarRubro(rubro: RubroModel) {
    return this.http.post(`${this.url}/rubros.json`, rubro)
      .pipe(
        map((resp: any) => {
          rubro.id = resp.name;
          return rubro;
        })
      );
  }

  actualizarRubro(rubro: RubroModel){
    return this.http.put(`${this.url}/rubro/${rubro.id}.json`, rubro)
  }


  private subirImagen(rubro:RubroModel, imagen:FileI ){
    this.filepath = `imagenes/rubros/${imagen.name}`;
    const fileRef = this.storage.ref(this.filepath);
    const task = this.storage.upload(this.filepath, imagen);
    task.snapshotChanges()
    .pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(urlImagen => {
          this.downloadUrl = urlImagen;
          console.log('url_image', urlImagen);
          console.log('url_post', rubro);
          //llamar al metodo a guardar
        })
      })
    )
  }


}
