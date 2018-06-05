import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';

import { Entry } from '../../models/entry'
import { Entries } from '../../providers/entries/entries'
import { User } from '../../providers/user/user'

@IonicPage()
@Component({
  selector: 'page-entry-create',
  templateUrl: 'entry-create.html'
})
export class EntryCreatePage {
  editorConfig: any = {
    "editable": true,
    "spellcheck": true,
    "height": "auto",
    "minHeight": "200px",
    "width": "auto",
    "translate": "yes",
    "enableToolbar": true,
    "showToolbar": true,
    "placeholder": "Enter text here...",
    "toolbar": [
      ["bold", "italic", "underline"],
      ["link", "unlink", "image"]
    ]
  }

  isReadyToSave: boolean;
  journalId: number;
  title: string;
  entry: Entry;

  form: FormGroup;

  constructor(public navCtrl: NavController,
    public params: NavParams,
    public viewCtrl: ViewController,
    public formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private geolocation: Geolocation,
    private entries: Entries,
    private user: User) {

    if (params.get('entry')) {
      this.title = "Edit Entry";
      this.entry = params.get('entry')
    } else if (params.get('journalId')) {
      this.journalId = params.get('journalId');
      this.title = "Create New Entry"
      this.entry = new Entry(null, "");
    } else {
      let message = "An error occured.";
      let toast = this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.navCtrl.pop();
    }

    this.form = formBuilder.group({
      name: ['', Validators.required],
      content: ['', Validators.required]
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {
    if (this.form.valid) { 
      if (!this.entry.id){
        if (!!this.user._user.useLocation) {
          this.geolocation.getCurrentPosition().then((resp) => {
            this.entry.lat = resp.coords.latitude;
            this.entry.lng = resp.coords.longitude;
            this._entryAdd();
          }).catch((error) => {
            console.error('Error getting location', error);
            this._entryAdd();
          })
        } else {
          this._entryAdd();
        }
      } else {
        if (!!this.user._user.useLocation) {
          this.geolocation.getCurrentPosition().then((resp) => {
            this.entry.lat = resp.coords.latitude;
            this.entry.lng = resp.coords.longitude;
            this._entryEdit();
           }).catch((error) => {
             console.error('Error getting location', error);
             this._entryEdit();
           });
        } else {
          this._entryEdit();
        }
      }
    }
  }

  _entryAdd() {
    this.entries.add(this.journalId, this.entry).subscribe(req => {
      this.entry.id = req['data']['entryId'];
      this.viewCtrl.dismiss(this.entry);
    }, err => {
      let message = (err.error.message) ? err.error.message : "An error occured.";
      let toast = this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

  _entryEdit() {
    this.entries.edit(this.entry).subscribe(req => {
      this.viewCtrl.dismiss(this.entry);
    }, err => {
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
