import { Component, OnInit } from '@angular/core';
import {Headline} from '../models/headline';
import {Editor} from '../models/editor';
import {Comment} from '../models/comment';
import {Utilisateur} from '../models/utilisateur';
import {HeadlineService} from "../services/headline.service";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-send-advice',
  templateUrl: './send-advice.page.html',
  styleUrls: ['./send-advice.page.scss'],
})
export class SendAdvicePage implements OnInit {

  isLoading = false;
  currentHeadline: Headline;
  currentEditor: Editor = null;
  currentComment: Comment[] = [];
  currentUser: Utilisateur = null;
  isComment = false;
  writeComment = '';
  scrollComment = false;

  content: any;
  headlines: Headline[] = [];
  constructor(private alertController: AlertController, private headlineService: HeadlineService) { }

  ngOnInit() {
    this.headlineService.getHeadlines().then(
      (data2) => {
        this.headlines = data2;
      }
    );
  }

  addHeadline(id, phone, reaction, content) {
    const tmpHeadline = new Headline(id,reaction, content, phone);
    this.headlineService.addNewHeadline(tmpHeadline).then(
      () => {
        this.headlines.push(tmpHeadline);
      }
    );
  }

  async donneAvis(etat) {

    const alert = await this.alertController.create({
      header: 'Se connecté',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: (reponse: any) => {
            //En attente
          }
        },
        {
          text: 'Envoyer',
          role: 'confirm',
          handler: (reponse: any) => {
            this.addHeadline(reponse.phone, reponse.phone, etat, this.content);
          }
        }
      ],
      inputs: [
        {
          type: 'text',
          placeholder: 'Pseudo',
          name: 'reponse'
        },
        {
          type: 'tel',
          placeholder: 'Phone',
          name: 'phone'
        }
      ]
    });

    await alert.present();
  }

}
