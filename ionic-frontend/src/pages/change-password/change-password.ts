import { Component } from '@angular/core'; 
import { IonicPage, NavController, ToastController } from 'ionic-angular'; 
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { PasswordMatchValidation } from '../../validators';
import { User } from '../../providers'; 
 
@IonicPage() 
@Component({ 
  selector: 'page-changepassword', 
  templateUrl: 'change-password.html' 
}) 
export class ChangePasswordPage { 
    account: { oldPassword: string, password: string, passwordConfirm: string } = { oldPassword: '',password: '' ,passwordConfirm: ''}; 
    changePasswordForm: FormGroup; 
    isLoading: boolean = false; 
   
    constructor(public navCtrl: NavController, 
      public formBuilder: FormBuilder, 
      public user: User, 
      public toastCtrl: ToastController) { 
   
      this.changePasswordForm = formBuilder.group({ 
        oldPassword: ['', Validators.required],
        password: ['', Validators.required],
        passwordConfirm: ['', Validators.required]
      }, {
        validator: PasswordMatchValidation.MatchPassword
      }) 
    }

    changePassword(){
      if (this.changePasswordForm.valid) {
        this.isLoading = true;
        this.user.changePassword(this.account).subscribe((resp) => {
          this.isLoading = false;
          let message = "Password Successfully Changed!";
          let toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
          });
          toast.present();
          this.navCtrl.push('SettingsPage');
        }, (err) => {
          this.isLoading = false;
          let message = (err.error.message) ? err.error.message : "An error occured.";
          let toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
          });
          toast.present();
        });
      }
    }
}