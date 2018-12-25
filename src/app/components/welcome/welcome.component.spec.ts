import { WelcomeComponent } from './welcome.component';
import { environment } from 'src/environments/environment';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;

  beforeEach(() => {
    component = new WelcomeComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize sign-in url from environment setting', () => {
    expect(component.signInUrl).toEqual(environment.urls.signIn);
  });
});
