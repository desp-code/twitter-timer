import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { CountUpTimerComponent } from './count-up-timer/count-up-timer.component';
import { CountUpTimerService } from './count-up-timer-service/count-up-timer.service';
import { TweetIdService } from './tweet-service/tweet-service.service';
import { BannerComponent } from './banner/banner.component';
import { TweetComponent } from './tweet/tweet.component';
import { TweetSafePipe } from './tweet-safe.pipe';
import { NgxTweetModule } from "ngx-tweet";
import { RecordTimerComponent } from './record-timer/record-timer.component';
import { RecordBannerComponent } from './record-banner/record-banner.component';

@NgModule({
  declarations: [
    AppComponent,
    CountUpTimerComponent,
    BannerComponent,
    TweetComponent,
    TweetSafePipe,
    RecordTimerComponent,
    RecordBannerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxTweetModule
  ],
  providers: [CountUpTimerService, TweetIdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
