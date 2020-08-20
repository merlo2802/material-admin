import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RubroModel } from '../models/rubro.model';
import { map } from 'rxjs/operators';
import { HeaderRowOutlet } from '@angular/cdk/table';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private url = environment.apiUrl;
  constructor(
    private http:HttpClient,
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
}
