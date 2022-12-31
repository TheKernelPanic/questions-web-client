import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationBarComponent} from "./navigation-bar/navigation-bar.component";
import {TagsSelectorComponent} from "./tags-selector/tags-selector.component";
import {TopicSelectorComponent} from "./topic-selector/topic-selector.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ContentWrapperComponent } from './content-wrapper/content-wrapper.component';
import { BookSelectorComponent } from './book-selector/book-selector.component';
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";
import { LessonSelectorComponent } from './lesson-selector/lesson-selector.component';
import { HelpCardComponent } from './help-card/help-card.component';
import { SpinnerLoaderComponent } from './spinner-loader/spinner-loader.component';
import { QuestionCardComponent } from './question-card/question-card.component';



@NgModule({
  declarations: [
    NavigationBarComponent,
    TagsSelectorComponent,
    TopicSelectorComponent,
    ContentWrapperComponent,
    BookSelectorComponent,
    LessonSelectorComponent,
    HelpCardComponent,
    SpinnerLoaderComponent,
    QuestionCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    RouterModule
  ],
  exports: [
    NavigationBarComponent,
    TagsSelectorComponent,
    TopicSelectorComponent,
    ContentWrapperComponent,
    BookSelectorComponent,
    LessonSelectorComponent,
    HelpCardComponent,
    QuestionCardComponent,
    SpinnerLoaderComponent
  ]
})
export class ComponentsModule { }
