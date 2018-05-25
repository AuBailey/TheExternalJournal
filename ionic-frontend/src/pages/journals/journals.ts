import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Journal } from '../../models/journal';
import { Journals } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-journals',
  templateUrl: 'journals.html'
})
export class JournalsPage {
  journals$: Journal[];

  constructor(public navCtrl: NavController, public journals: Journals, public modalCtrl: ModalController) {
    this.journals.getAll().share().subscribe(res => {
      this.journals$ = res.data.journals;
    } );
  }

  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new Journal. This shows our JournalCreatePage in a
   * modal and then adds the new Journal to our data source if the user created one.
   */
  addJournal() {
    let addModal = this.modalCtrl.create('JournalCreatePage');
    addModal.onDidDismiss(journal => {
      if (journal) {
        this.journals.add(journal);
      }
    })
    addModal.present();
  }

  editJournal(journal) {
    console.log("edit me")
  }

  deleteJournal(journal) {
    //TODO: Prompt if sure they want to delete
    this.journals.delete(journal).subscribe(response => {
      if (response.success) {
        this.journals$.splice(this.journals$.indexOf(journal), 1);
      }
    });
  }

  /**
   * Navigate to the Entries Page
   */
  openJournal(journal: Journal) {
    this.navCtrl.push('EntriesPage', {
      journal: journal
    });
  }
}
