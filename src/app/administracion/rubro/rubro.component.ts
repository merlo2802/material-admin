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
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-rubro',
  templateUrl: './rubro.component.html',
  styleUrls: ['./rubro.component.scss']
})
export class RubroComponent extends ClicComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
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
	this.blockUI.start('Recuperando lista de rubros...');
    this.rubroService.listarRubros().subscribe(respuesta => {
	  this.blockUI.stop();
      this.listaRubro = respuesta;
    }, error => {
	  this.blockUI.stop();
      console.log(error, 'errorCapturado');
    });
  }

  public crearRubro(): void {
    this.matDialog.open(DialogoCrearEditarRubroComponent, this.dialogConfig({
      accion: 'CREAR'
    })).afterClosed().subscribe((respuesta: boolean) => {
      if (respuesta) {
        let mensaje = {error: {title: 'Crear Rubro', detail: 'Rubro creado satisfactoriamente'}};
        this.notifierError(mensaje, 'success');
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
        this.notifierError(mensaje);
      }
    });
  }

  public eliminarRubro(rubro: RubroModel): void {
    this.blockUI.start("eliminado rubro");
    this.rubroService.eliminarRubro(rubro).then((response) => {
      console.log("eliminado exitoso");
      this.blockUI.stop();
    }, error => {
      console.log(error);
      this.blockUI.stop();
    }).catch( error => {
      console.log(error);
      this.blockUI.stop();
    });
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
    this.flex = 33;
    this.dialogWidth = '650px';
	this.dialogMaxWidth = '650px';
  }

  onLgScreen() {
    this.flex = 33;
    this.dialogWidth = '650px';
	this.dialogMaxWidth = '650px';
  }

  onMdScreen() {
    this.flex = 33;
    this.dialogWidth = '650px';
	this.dialogMaxWidth = '650px';
  }

  onSmScreen() {
    this.flex = 100;
    this.dialogWidth = '99%';
	this.dialogMaxWidth = '99%';
  }

  onXsScreen() {
    this.flex = 100;
    this.dialogWidth = '99%';
	this.dialogMaxWidth = '95vw';
  }

  setPage(pageInfo: Page) {}

}
