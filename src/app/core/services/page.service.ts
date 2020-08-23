import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RubroModel} from '../models/rubro.model';
import {finalize, map} from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {FileI} from "../models/interfaces/file.interface";
import {Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/storage";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";


@Injectable({
  providedIn: 'root'
})
export class PageService {
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
    this.filePath = `imagenes/rubros/${imagen.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, imagen);
    task.snapshotChanges()
    .pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(urlImagen => {
          this.downloadUrl = urlImagen;
          console.log('url_image', urlImagen);
          console.log('url_post', rubro);
          this.guardarRubro(rubro);
        })
      })
    )
  }

  public preAddAndUpdateRubro(rubro: RubroModel, image: FileI): void {
    this.subirImagen(rubro, image);
  }

  private guardarRubro(rubro: RubroModel) {
    const rubroObj =  {
      descripcion: rubro.descripcion,
      estado: rubro.estado,
      imagenUrl: this.downloadUrl,
      fileRef: this.filePath,
    };
    if (rubro.id) {
      return this.rubroCollection.doc(rubro.id).update(rubroObj);
    } else {
      // @ts-ignore
      return this.rubroCollection.add(rubroObj);
    }
  }

  //RUBROS

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
    return this.fs.doc<any>(`rubros/${id}`).valueChanges();
  }

  public eliminarRubroId(rubro: RubroModel) {
    return this.rubroCollection.doc(rubro.id).delete();
  }



}
