import { Component , AfterViewInit , ViewChild } from '@angular/core';
import { interval } from 'rxjs';
import { CountUpTimerService } from '../count-up-timer-service/count-up-timer.service';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent  {
  displayReady = false;
  private timerSubscription;
  twitterHandleObj: any = {};
  twitterHandleUrl = '';

  constructor(private countUpTimerService: CountUpTimerService) {
    
   }
  

  ngOnInit() {
    this.getTwitterHandleValue();
  }

  getTwitterHandleValue = () => {
    this.timerSubscription = this.countUpTimerService.getTwitterHandleValue().subscribe(res => {
      this.twitterHandleUrl = "https://twitter.com/" +  res + "?ref_src=twsrc%5Etfw"
      this.twitterHandleObj = res;
        this.displayReady = true;
    }, error => {
      console.log(error);
      console.log('Failed to get twitter handle');
    });
  }

  
  

}
