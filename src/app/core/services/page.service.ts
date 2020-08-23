import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RubroModel } from '../models/rubro.model';
import {finalize, map} from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {FileI} from "../models/interfaces/file.interface";
import {Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/storage";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {tryCatch} from "rxjs/internal-compatibility";


@Injectable({
  providedIn: 'root'
})
export class PageService {
  //imagenes en firebase storage
  private filepath :any ;
  private downloadUrl: Observable<string>
  private url = environment.apiUrl;
  public rubroCollection : AngularFirestoreCollection<RubroModel>;
  constructor(
    private http:HttpClient,
    private storage: AngularFireStorage,
    private fs: AngularFirestore,
  ) {
    this.rubroCollection =   fs.collection<RubroModel>('rubros');
  }

  // GuardarRubro(rubro: RubroModel) {
  //   return this.http.post(`${this.url}/rubros.json`, rubro)
  //     .pipe(
  //       map((resp: any) => {
  //         rubro.id = resp.name;
  //         return rubro;
  //       })
  //     );
  // }

  // actualizarRubro(rubro: RubroModel){
  //   return this.http.put(`${this.url}/rubro/${rubro.id}.json`, rubro)
  // }


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

  //RUBROS

  nuevoRubro(record : any) {
    return this.fs.collection('rubros').add(record);
  }

  public listarRubros(): Observable<any[]> {
    return this.rubroCollection
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const body = a.payload.doc.data() as RubroModel;
            body.id= a.payload.doc.id;
            // const i = new RubroModel();
            // i.id = a.payload.doc.id;
            return { ...body };
          })
        )
      );
  }

  public listarRubro(id: number): Observable<RubroModel> {
    return this.fs.doc<RubroModel>(`rubros/${id}`).valueChanges();
  }

  public eliminarRubroId(rubro: RubroModel) {
    return this.rubroCollection.doc(rubro.id).delete();
  }



}
