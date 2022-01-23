import {Routes} from "@angular/router";
import {ErrorComponent} from "./views/error/error.component";
import {NewQuestionComponent} from "./views/new-question/new-question.component";
import {QuestionCreatedComponent} from "./views/question-created/question-created.component";
import {QuestionPreviewComponent} from "./views/question-preview/question-preview.component";
import {ListQuestionsComponent} from "./views/list-questions/list-questions.component";
import {NewHelpComponent} from "./views/new-help/new-help.component";

const routesDefinitions: Routes = [
  {
    path: 'new-question',
    component: NewQuestionComponent
  },
  {
    path: 'error/:code',
    component: ErrorComponent
  },
  {
    path: 'question-created',
    component: QuestionCreatedComponent
  },
  {
    path: 'question-preview/:questionId',
    component: QuestionPreviewComponent
  },
  {
    path: 'new-help',
    component: NewHelpComponent
  },
  {
    path: 'questions',
    component: ListQuestionsComponent
  },
  {
    path: '',
    redirectTo: '/questions',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/error/404'
  }
];
export default routesDefinitions;
