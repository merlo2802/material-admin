/**
	proyecto: Tabito Promociones
	autor: Alvaro Merlo
	fecha: 16-08-2020
	email: alvaromerlo2802@gmail.com
 */

import { Injectable } from '@angular/core';
//firebase
import { AngularFireAuth } from  '@angular/fire/auth';
import { auth } from 'firebase/app';
import * as firebase from 'firebase/app';
import { Usuario, ProvidersEnum } from '../models/models.interface';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';
import { AuthInfo } from './apis.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.signInUrlFirebase;
  private apikey = environment.apiKeyFirebase;
  //para crear nuevos usuarios
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
  //login 
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
  usuario;
  userToken: string;
  constructor(
    private auth: AngularFireAuth,
    public afdb: AngularFireDatabase,
    private http : HttpClient,
  ) { 
    this.usuario = new Usuario;
    this.leerToken();
  }

  loginGoogleWeb() {
    var provider = new auth.GoogleAuthProvider();
    return this.auth.signInWithPopup(provider).then((user) => {
      console.log(user.user);
      const usuarioLogeado= user.user;
      this.usuario.uid = usuarioLogeado.uid;
      this.usuario.nombre = user.user.displayName;
      this.usuario.email = user.user.email;
      this.usuario.avatar = user.user.photoURL; 
      this.usuario.provider = ProvidersEnum.GOOGLE_WEB;
      this.guardarUsuario(this.usuario);
    });
  }
  guardarUsuario(usuario: Usuario) {
    this.afdb.database.ref(`/usuarios/${usuario.uid}/`).set({
      usuario: usuario
    }).then(()=>{
      console.log("todo OK");
    }).catch (error=>{
      console.log("hubo error ",error.message);
    })
  }

  // public login(email: string, password: string): Promise<any> {
  //   return new Promise<any>((resolve, reject) => {
  //     this.auth.signInWithEmailAndPassword(email, password)
  //       .then(res => {
  //         if (res.user) {
  //           this.authInfo$.next(new AuthInfo(res.user.uid));
  //           resolve(res.user);
  //         }
  //       })
  //       .catch(err => {
  //         this.authInfo$.next(AuthService.UNKNOWN_USER);
  //         reject(`login failed ${err}`);
  //       });
  //   });
  // }

  logout() {

  }
  
  login(usuario : Usuario) {
    const authData = {
      email: usuario.email,
      password : usuario.password,
      returnSecureToken: true
    }
    return this.http.post(
      `${this.url}accounts:signInWithPassword?key=${this.apikey}`,
      authData
    ).pipe(
      map( resp => {
        this.guardaToken(resp['idToken']);
        return resp;
      })
    );

  }
  nuevoUsuario(usuario: Usuario) {
    const authData = {
      email: usuario.email,
      password : usuario.password,
      returnSecureToken: true
    }
    return this.http.post(
      `${this.url}accounts:signUp?key=${this.apikey}`,
      authData
    ).pipe(
      map( resp => {
        this.guardaToken(resp['idToken']);
        return resp;
      })
    );
  }

  private guardaToken(idToken : string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  private leerToken() {
    if(localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token')
    } else {
      this.userToken = '';
    }
  }

}
