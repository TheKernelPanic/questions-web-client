import { Component, OnInit } from '@angular/core';
import {Lesson, Question, Topic} from "../../domain/interfaces";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: []
})
export class NewQuestionComponent implements OnInit {

  public form: FormGroup;
  public maxAmountAnswers: number = 5;
  public loader: boolean = false;
  public topics: Topic[];
  public formAsErrors: boolean;
  public lessonSelected: Lesson|null;

  public constructor(
    private formBuilder: FormBuilder
  ) {
    this.formAsErrors = false;
    this.lessonSelected = null;
  }

  public ngOnInit(): void {
    this.initializeForm();

    this.addNewAnswer();
    this.addNewAnswer();
    this.addNewAnswer();
  }

  public addNewAnswer(): void {
    if ((this.form.get('answers') as FormArray).length >= this.maxAmountAnswers) {
      return;
    }
    (this.form.get('answers') as FormArray).push(
      new FormGroup({
        text: new FormControl('', Validators.required),
        result: new FormControl(false)
      })
    );
  }

  public removeAnswer(index: number): void {
    (this.form.get('answers') as FormArray).removeAt(index);
  }

  private initializeForm(): void {
    this.form = new FormGroup({
      questionTitle: new FormControl('', Validators.required),
      answers: this.formBuilder.array([])
    })
  }

  public answers(): FormArray {
    return this.form.get('answers') as FormArray;
  }

  private getHttpModel(): Question {
    const question: Question = {
      title: (this.form.get('questionTitle') as FormControl).value,
      answers: []
    };
    for (let i = 0; i < (this.form.get('answers') as FormArray).length; i++) {
      const group: AbstractControl = (this.form.get('answers') as FormArray).at(i);
      question.answers.push({
        text: (group.get('text') as FormControl).value,
        result: (group.get('result') as FormControl).value,
        position: i+1
      });
    }
    return question;
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.formAsErrors = true;
      return;
    }

  }
}
