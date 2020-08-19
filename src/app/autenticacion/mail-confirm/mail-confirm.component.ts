import { Component, ViewEncapsulation } from '@angular/core';

import { animationsTabito } from '../animations';

@Component({
    selector     : 'mail-confirm',
    templateUrl  : './mail-confirm.component.html',
    styleUrls    : ['./mail-confirm.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : animationsTabito
})
export class MailConfirmComponent {
    constructor( ) {
    }
}
