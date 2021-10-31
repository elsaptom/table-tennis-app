import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TennisService } from '../tennis.service';

@Component({
  selector: 'app-player-score',
  templateUrl: './player-score.component.html',
  styleUrls: ['./player-score.component.css']
})
export class PlayerScoreComponent implements OnInit {
  score: any;
  constructor(private tennisService: TennisService) { }

  ngOnInit(): void {
    this.tennisService.currentData.subscribe(data => this.score = data);
  }



}

