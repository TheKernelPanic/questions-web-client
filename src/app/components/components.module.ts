import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationBarComponent} from "./navigation-bar/navigation-bar.component";
import {TagsSelectorComponent} from "./tags-selector/tags-selector.component";
import {TopicSelectorComponent} from "./topic-selector/topic-selector.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ContentWrapperComponent } from './content-wrapper/content-wrapper.component';



@NgModule({
  declarations: [
    NavigationBarComponent,
    TagsSelectorComponent,
    TopicSelectorComponent,
    ContentWrapperComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        NavigationBarComponent,
        TagsSelectorComponent,
        TopicSelectorComponent,
        ContentWrapperComponent
    ]
})
export class ComponentsModule { }
