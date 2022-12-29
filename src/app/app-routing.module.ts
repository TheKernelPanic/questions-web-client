import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ErrorComponent} from "./error/error.component";
import {HelpComponent} from "@Help/help.component";
import {QuestionComponent} from "@Question/question.component";
import {QuestionnaireComponent} from "@Questionnaire/questionnaire.component";

const routes: Routes = [
  {
    path: 'question',
    component: QuestionComponent,
    loadChildren: () => import('@Question/question.module').then(m => m.QuestionModule)
  },
  {
    path: 'help',
    component: HelpComponent,
    loadChildren: () => import('@Help/help.module').then(m => m.HelpModule)
  },
  {
    path: 'questionnaire',
    component: QuestionnaireComponent,
    loadChildren: () => import('@Questionnaire/questionnaire.module').then(m => m.QuestionnaireModule)
  },
  {
    path: 'error/:code',
    component: ErrorComponent
  },
  {
    path: '**',
    redirectTo: 'question',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
