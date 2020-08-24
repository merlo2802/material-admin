import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RubroModel} from '../models/rubro.model';
import {finalize, map} from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {FileI} from "../models/interfaces/file.interface";
import {Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/storage";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
// @ts-ignore
import {isNullOrUndefined} from "util";

import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  @BlockUI() blockUI: NgBlockUI;
  //imagenes en firebase storage
  private filePath :any ;
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
  //RUBROS
  private subirImagen(rubro:RubroModel, imagen:FileI ){
    this.filePath = `imagenes/rubros/${imagen.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, imagen);
    task.snapshotChanges()
      .pipe( finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImagen => {
            this.downloadUrl = urlImagen;
            console.log('url_image', urlImagen);
            console.log('url_post', rubro);
            this.guardarRubro(rubro);
          });
        })
      ).subscribe();
  }

  private guardarRubro(rubro: RubroModel){
    const rubroObj : RubroModel =  {
      descripcion: rubro.descripcion,
      estado: rubro.estado,
      nombre: rubro.nombre,
    };
    if(!isNullOrUndefined(this.downloadUrl && this.filePath)){
        rubroObj.imagenUrl = this.downloadUrl;
        rubroObj.fileRef = this.filePath;
    }
    if (rubro.id) {
      return this.rubroCollection.doc(rubro.id).update(rubroObj);
    } else {
      // @ts-ignore
      return this.rubroCollection.add(rubroObj);
    }
  }

  public preAddAndUpdateRubro(rubro: RubroModel, image: FileI): Observable<RubroModel> {
    if(!isNullOrUndefined(image)){
      return new Observable(():any => {
        this.subirImagen(rubro, image);
      })
    } else {
      return new Observable(():any => {
        this.guardarRubro(rubro);
      });
    }
  }

  public listarRubros(): Observable<any[]> {
    return this.rubroCollection
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const body = a.payload.doc.data() as RubroModel;
            body.id= a.payload.doc.id;
            return { ...body };
          })
        )
      );
  }

  public eliminarRubroId(rubro: RubroModel): Observable<any> {
    return new Observable((): any => {
        return this.rubroCollection.doc(rubro.id).delete();
    });
  }



}
