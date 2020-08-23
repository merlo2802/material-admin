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
      private pageService: PageService,
      public matDialog: MatDialog,
      private notifier: NotifierService
  ) {
    super();
  }

  ngOnInit(): void {
  
  }

  private listarRubros(): void {

  }

  public crearRubro(): void {
    this.matDialog.open()
  }

  public actualizarRubro(rubro: RubroModel): void {
   
  }

  public eliminarRubro(rubro: RubroModel): void {

  }

  guardar(form : NgForm) {
    if(form.invalid) {
      return;
    }
    this.pageService.GuardarRubro(this.rubro).subscribe(resp => {
      console.log(resp);
    })
  }

  editar(evento: any)
  {
    console.log("llega", evento)
  }
  abrirDialogo(){
    const temporal = ""
    this.matDialog.open(DialogoCrearEditarRubroComponent, {
      width: '550px',
      minWidth: '550px',
      panelClass: ['zero-padding', 'scroll-x-hidden'],
      data: temporal
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
