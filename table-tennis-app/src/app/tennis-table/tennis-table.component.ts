import { Component, OnInit, ViewChild } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { PlayerActionsComponent } from '../player-actions/player-actions.component';
import { TennisService } from '../tennis.service';

@Component({
  selector: 'app-tennis-table',
  templateUrl: './tennis-table.component.html',
  styleUrls: ['./tennis-table.component.css']
})
export class TennisTableComponent implements OnInit {
  closed: any;
  winner: number = 0;
  gameStatistics: any ={};
  leftArrow = faArrowLeft;
  previousAction: string = '';
  previousPlayer: number;
  disabledButton: boolean;
  @ViewChild(PlayerActionsComponent, {static : true}) child : PlayerActionsComponent;

  constructor(private modalService: NgbModal, private tennisService: TennisService) { }

  ngOnInit(): void {
  }

  openModal(winner: any) {
    this.modalService.open(winner , {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closed = `Closed with: ${result}`;
      window.location.reload();
    }, (reason) => {
      this.closed = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    window.location.reload();
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  winnerFound(event:any) {
    this.winner = event;
    this.tennisService.currentStatistics1.subscribe(data => 
      {this.gameStatistics.playerOne = data
      });
    this.tennisService.currentStatistics2.subscribe(data => this.gameStatistics.playerTwo = data);
    // this.openModal(event);
    this.saveStatistics();

    let element:HTMLElement = document.getElementById('auto') as HTMLElement;
    element.click();

    console.log(event);    
  }

  saveStatistics() {
    this.tennisService.saveStatistics(this.gameStatistics).subscribe(data=> {
      console.log('Saved');
    },
    (error) => {
      console.log('Error');
      
    })
  }

  revertAction() {
    this.tennisService.previousAction.subscribe(data => this.previousAction = data);
    this.tennisService.previousplayer.subscribe(data => this.previousPlayer = data);
    if (this.previousPlayer !== 0) {
    this.child.playerAction(true, this.previousAction, this.previousPlayer);
    }
  }

}
