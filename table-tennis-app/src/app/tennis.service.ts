import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TennisService {
  baseUrl = 'http://localhost:3000/';
  score = {
    playerOne: 0,
    playerTwo: 0
  };
  playerOneStatistics =  {};
  playerTwoStatistics =  {};
  action = '';
  private dataSource = new BehaviorSubject(this.score); 
  private statistics1 = new BehaviorSubject(this.playerOneStatistics);
  private statistics2 = new BehaviorSubject(this.playerTwoStatistics);
  private actionType = new BehaviorSubject(this.action);
  currentData = this.dataSource.asObservable();
  currentStatistics1 = this.statistics1.asObservable();
  currentStatistics2 = this.statistics2.asObservable();
  previousAction = this.actionType.asObservable();
  constructor(private http: HttpClient) { }

  updateScore(newScore: any) {
    this.dataSource.next(newScore);
  }

  updateStatistics1(newData: any) {
    this.statistics1.next(newData);
  }

  updateStatistics2(newData: any) {
    this.statistics2.next(newData);
  }

  updateAction(action: any) {
    this.actionType.next(action);
  }

  saveStatistics(statistics: any): Observable<any> {
    const url = this.baseUrl + 'matches';
    return this.http.post<any>(url, statistics);
  }
}

