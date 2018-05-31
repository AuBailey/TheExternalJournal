import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { Entry } from '../../models/entry'

@IonicPage()
@Component({
  selector: 'page-entry-create',
  templateUrl: 'entry-create.html'
})
export class EntryCreatePage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;
  title: string;
  entry: Entry;

  form: FormGroup;

  constructor(public navCtrl: NavController, public params: NavParams, public viewCtrl: ViewController, formBuilder: FormBuilder) {
    if (params.get('entry')) {
      this.title = "Edit Entry";
      this.entry = params.get('entry')
    } else {
      this.title = "Create New Entry"
      this.entry = new Entry(null, "");
    }
    
    this.form = formBuilder.group({
      name: ['', Validators.required]
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
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.entry);
  }
}
