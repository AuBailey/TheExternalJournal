import {AbstractControl} from '@angular/forms';

export class PasswordMatchValidation {
  
  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('password').value; // to get value in input tag
    let passwordConfirm = AC.get('passwordConfirm').value; // to get value in input tag
    if(password != passwordConfirm) {
      // Cant use passwordConfirm.setErrors
      AC.get('passwordConfirm').setErrors( {MatchPassword: true} )
    }
  }
}