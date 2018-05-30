import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { Journal } from '../../models/journal'

@IonicPage()
@Component({
  selector: 'page-journal-create',
  templateUrl: 'journal-create.html'
})
export class JournalCreatePage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;
  title: string;
  journal: Journal;

  form: FormGroup;

  constructor(public navCtrl: NavController, public params: NavParams, public viewCtrl: ViewController, formBuilder: FormBuilder) {
    if (params.get('journal')) {
      this.title = "Edit Journal";
      this.journal = params.get('journal')
    } else {
      this.title = "Create New Journal"
      this.journal = new Journal(null, "");
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
    this.viewCtrl.dismiss(this.journal);
  }
}
