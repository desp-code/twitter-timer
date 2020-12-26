import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { interval, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountUpTimerService {

  public intervalSubscription;
  public recordSubscription;
  public interval: Observable<any>;
  public currentCountSeconds: number = 0;
  private timerRestartService = 'http://127.0.0.1:5000/latest-tweet';
  private timerStartService = 'http://127.0.0.1:5000/init-timer';
  private twitterHandleService = 'http://127.0.0.1:5000/twitter-handle';
  private longestTimerSeconds = 0;
  private lastTimestamp = '2020-11-11 19:53:51';
  public twitterHandle;

  public longestTimerValue = {
    seconds: '0',
    mins: '0',
    hours: '0',
  }
  

  public timerValue = {
    seconds: '0',
    mins: '0',
    hours: '0',
  }
  
  constructor(private http: HttpClient) { 
    this.interval = interval(1000);
    this.initTimer().subscribe(data => {
      console.log("INITIALIZING"); 
      console.log(data); 
      this.currentCountSeconds = data['timer_set']; 
      this.lastTimestamp = data['date_time'];
    });

    this.getTwitterHandle().subscribe(data => {
      console.log("INITIALIZING"); 
      console.log(data); 
      this.twitterHandle = data['handle']; 
    });

    interval(1000).subscribe(x => { // will execute every 30 seconds
      this.getRefreshTimer().subscribe(data => {
        if(data['latest_tweet_timestamp'] > this.lastTimestamp) {
          console.log("ALERT: New Tweet!");
          console.log(data); 
          this.lastTimestamp = data['latest_tweet_timestamp']; 
          console.log("Resetting timer. Latest tweet timestamp updated to " + this.lastTimestamp); 
          this.restartTimer();
          console.log("END ALERT")
        }
      });
    });
  }

  initTimer() {
    return this.http.get(this.timerStartService);
  }

  getRefreshTimer() {
    return this.http.get(this.timerRestartService);
  }

  getTwitterHandle() {
    return this.http.get(this.twitterHandleService);
  }

  getTwitterHandleValue = (): Observable<any> => {
    return new Observable(obs => {
    this.recordSubscription = this.interval.subscribe(int => {
      obs.next(this.twitterHandle);
      obs.complete();
    })
  });
  }

  restartTimer = () => {
    if(this.currentCountSeconds > this.longestTimerSeconds) {
      this.longestTimerSeconds = this.currentCountSeconds;
      this.longestTimerValue.seconds = this.setValueString(this.currentCountSeconds % 60);
      let totalSecondsForMinutes = 0;
      totalSecondsForMinutes = (Math.trunc(this.currentCountSeconds / 60) >= 60) ? (this.currentCountSeconds / 60) % 60 : this.currentCountSeconds / 60;
      this.longestTimerValue.mins = this.setValueString(Math.trunc(totalSecondsForMinutes));
      this.longestTimerValue.hours = this.setValueString(Math.trunc(this.currentCountSeconds / 3600));
    }
    
    this.currentCountSeconds = 0;
  }

  getRecordTimerValue = (): Observable<any> => {
    return new Observable(obs => {
      this.recordSubscription = this.interval.subscribe(int => {
        obs.next(this.longestTimerValue);
        obs.complete();
      })
    });
  }

  getTimerValue = (): Observable<any> => {
    return new Observable(obs => {
      if (this.intervalSubscription) {
        this.intervalSubscription.unsubscribe();
      }
      this.intervalSubscription = this.interval.subscribe(int => {
          ++this.currentCountSeconds;
          this.timerValue.seconds = this.setValueString(this.currentCountSeconds % 60);
          let totalSecondsForMinutes = 0;
          totalSecondsForMinutes = (Math.trunc(this.currentCountSeconds / 60) >= 60) ? (this.currentCountSeconds / 60) % 60 : this.currentCountSeconds / 60;
          this.timerValue.mins = this.setValueString(Math.trunc(totalSecondsForMinutes));
          this.timerValue.hours = this.setValueString(Math.trunc(this.currentCountSeconds / 3600));
          if(this.currentCountSeconds > this.longestTimerSeconds) {
            this.longestTimerValue.seconds = this.setValueString(this.currentCountSeconds % 60);
            let totalSecondsForMinutes = 0;
            totalSecondsForMinutes = (Math.trunc(this.currentCountSeconds / 60) >= 60) ? (this.currentCountSeconds / 60) % 60 : this.currentCountSeconds / 60;
            this.longestTimerValue.mins = this.setValueString(Math.trunc(totalSecondsForMinutes));
            this.longestTimerValue.hours = this.setValueString(Math.trunc(this.currentCountSeconds / 3600));
          }
          obs.next(this.timerValue);
          obs.complete();
      }, error => {
        obs.error(error);
        obs.complete();
      });
    });
  }
  
  setValueString = (val) => {
    let valString = val + "";
    return valString;
  }
}
