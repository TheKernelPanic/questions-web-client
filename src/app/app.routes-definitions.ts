import {Routes} from "@angular/router";
import {DashboardComponent} from "./views/dashboard/dashboard.component";
import {ErrorComponent} from "./views/error/error.component";
import {NewQuestionComponent} from "./views/new-question/new-question.component";

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
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/error/404'
  }
];
export default routesDefinitions;
