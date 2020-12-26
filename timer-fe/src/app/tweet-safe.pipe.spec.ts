import { TweetSafePipe } from './tweet-safe.pipe';

describe('TweetSafePipe', () => {
  it('create an instance', () => {
    const pipe = new TweetSafePipe();
    expect(pipe).toBeTruthy();
  });
});
