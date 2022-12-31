import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ImageSourceResolverPipe} from "./image-source-resolver.pipe";



@NgModule({
  declarations: [
    ImageSourceResolverPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ImageSourceResolverPipe
  ]
})
export class PipesModule { }
