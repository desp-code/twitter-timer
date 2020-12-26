import { Component, OnInit } from '@angular/core';
import { CountUpTimerService } from '../count-up-timer-service/count-up-timer.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  displayReady = false;
  private timerSubscription;
  twitterHandleObj: any = {};

  constructor(private countUpTimerService: CountUpTimerService) {
    
   }
  

  ngOnInit() {
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
