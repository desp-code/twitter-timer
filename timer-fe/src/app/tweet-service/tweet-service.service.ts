import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TweetIdService {
  
  public interval: Observable<any>;
  private latestTweetIdService = 'http://127.0.0.1:5000/latest-tweet-content';

  private latestTweetSubscription;
  public latestTweetId = {tid: ""};

  constructor(private http: HttpClient) { 
    this.interval = interval(500);

  }

  getTweetId() {
    return this.http.get(this.latestTweetIdService);
  }

  getLatestTweetId = (): Observable<any> => {
    return new Observable(obs => {
      if (this.latestTweetSubscription) {
        this.latestTweetSubscription.unsubscribe();
      }
      this.latestTweetSubscription = this.interval.subscribe(string => {
          this.getTweetId().subscribe(data => {this.latestTweetId.tid = data["html"]}); 
          obs.next(this.latestTweetId);
          obs.complete();
      }, error => {
        obs.error(error);
        obs.complete();
      });
    });
  }
}
