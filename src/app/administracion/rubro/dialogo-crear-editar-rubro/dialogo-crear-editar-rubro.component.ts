import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {EstadoEnum} from "../../../core/models/enums/estadoEnum";
import {FileI} from "../../../core/models/interfaces/file.interface";
import { PageService } from 'app/core/services/page.service';

@Component({
  selector: 'app-dialogo-crear-editar-rubro',
  templateUrl: './dialogo-crear-editar-rubro.component.html',
  styleUrls: ['./dialogo-crear-rubro.component.scss']
})
export class DialogoCrearEditarRubroComponent implements OnInit {
  public crear: boolean;
  public form: FormGroup;
  public flex: number ;
  public listaEstado: EstadoEnum[] = [];
  public image: any;
  public files: File[] = [];
  constructor(
      private dialogRef: MatDialogRef<DialogoCrearEditarRubroComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private rubroService: PageService
    ) {
  }
  
  ngOnInit() {
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

  }

  private actualizarRubro(): void {

  }

  public cancel() {
    this.dialogRef.close(false);
  }

  handleImage(event: any) {
    this.image =event.target.files[0];
    console.log("imagen", this.image);
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

}
