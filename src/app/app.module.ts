import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './widgets/navigation-bar/navigation-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewQuestionComponent } from './views/new-question/new-question.component';
import { ErrorComponent } from './views/error/error.component';
import {RouterModule} from "@angular/router";
import routesDefinitions from "./app.routes-definitions";
import {HttpClientModule} from "@angular/common/http";
import {environment} from "../environments/environment";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuestionCreatedComponent } from './views/question-created/question-created.component';
import { QuestionPreviewComponent } from './views/question-preview/question-preview.component';
import { ListQuestionsComponent } from './views/list-questions/list-questions.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    NewQuestionComponent,
    ErrorComponent,
    QuestionCreatedComponent,
    QuestionPreviewComponent,
    ListQuestionsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routesDefinitions),
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    {provide: 'applicationServerHost', useValue: environment.applicationServer.host}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
