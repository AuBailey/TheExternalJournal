import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController, NavParams } from 'ionic-angular';

import { Entry } from '../../models/entry';

declare var google;

@IonicPage()
@Component({
    selector: 'page-entry-view',
    templateUrl: 'entry-view.html'
})
export class EntryViewPage {
    displayMap: boolean;
    @ViewChild('map') mapElement: ElementRef;
    map: any;
    entry: Entry;

    constructor(public navCtrl: NavController,
        public params: NavParams,
        public modalCtrl: ModalController,
        private toastCtrl: ToastController) {
        if (params.get('entry')) {
            this.entry = params.get('entry')
            this.displayMap = !!this.entry.lat
        } else {
            let message = "Error reading entry";
            let toast = this.toastCtrl.create({
                message: message,
                duration: 3000,
                position: 'top'
            });
            toast.present();

            navCtrl.pop();
        }
    }

    ionViewDidLoad() {
        this._loadMap();
    }

    _loadMap() {
        if (this.displayMap) {
            let latLng = new google.maps.LatLng(this.entry.lat, this.entry.lng);

            let mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

            let marker = new google.maps.Marker({
                map: this.map,
                animation: google.maps.Animation.DROP,
                position: latLng
            });
            marker.setMap(this.map);
        }
    }

    editEntry(entry: Entry) {
        this.navCtrl.push('EntryCreatePage', {
            entry: entry
        });
    }
}
