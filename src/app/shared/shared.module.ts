import { NgModule } from '@angular/core';

import { MenuItems } from './menu-items/menu-items';
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
import { ClicPageComponent } from "./click-page/clic-page.component";
import { AppHeaderComponent } from "../layouts/full/header/header.component";
import { HeaderPageComponent } from './header-page/header-page.component';
import {DemoMaterialModule} from "../demo-material-module";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    HeaderPageComponent,
    ClicPageComponent,
  ],
  imports: [ DemoMaterialModule, FlexLayoutModule],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    HeaderPageComponent,
    ClicPageComponent,
   ],
  providers: [ MenuItems ]
})
export class SharedModule { }
