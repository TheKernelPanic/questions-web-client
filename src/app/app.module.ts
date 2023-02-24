import {NgModule} from "@angular/core";
import {environment} from "../environments/environment";
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
import {ComponentsModule} from "./components/components.module";
import {ErrorComponent} from "./error/error.component";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import packageJson from "../../package.json";

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent
  ],
  imports: [
    AppRoutingModule,
    ComponentsModule,
    BrowserModule,
    HttpClientModule
  ],
  exports: [],
  providers: [
    {provide: 'applicationServerHost', useValue: environment.applicationServer.host},
    {provide: 'APP_VERSION', useValue: packageJson.version},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
