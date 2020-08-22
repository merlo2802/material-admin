import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {EstadoEnum} from "../../../core/models/enums/estadoEnum";
import {FileI} from "../../../core/models/interfaces/file.interface";

@Component({
  selector: 'app-dialogo-crear-editar-rubro',
  templateUrl: './dialogo-crear-editar-rubro.component.html',
  styleUrls: ['./dialogo-crear-rubro.component.scss']
  // providers: [
  //   ParametricaService,
  //   SensibilizacionService
  // ]
})
export class DialogoCrearEditarRubroComponent implements OnInit {
  @Input() operacion: string;
  public form: FormGroup;
  selected: any = null;
  public flex: number ;
  listaEstado: EstadoEnum[] = [];
  image: any;
  files: File[] = [];
  constructor(
    private dialogRef: MatDialogRef<DialogoCrearEditarRubroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.cargarEstado();
   }

  ngOnInit() {
    this.initilizeForm(this.data);
  }
  initilizeForm(data: any) {
    this.form = new FormGroup({
      id: new FormControl(null),
      nombre: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(5), Validators.minLength(1)])),
      descripcion: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(50), Validators.minLength(1)])),
      estado: new FormControl(EstadoEnum.ACTIVO, Validators.required),
      tipoAccion: new FormControl(null),
      imagen: new FormControl(null),
    });
  }
  cargarEstado() {
    this.listaEstado = [
      EstadoEnum.ACTIVO,
      EstadoEnum.INACTIVO,
      EstadoEnum.ELIMINADO,
    ]
  }
  cancel() {
    this.dialogRef.close();
  }
  handleImage(event: any) {
    this.image =event.target.files[0];
    console.log("imagen", this.image);
  }
  // listarGestiones() {
  //   this.serviceParametrica.requestGestionList().subscribe(respuesta => {
  //     this.listaGestiones = respuesta.body;
  //     this.selected= this.listaGestiones[0].id;
  //   });
  // }
  // initilizeForm(data: EscenarioDto) {
  //   this.form = new FormGroup({
  //     id: new FormControl(null),
  //     nombre: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(5), Validators.minLength(1)])),
  //     descripcion: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(50), Validators.minLength(1)])),
  //     gestion: new FormControl(null),
  //     tipoAccion: new FormControl(null),
  //   });
  // }

  save() {
    console.log(this.form.value,"form");
    // this.serviceParametrica.requestEscenarioStore(this.form.value).subscribe(respuesta => {
    //   this.blockUI.start('Procesando solicitud...');
    //   if (respuesta !== null) {
    //     this.dialogRef.close({ respuesta });
    //     this.notifierCustom('', `Escenario Convertido satisfactoriamente`, 'success');
    //     this.blockUI.stop();
    //   }
    // }, error => {
    //   this.notifierError(error);
    //   this.blockUI.stop();
    // });
  }


  onSelect(event: any) {
    const a : FileI = event.addedFiles;
    console.log(a);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  // dataForm() {
  //   this.form.value.gestion = this.listaGestiones.find(item => item.id === this.selected);
  //   this.form.value.tipoAccion = this.operacion;
  //   this.form.value.id = this.data.id;
  //   this.form.value.nombre = (this.form.get('nombre').value).toUpperCase()
  //   this.form.value.descripcion = (this.form.get('descripcion').value).toUpperCase()
  // }
  // notifierCustom(title: string, message: string, type: string) {
  //   const customOptions: CustomOptions = {type, tile: title, message, template: this.customNotificationTmpl};
  //   this.notifier.show(customOptions);
  // }
  // notifierError(error: any, type?: string) {
  //   if (error && error.error) {
  //     // tslint:disable-next-line:max-line-length
  //     const customOptions: CustomOptions = {type: type ? type : 'error', tile: error.error.title, message: error.error.detail, template: this.customNotificationTmpl};
  //     this.notifier.show(customOptions);
  //   }
  // }

}
