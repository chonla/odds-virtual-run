import { DashboardComponent } from './dashboard.component';
import { VrService } from 'src/app/services/vr.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subject } from 'rxjs';
import { Athlete } from 'src/app/models/athlete';
import { Version } from 'src/app/models/version';
import { version } from 'src/environments/version';

describe('DashboardComponent', () => {
  let component: DashboardComponent;

  const mockVersion: Subject<Version> = new Subject<Version>();

  const MockVrService: jest.Mock<VrService> = jest.fn<VrService>(() => ({
    me: jest.fn().mockReturnValue((new Subject<Athlete>()).asObservable()),
    version: jest.fn().mockReturnValue(mockVersion.asObservable())
  }));
  const MockAuthService: jest.Mock<AuthService> = jest.fn<AuthService>(() => ({
    signOut: jest.fn()
  }));
  let mockVrService: VrService;
  let mockAuthService: AuthService;

  beforeEach(() => {
    mockVrService = new MockVrService();
    mockAuthService = new MockAuthService();
    component = new DashboardComponent(mockVrService, mockAuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get my stats and load app version when initialized', () => {
    component.ngOnInit();

    expect(mockVrService.me).toHaveBeenCalled();
    expect(mockVrService.version).toHaveBeenCalled();
  });

  it('should create buildNum from remote version and local version', () => {
    component.ngOnInit();

    mockVersion.next({version:'test'});

    expect(component.buildNum).toEqual(`${version.version}-test`);
  });

  it('should call signout', () => {
    component.signOut();

    expect(mockAuthService.signOut).toHaveBeenCalled();
  });
});
