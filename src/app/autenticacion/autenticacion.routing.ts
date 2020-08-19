import { Routes, RouterModule } from '@angular/router';
// import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password-2/forgot-password-2.component';
import { RegisterComponent } from './register-2/register-2.component';
import { LockComponent } from './lock/lock.component';
import { ResetPasswordComponent } from './reset-password-2/reset-password-2.component';
import { MailConfirmComponent } from './mail-confirm/mail-confirm.component';

const AutenticacionRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'forgot',
        component: ForgotPasswordComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'lock',
        component: LockComponent
      },
      {
        path: 'mailConfirm',
        component: MailConfirmComponent
      },
      {
        path: 'resetPassword',
        component: ResetPasswordComponent
      },
    ]
  }
];

export const Autenticacion_Routes = RouterModule.forChild(AutenticacionRoutes);