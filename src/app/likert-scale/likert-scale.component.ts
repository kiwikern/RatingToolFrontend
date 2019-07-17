import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Component({
  selector: 'app-likert-scale',
  templateUrl: './likert-scale.component.html',
  styleUrls: ['./likert-scale.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LikertScaleComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => LikertScaleComponent),
      multi: true,
    },
  ],
})
export class LikertScaleComponent implements OnInit, ControlValueAccessor, Validator {
  @Input() title: string;
  @Input() text: string;
  @Input() attribute: string;
  noveltyValues = [1, 2, 3, 4, 5, 6, 7];
  selectedValue: number = null;
  onValidatorChange = () => {};
  onChange: any = () => {};
  onTouched: any = () => {};

  constructor() {}

  ngOnInit() {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.onValidatorChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {}

  writeValue(value: any): void {
    this.selectedValue = value;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return !!this.selectedValue ? null : { required: { valid: false } };
  }
}
