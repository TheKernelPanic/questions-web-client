import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { QuestionnaireComponent } from '@Questionnaire/questionnaire.component';
import {QuestionnaireRoutingModule} from "@Questionnaire/questionnaire-routing.module";
import {ComponentsModule} from "../components/components.module";
import {ReactiveFormsModule} from "@angular/forms";
import { QuestionsListEditorComponent } from './components/questions-list-editor/questions-list-editor.component';
import {SortablejsModule} from "ngx-sortablejs";




@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    QuestionnaireComponent,
    QuestionsListEditorComponent
  ],
  imports: [
    CommonModule,
    QuestionnaireRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    SortablejsModule
  ]
})
export class QuestionnaireModule { }
