import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { animationsTabito } from '../animations';

@Component({
    selector     : 'lock',
    templateUrl  : './lock.component.html',
    styleUrls    : ['./lock.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : animationsTabito
})
export class LockComponent implements OnInit
{
    lockForm: FormGroup;

    constructor(
        private _formBuilder: FormBuilder
    ) {
        this.lockForm = this._formBuilder.group({
            username: [
                {
                    value   : 'Katherine',
                    disabled: true
                }, Validators.required
            ],
            password: ['', Validators.required]
        });
    }

    ngOnInit(): void
    {}
}
