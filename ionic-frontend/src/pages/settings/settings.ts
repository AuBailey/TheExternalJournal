import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';

import { Settings } from '../../providers';
import { User } from '../../providers'

/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  useLocation: boolean;
  editorConfig: any = {
    "editable": true,
    "spellcheck": true,
    "height": "auto",
    "minHeight": "200px",
    "width": "auto",
    "minWidth": "0",
    "translate": "yes",
    "enableToolbar": true,
    "showToolbar": true,
    "placeholder": "Enter text here...",
    "imageEndPoint": "",
    "toolbar": [
        ["bold", "italic", "underline"],
        ["fontName", "fontSize", "color"],
        ["link", "unlink", "image", "video"]
    ]
}

  constructor(public navCtrl: NavController,
    public settings: Settings,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private user: User) {
      this.useLocation = !!user._user.useLocation;
  }

  changeUseLocation(){
    if (this.useLocation) {
        this.user.changeUseLocation(1);
    } else{
      this.user.changeUseLocation(0);
    }
  }

  changePassword() {
    this.navCtrl.push('ChangePasswordPage');
  }

  logout() {
    this.user.logout();
    this.navCtrl.setRoot('LoginPage');
  }

  deleteUser(){
    let alert = this.alertCtrl.create({
      title: 'Confirm delete User',
      message: 'Are you sure you want to permanently delete this User and all it\'s Data?',
      buttons: [
        {
          text: 'No',
          handler: () => {
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.user.delete();
            this.navCtrl.setRoot('LoginPage');
          }
        }
      ]
    });
    alert.present();
    
  }
}
