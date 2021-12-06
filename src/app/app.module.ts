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
import {HttpClientModule} from "@angular/common/http";
import {environment} from "../environments/environment";
import {ReactiveFormsModule} from "@angular/forms";

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
        RouterModule.forRoot(routesDefinitions),
        HttpClientModule,
        ReactiveFormsModule
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
