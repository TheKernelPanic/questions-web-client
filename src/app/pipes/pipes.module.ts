import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ImageSourceResolverPipe} from "./image-source-resolver.pipe";
import { DateUtcToLocalRawFormatPipe } from './date-utc-to-local-raw-format.pipe';



@NgModule({
  declarations: [
    ImageSourceResolverPipe,
    DateUtcToLocalRawFormatPipe
  ],
  imports: [
    CommonModule
  ],
    exports: [
        ImageSourceResolverPipe,
        DateUtcToLocalRawFormatPipe
    ]
})
export class PipesModule { }
