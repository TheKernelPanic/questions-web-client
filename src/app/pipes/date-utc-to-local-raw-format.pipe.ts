import { Pipe, PipeTransform } from '@angular/core';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

@Pipe({
  name: 'dateUtcToLocalRawFormat'
})
export class DateUtcToLocalRawFormatPipe implements PipeTransform {

  private defaultFormat: string = 'YYYY/MM/DD HH:mm[h]'

  public constructor() {
    dayjs.extend(utc);
  }

  public transform(value: string|null|undefined, format: string|null = null): string {
    if (!value) {
      return '';
    }
    return dayjs.utc(value).local().format(format ?? this.defaultFormat);
  }
}
