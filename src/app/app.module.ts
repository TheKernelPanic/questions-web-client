import {NgModule} from "@angular/core";
import {environment} from "../environments/environment";
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
import {ComponentsModule} from "./components/components.module";
import {ErrorComponent} from "./error/error.component";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import packageJson from "../../package.json";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent
  ],
  imports: [
    AppRoutingModule,
    ComponentsModule,
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: environment.i18n.default
    })
  ],
  exports: [],
  providers: [
    {provide: 'applicationServerHost', useValue: environment.applicationServer.host},
    {provide: 'APP_VERSION', useValue: packageJson.version},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
