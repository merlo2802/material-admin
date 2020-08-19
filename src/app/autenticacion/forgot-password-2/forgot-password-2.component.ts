import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { animationsTabito} from '../animations';

@Component({
    selector     : 'forgot-password-2',
    templateUrl  : './forgot-password-2.component.html',
    styleUrls    : ['./forgot-password-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : animationsTabito
})
export class ForgotPasswordComponent implements OnInit
{
    forgotPasswordForm: FormGroup;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _formBuilder: FormBuilder
    ) {
        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }
    ngOnInit(): void {
    }
}
