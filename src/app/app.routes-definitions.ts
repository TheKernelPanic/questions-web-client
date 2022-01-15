import {Routes} from "@angular/router";
import {ErrorComponent} from "./views/error/error.component";
import {NewQuestionComponent} from "./views/new-question/new-question.component";
import {QuestionCreatedComponent} from "./views/question-created/question-created.component";
import {QuestionPreviewComponent} from "./views/question-preview/question-preview.component";

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
