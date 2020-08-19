import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'login-2',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_]*$')])),
      password: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(6)])),
    });
  }
  ngOnInit(): void {
  }
}
