import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './widgets/navigation-bar/navigation-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewQuestionComponent } from './views/new-question/new-question.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ErrorComponent } from './views/error/error.component';
import {RouterModule} from "@angular/router";
import routesDefinitions from "./app.routes-definitions";

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    NewQuestionComponent,
    DashboardComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routesDefinitions)
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
