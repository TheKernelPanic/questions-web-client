import {Pipe, PipeTransform} from "@angular/core";
import {AnswerTranslation, QuestionTranslation} from "../domain/interfaces";

@Pipe({name: 'translation'})
export class TranslationPipe implements PipeTransform {
  public transform(translations: any, ...args: any[]): any {
    for (let i: number = 0; i  < translations.length; i++) {
      if (translations[i].language.iso_code === args[0]) {
        return translations[i];
      }
    }
    throw new Error('LANGUAGE NOT FOUND');
  }
}
