import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CountUpTimerService } from '../count-up-timer-service/count-up-timer.service';

@Component({
  selector: 'app-record-banner',
  templateUrl: './record-banner.component.html',
  styleUrls: ['./record-banner.component.css']
})
export class RecordBannerComponent implements OnInit {
  myDate = '';
  displayReady = false;
  private timerSubscription;
  twitterHandleObj: any = {};
  constructor(private countUpTimerService: CountUpTimerService) { 
    this.myDate = formatDate(new Date(), 'yyyy/MM/dd', 'en');

  }

  ngOnInit(): void {
    this.getTwitterHandleValue();
  }

  getTwitterHandleValue = () => {
    this.timerSubscription = this.countUpTimerService.getTwitterHandleValue().subscribe(res => {
      this.twitterHandleObj = res;
        this.displayReady = true;
    }, error => {
      console.log(error);
      console.log('Failed to get twitter handle');
    });
  }

}
