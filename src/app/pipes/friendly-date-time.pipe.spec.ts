import { FriendlyDateTimePipe } from './friendly-date-time.pipe';

describe('FriendlyDateTimePipe', () => {
  it('create an instance', () => {
    const pipe = new FriendlyDateTimePipe();
    expect(pipe).toBeTruthy();
  });
});
