import { Component, Input, OnInit } from '@angular/core';
import { CountUpTimerService } from '../count-up-timer-service/count-up-timer.service';
import { countUpTimerConfigModel, timerTexts } from './count-up-timer.model';

@Component({
  selector: 'app-count-up-timer',
  templateUrl: './count-up-timer.component.html',
  styleUrls: ['./count-up-timer.component.css']
})
export class CountUpTimerComponent implements OnInit {

  timerObj: any = {};

  private timerSubscription;
  timerConfig: countUpTimerConfigModel;
  timerTextConfig: timerTexts;
  
  constructor(private countUpTimerService: CountUpTimerService) { 
  }
  
  @Input() startTime: String;
  @Input() countUpTimerConfig: countUpTimerConfigModel;

  ngOnInit() {
    this.getTimerValue();
    this.timerConfig = new countUpTimerConfigModel();
    this.timerTextConfig = new timerTexts();
    this.timerConfig = this.countUpTimerConfig ? Object.assign(this.countUpTimerConfig) : null;
    this.timerTextConfig = this.countUpTimerConfig && this.countUpTimerConfig.timerTexts ? Object.assign(this.countUpTimerConfig.timerTexts) :  null;
  }

  getTimerValue = () => {
    this.timerSubscription = this.countUpTimerService.getTimerValue().subscribe(res => {
      this.timerObj = Object.assign(res);
    }, error => {
      console.log(error);
      console.log('Failed to get timer value');
    });
  }


}
