
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {HashLocationStrategy, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';

import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';
import { AppBlankComponent } from './layouts/blank/blank.component';
import {NotifierModule, NotifierOptions} from 'angular-notifier';
import { MatDialog } from '@angular/material/dialog';

//firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
//EndFirebase
import { NgxSpinnerModule } from 'ngx-spinner';
import {environment} from "../environments/environment";
import { BlockUIModule } from 'ng-block-ui';
import { DialogConfirmacionComponent } from './core/utils/dialog-confirmacion/dialog-confirmacion.component';

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12
    },
    vertical: {
      position: 'bottom',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 5
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};
@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppBlankComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent,
    DialogConfirmacionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    NotifierModule.withConfig(customNotifierOptions),
    RouterModule.forRoot(AppRoutes, {useHash: true}),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    NgxSpinnerModule,
    FlexLayoutModule,
    HttpClientModule,
    SharedModule,
	BlockUIModule.forRoot()
   
  ],
  providers: [
    {
      provide: HashLocationStrategy,
      useClass: PathLocationStrategy,

    },
    AngularFireDatabase,
    MatDialog
  ],
  entryComponents: [ 
    DialogConfirmacionComponent
  ],
  exports: [DialogConfirmacionComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
