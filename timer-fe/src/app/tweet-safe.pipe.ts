import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'tweetSafe'
})
export class TweetSafePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }
  transform(html): any {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
