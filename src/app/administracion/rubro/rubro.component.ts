import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {ClicComponent} from "../../core/utils/clic-component";
import {RubroModel} from "../../core/models/rubro.model";
import {PageService} from "../../core/services/page.service";
import {CustomOptions} from "../../core/dto/custom-options";
import {Page} from "../../core/utils/paginator/page";
import { NotifierService } from 'angular-notifier';
import {DialogoCrearEditarRubroComponent} from "./dialogo-crear-editar-rubro/dialogo-crear-editar-rubro.component";

@Component({
  selector: 'app-rubro',
  templateUrl: './rubro.component.html',
  styleUrls: ['./rubro.component.scss']
})
export class RubroComponent extends ClicComponent implements OnInit {
  
  public rubro: RubroModel;
  public listaRubro: RubroModel[];

  constructor(
      private rubroService: PageService,
      public matDialog: MatDialog,
      private notifier: NotifierService
  ) {
    super();
  }

  ngOnInit(): void {
    this.listarRubros();
  }

  private listarRubros(): void {
    this.rubroService.listarRubros().subscribe(respuesta => {
      this.listaRubro = respuesta;
    }, error => {
      console.log(error, 'errorCapturado');
    });
  }

  public crearRubro(): void {
    this.matDialog.open(DialogoCrearEditarRubroComponent, this.dialogConfig({
      accion: 'CREAR'
    })).afterClosed().subscribe((respuesta: boolean) => {
      if (respuesta) {
        let mensaje = {error: {title: 'Crear Rubro', detail: 'Rubro creado satisfactoriamente'}};
        this.notifierError(mensaje, 'succes');
      }
    });
  }

  public actualizarRubro(rubro: RubroModel): void {
    this.matDialog.open(DialogoCrearEditarRubroComponent, this.dialogConfig({
      accion: 'ACTUALIZAR',
      rubro: rubro
    })).afterClosed().subscribe((respuesta: boolean) => {
      if (respuesta) {
        let mensaje = {error: {title: 'Actualizar Rubro', detail: 'Rubro actualizado satisfactoriamente'}};
        this.notifierError(mensaje, 'succes');
      }
    });
  }

  public eliminarRubro(rubro: RubroModel): void {

  }

  notifierError(error: any, type?: string) {
    if (error && error.error) {
      const customOptions: CustomOptions = {type: type ? type : 'error', tile: error.error.title, message: error.error.detail, template: this.customNotificationTmpl};
      this.notifier.show(customOptions);
    }
  }
  // @ts-ignore
  public flex: number;
  onGtLgScreen() {
    this.flex = 10;
    this.dialogWidth = '750px';
  }

  onLgScreen() {
    this.flex = 15;
    this.dialogWidth = '750px';
  }

  onMdScreen() {
    this.flex = 25;
    this.dialogWidth = '750px';
  }

  onSmScreen() {
    this.flex = 100;
    this.dialogWidth = '99%';
  }

  onXsScreen() {
    this.flex = 100;
    this.dialogWidth = '99%';
  }

  setPage(pageInfo: Page) {}

}
