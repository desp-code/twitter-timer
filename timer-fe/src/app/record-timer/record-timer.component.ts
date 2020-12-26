import { Component, Input, OnInit } from '@angular/core';
import { CountUpTimerService } from '../count-up-timer-service/count-up-timer.service';
import { countUpTimerConfigModel, timerTexts } from '../count-up-timer/count-up-timer.model';

@Component({
  selector: 'app-record-timer',
  templateUrl: './record-timer.component.html',
  styleUrls: ['./record-timer.component.css']
})
export class RecordTimerComponent implements OnInit {

  timerObj: any = {};

  private timerSubscription;
  timerConfig: countUpTimerConfigModel;
  timerTextConfig: timerTexts;
  
  constructor(private countUpTimerService: CountUpTimerService) { }
  
  @Input() startTime: String;
  @Input() countUpTimerConfig: countUpTimerConfigModel;

  ngOnInit() {
    this.getRecordTimerValue();
    this.countUpTimerService.restartTimer();

    this.timerConfig = new countUpTimerConfigModel();
    this.timerTextConfig = new timerTexts();
    this.timerConfig = this.countUpTimerConfig ? Object.assign(this.countUpTimerConfig) : null;
    this.timerTextConfig = this.countUpTimerConfig && this.countUpTimerConfig.timerTexts ? Object.assign(this.countUpTimerConfig.timerTexts) :  null;
  }

  getRecordTimerValue = () => {
    this.timerSubscription = this.countUpTimerService.getRecordTimerValue().subscribe(res => {
      this.timerObj = Object.assign(res);
    }, error => {
      console.log(error);
      console.log('Failed to get timer value');
    });
  }
}
