import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {HeadlineService} from '../../services/headline.service';
import {Headline} from '../../models/headline';
import {Editor} from '../../models/editor';
import {EditorService} from '../../services/editor.service';
import {CommentService} from '../../services/comment.service';
import {Comment} from '../../models/comment';
import {Utilisateur} from '../../models/utilisateur';
import {UtilisateurService} from '../../services/utilisateur.service';
import {AlertService} from '../../services/alert.service';
import {TranslateService} from "@ngx-translate/core";
import {StorageService} from "../../services/storage.service";
import {AuthentificationService} from "../../services/authentification.service";

@Component({
  selector: 'app-miniature-headline',
  templateUrl: './miniature-headline.component.html',
  styleUrls: ['./miniature-headline.component.scss'],
})
export class MiniatureHeadlineComponent implements OnInit {

  @Input() idHeadline;
  @Input() data: Headline;

  currentEditor: Editor = null;
  currentComment: Comment[] = [];
  numeroUser: string = null;
  writeComment = '';

  constructor(private authService: AuthentificationService, private storageService: StorageService, private translate: TranslateService, private alertService: AlertService, private userService: UtilisateurService, private commentService: CommentService, private modalController: ModalController, private headlineService: HeadlineService, private editorService: EditorService) { }

  ngOnInit() {

    this.commentService.getComments(this.data.id).then(
      (data2) => {
        this.currentComment = data2;
      }
    );

  }

  sendComment(idParent: string) {
    if(this.writeComment) {
      const tmpComment = new Comment(this.data.id, this.numeroUser, idParent, this.writeComment);
      this.commentService.addNewComment(tmpComment).then(
        () => {
          this.currentComment.unshift(tmpComment);
          this.writeComment = '';
        }
      );
    }
  }

  getValueTraduct(texte: string) {
    let result; let result2;
    const result1 = texte.split((this.translate.currentLang ? this.translate.currentLang : 'en') + '>');
    if(result1.length > 1) { result2 = result1[1].split('</'); }
    if(result1.length > 1 && result2.length > 0) { result = result2[0]; }
    return result ? result : texte;
  }

  likeCurrentHeadline() {
    this.headlineService.likeHeadline(this.data).then(
      () => {
        if(this.data.likes.includes(this.numeroUser)) {
          this.data.likes.splice(this.data.likes.indexOf(this.numeroUser), 1);
        } else
        {
          if(this.data.disLikes.includes(this.numeroUser)) {
            this.disLikeCurrentHeadline();
          }
          this.data.likes.push(this.numeroUser);
        }
      }
    );
  }

  disLikeCurrentHeadline() {
    this.headlineService.disLikeHeadline(this.data).then(
      () => {
        if(this.data.disLikes.includes(this.numeroUser))
        {this.data.disLikes.splice(this.data.disLikes.indexOf(this.numeroUser), 1);}
        else
        {
          if(this.data.likes.includes(this.numeroUser)) {
            this.likeCurrentHeadline();
          }
          this.data.disLikes.push(this.numeroUser);
        }
      }
    );
  }
}
