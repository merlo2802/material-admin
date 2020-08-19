import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { Autenticacion_Routes } from './autenticacion.routing';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DemoMaterialModule } from 'app/demo-material-module';
import { ForgotPasswordComponent } from './forgot-password-2/forgot-password-2.component'
import { RegisterComponent } from './register-2/register-2.component';
import { LockComponent } from './lock/lock.component';
import { MailConfirmComponent } from './mail-confirm/mail-confirm.component';
import { ResetPasswordComponent  } from './reset-password-2/reset-password-2.component';

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    RegisterComponent,
    LockComponent,
    MailConfirmComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    Autenticacion_Routes,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    DemoMaterialModule,
  ]
})
export class AutenticacionModule { }
