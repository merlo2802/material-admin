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

export interface PeriodicElement {
  actions?: any;
  name: string;
  position: number;
  image: string;
  weight: number;
  symbol: string;
  active: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1,image:'assets/test/reaching.jpg', name: 'Hydrogen', weight: 1.0079, symbol: 'H', active: true},
  {position: 2,image:'assets/test/reaching.jpg', name: 'Helium', weight: 4.0026, symbol: 'He', active: true},
  {position: 3,image:'assets/test/reaching.jpg', name: 'Lithium', weight: 6.941, symbol: 'Li', active: false},
  {position: 4,image:'assets/test/reaching.jpg', name: 'Beryllium', weight: 9.0122, symbol: 'Be', active: true},
  {position: 5,image:'assets/test/reaching.jpg', name: 'Boron', weight: 10.811, symbol: 'B', active: false},
  {position: 6,image:'assets/test/reaching.jpg', name: 'Carbon', weight: 12.0107, symbol: 'C', active: false},
  {position: 7,image:'assets/test/reaching.jpg', name: 'Nitrogen', weight: 14.0067, symbol: 'N', active: true},
  {position: 8,image:'assets/test/reaching.jpg', name: 'Oxygen', weight: 15.9994, symbol: 'O', active: false},
  {position: 9,image:'assets/test/reaching.jpg', name: 'Fluorine', weight: 18.9984, symbol: 'F', active: true},
  {position: 10,image:'assets/test/reaching.jpg', name: 'Neon', weight: 20.1797, symbol: 'Ne', active: false},
];

@Component({
  selector: 'app-rubro',
  templateUrl: './rubro.component.html',
  styleUrls: ['./rubro.component.scss']
})
export class RubroComponent extends ClicComponent implements OnInit {
  displayedColumns: string[] = ['actions','position','image', 'name', 'weight', 'symbol','active'];
  dataSource = ELEMENT_DATA;
  rubro: RubroModel = new RubroModel();

  constructor(
    private pageService: PageService,
    public matDialog: MatDialog,
    private notifier: NotifierService
  ) {
    super();
  }

  ngOnInit(): void {
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
    const dialog = this.matDialog.open(DialogoCrearEditarRubroComponent, {
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
