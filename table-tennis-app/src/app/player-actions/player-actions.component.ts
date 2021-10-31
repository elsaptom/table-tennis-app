import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TennisService } from '../tennis.service';

@Component({
  selector: 'app-player-actions',
  templateUrl: './player-actions.component.html',
  styleUrls: ['./player-actions.component.css']
})
export class PlayerActionsComponent implements OnInit {

  @Input() player: any;
  playerStatistics: any = {};
  playerObj = {
    name: '',
    points: 0,
    smashes: 0,
    aces: 0,
    fluckes: 0
  }
  previousAction: string = '';
  previousPlayer: number = 1;
  score: any;
  disableButton: boolean = false;
  finalStatistics1: any = {};
  finalStatistics2: any = {};
  @Output() winner = new EventEmitter<number>();
  constructor(private tennisService: TennisService) { 
  }

  ngOnInit(): void {
    
    this.playerStatistics.playerOne = Object.assign({}, this.playerObj);
    this.playerStatistics.playerOne.name = 'Enrico';
    this.playerStatistics.playerTwo = Object.assign({}, this.playerObj);
    this.playerStatistics.playerTwo.name = 'Tobi';
    localStorage.setItem('prevPlayer', this.player);
    console.log(this.player);
    console.log(this.playerStatistics);
    this.tennisService.currentData.subscribe(data => this.score = data);
    this.tennisService.currentStatistics1.subscribe(data => this.finalStatistics1 = data);
    this.tennisService.currentStatistics2.subscribe(data => this.finalStatistics2 = data);
    this.tennisService.previousAction.subscribe(data => this.previousAction = data);
  }

  /**
   * Function to define the player actions
   */

   playerAction(revert: any, actionType: any, player = this.player) {
    //  this.previousPlayer = this.player;
    this.tennisService.updatePlayer(this.player);
    this.tennisService.updateAction(actionType);
    console.log(this.player, actionType);
    // revert ? this.player = this.previousPlayer : this.player = this.player;
    if (revert) {
      this.player = player;
    this.tennisService.updatePlayer(0);
      this.tennisService.currentStatistics1.subscribe(data => this.playerStatistics.playerOne = data);
      this.tennisService.currentStatistics2.subscribe(data => this.playerStatistics.playerTwo = data); 
    }
    if(this.player === 1) {
      this.getStatistics(revert, this.playerStatistics.playerOne, actionType);
      this.tennisService.updateStatistics1(this.playerStatistics.playerOne);
    } else if(this.player === 2) {
      this.getStatistics(revert, this.playerStatistics.playerTwo, actionType);
      this.tennisService.updateStatistics2(this.playerStatistics.playerTwo);
    }
   }

   /**
    * Function to create the statistics
    */
    getStatistics(revert: any, playerObj: any, actionType: string) {
        switch (actionType) {
          case 'SMASH':
            revert && playerObj.smashes > 0 ? --playerObj.smashes : ++playerObj.smashes;
            break;
          case 'ACE': 
            revert && playerObj.aces > 0 ? --playerObj.aces : ++playerObj.aces;
            break;
          case 'FLUKE': 
            revert && playerObj.fluckes > 0 ? --playerObj.fluckes : ++playerObj.fluckes;
            break;
          default:
            break;
        }
        revert && playerObj.points > 0 ? --playerObj.points : ++playerObj.points;
        this.player === 1 ? this.score.playerOne = playerObj.points : this.score.playerTwo = playerObj.points;
        if (this.score.playerOne === 11 || this.score.playerTwo === 11) {
          this.score.playerOne === 11 ? this.winner.emit(1) :  this.winner.emit(2);
        }
        this.tennisService.updateScore(this.score);
        console.log(this.tennisService.score);
        console.log(this.playerStatistics.playerOne);
        console.log(this.playerStatistics.playerTwo);
        
    }
}
