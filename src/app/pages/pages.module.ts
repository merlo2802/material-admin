import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RubroComponent } from './rubro/rubro.component';
import { RouterModule } from '@angular/router';
import {PagesRoutes} from './pages.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CdkTableModule } from '@angular/cdk/table';
import {SharedModule} from "../shared/shared.module";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {LayoutModule} from "@angular/cdk/layout";
import {DialogoCrearEditarRubroComponent} from "./rubro/dialogo-crear-editar-rubro/dialogo-crear-editar-rubro.component";
import {DemoMaterialModule} from "../demo-material-module";
import { NgxDropzoneModule } from 'ngx-dropzone';


@NgModule({
  declarations: [
    //rubro
    RubroComponent,
    DialogoCrearEditarRubroComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    RouterModule.forChild(PagesRoutes),
    SharedModule,
    NgxDatatableModule,
    LayoutModule,
    NgxDropzoneModule,
  ],
  providers: [],
  entryComponents: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class PagesModule { }
