import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {EstadoEnum} from "../../../core/models/enums/estadoEnum";
import {FileI} from "../../../core/models/interfaces/file.interface";
import { PageService } from 'app/core/services/page.service';
import { ClicComponent } from 'app/core/utils/clic-component';
import { Page } from 'app/core/utils/paginator/page';
import { NotifierService } from 'angular-notifier';
import { CustomOptions } from 'app/core/dto/custom-options';
import { RubroModel } from 'app/core/models/rubro.model';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-dialogo-crear-editar-rubro',
  templateUrl: './dialogo-crear-editar-rubro.component.html',
  styleUrls: ['./dialogo-crear-rubro.component.scss']
})
export class DialogoCrearEditarRubroComponent extends ClicComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  public crear: boolean;
  public form: FormGroup;
  public flex: number ;
  public listaEstado: EstadoEnum[] = [];
  public image: any;
  public files: File[] = [];
  public vistaPrevia: boolean;
  constructor(
      private notifier: NotifierService,
      private dialogRef: MatDialogRef<DialogoCrearEditarRubroComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private rubroService: PageService
    ) {
      super();
  }

  ngOnInit() {
	this.vistaPrevia = this.data.accion == 'CREAR';
    this.crear = this.data.accion == 'CREAR';
    this.cargarEstado();
    this.inicializarFormulario(this.data);
  }

  public inicializarFormulario(data: any) {
    this.form = new FormGroup({
      id: new FormControl(this.crear ? null : this.data.rubro.id),
      nombre: new FormControl(this.crear ? null : this.data.rubro.nombre, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])),
      descripcion: new FormControl(this.crear ? null : this.data.rubro.descripcion, Validators.compose([Validators.maxLength(70)])),
      imagen: new FormControl(null, this.crear ? Validators.compose([Validators.required]) : null),
      imagenUrl: new FormControl(this.crear ? null : this.data.rubro.imagenUrl),
      estado: new FormControl(this.crear ? EstadoEnum.ACTIVO : this.data.rubro.estado, Validators.compose([Validators.required]))
    });
  }

  private cargarEstado() {
    this.listaEstado = [
      EstadoEnum.ACTIVO,
      EstadoEnum.INACTIVO,
      EstadoEnum.ELIMINADO,
    ]
  }

  public cancelar(): void {
    this.dialogRef.close(false);
  }

  public guardarRubro(): void {
    if (this.form.valid) {
      if (this.crear) this.nuevoRubro(); else this.actualizarRubro();
    } else {
      for (const controlsKey in this.form.controls) {
        if (this.form.controls[controlsKey].errors) {
          this.form.controls[controlsKey].markAsTouched({ onlySelf: true });
        }
      }
    }
  }

  private nuevoRubro(): void {
    const rubro = this.setearValores();
    this.blockUI.start("creando rubro");
    this.rubroService.preAddAndUpdateRubro(rubro, this.image).subscribe(()=>{
      console.log("finalizado la creacion");
      this.blockUI.stop();
    });
  }

  private actualizarRubro(): void {
    const rubro = this.setearValores();
    this.blockUI.start("actualizando  rubro");
    this.rubroService.preAddAndUpdateRubro(rubro, this.image).subscribe(() => {
      console.log("finalizando la creacion");
      this.blockUI.stop();
    });
  }

  private setearValores(): RubroModel {
    let rubro: RubroModel = {
      id: this.form.get('id')?.value,
      nombre: this.form.get('nombre')?.value,
      descripcion: this.form.get('descripcion')?.value,
      estado: this.form.get('estado')?.value,
    };
    return rubro;
  }

  handleImage(event: any) {
    this.image =event.target.files[0];
    console.log("imagen", this.image);
  }

  onSelect(event: any) {
    if (event.addedFiles.length > 0) {
      this.vistaPrevia = true;
      if (this.files.length > 0) {
        this.files = [];
      }
	    this.files.push(...event.addedFiles);
      this.form.get('imagen')?.setValue(this.files[0]);
      this.image = this.files[0];
	  } else {
	    const msj = {error:{title: 'Formato Inválido', detail: 'El formato de imagen es inválido'}};
	    this.notifierError(msj);
	  }

  }

  public onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    this.form.get('imagen')?.setValue(null);
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
