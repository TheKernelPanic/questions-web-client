import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import {QuestionRoutingModule} from "./question-routing.module";
import { QuestionComponent } from './question.component';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import {ComponentsModule} from "../components/components.module";
import {ReactiveFormsModule} from "@angular/forms";
import {HelpSelectorComponent} from "../components/help-selector/help-selector.component";
import {TranslateModule} from "@ngx-translate/core";
import {PipesModule} from "../pipes/pipes.module";


@NgModule({
  declarations: [
    ListComponent,
    QuestionComponent,
    CreateComponent,
    DetailComponent,
    HelpSelectorComponent
  ],
    imports: [
        CommonModule,
        QuestionRoutingModule,
        ComponentsModule,
        ReactiveFormsModule,
        TranslateModule.forChild(),
        PipesModule
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [QuestionComponent]
})
export class QuestionModule { }
