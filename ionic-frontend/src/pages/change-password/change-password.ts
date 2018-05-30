import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html'
})
export class ChangePasswordPage {
    account: { oldPassword: string, newPassword: string, confrimPassword: string } = { oldPassword: '',newPassword: '' ,confrimPassword: ''};
    loginForm: FormGroup;
    isLoading: boolean = false;
  
    constructor(public navCtrl: NavController,
      public formBuilder: FormBuilder,
      public user: User,
      public toastCtrl: ToastController) {
  
      this.loginForm = formBuilder.group({
        email: ['', Validators.compose([Validators.email, Validators.required])],
        password: ['', Validators.required]
      })

}