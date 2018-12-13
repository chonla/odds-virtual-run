import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PositiveNumberValidator {

  static Positive(control: AbstractControl): {[key: string]: any} | null {
    const ok = /^\d+(\.\d+)?$/.test(control.value);
    if (ok && (Number.parseFloat(control.value) > 0.0)) {
      return null;
    }
    return {'positive': {value: control.value}};
  }
}
