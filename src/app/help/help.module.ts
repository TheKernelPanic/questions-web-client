import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpComponent } from './help.component';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import {HelpRoutingModule} from "./help-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ComponentsModule} from "../components/components.module";



@NgModule({
  declarations: [
    HelpComponent,
    CreateComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    HelpRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [HelpComponent]
})
export class HelpModule { }
