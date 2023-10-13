import { Component, OnInit } from '@angular/core';
import {PollService} from "../services/poll.service";
import {PaysService} from "../services/pays.service";
import {AuthentificationService} from "../services/authentification.service";
import {UtilisateurService} from "../services/utilisateur.service";
import {Utilisateur} from "../models/utilisateur";

@Component({
  selector: 'app-polls',
  templateUrl: './polls.page.html',
  styleUrls: ['./polls.page.scss'],
})
export class PollsPage implements OnInit {

  isSearch = false;
  pools: any[] = [];
  loadedListPolls: any[];
  currentUser: Utilisateur = null;
  isLoading = true;

  constructor(private pollSevice: PollService, private authService: AuthentificationService, private userService: UtilisateurService) { }

  ngOnInit() {
    this.authService.isAuthenticated().then(
      (result1) => {
        if(result1) {
          this.userService.getCurrentUtilisateur().then(
            (result2) => {
              this.currentUser = result2;
            }
          );
        }
      }
    );

    this.pollSevice.getPolls().then(
      (data) => {
        this.isLoading = false;
        for(let i=0; i<data.length; i++) {
          if(localStorage.getItem('paysSelect')) {
            if(data[i].idCountry.includes(localStorage.getItem('paysSelect'))) {
              this.pools.push(data[i]);
            }
          } else {
            this.pools.push(data[i]);
          }
        }
        this.loadedListPolls = this.pools;
      }
    );
  }

  /* Recherche transaction */
  initializeItemsAll(): void {
    this.pools = this.loadedListPolls;
  }

  filterListTransaction(evt) {
    this.initializeItemsAll();

    const searchTerm = evt.detail.target.value;

    if (!searchTerm) {
      this.loadedListPolls = this.pools;
      return;
    }

    this.pools = this.pools.filter(current => {
      if ((current.title) && searchTerm){
        if (current.title.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }

    });
  }
  /* Fin recherche */

}
