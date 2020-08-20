import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RubroComponent } from './rubro/rubro.component';
import { RouterModule } from '@angular/router';
import {PagesRoutes} from './pages.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from 'app/demo-material-module';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CdkTableModule } from '@angular/cdk/table';
import {SharedModule} from "../shared/shared.module";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {LayoutModule} from "@angular/cdk/layout";




@NgModule({
  declarations: [
    RubroComponent,
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
  ],
  providers: [],
  entryComponents: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class PagesModule { }
