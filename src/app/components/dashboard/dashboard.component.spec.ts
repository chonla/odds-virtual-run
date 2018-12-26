import { DashboardComponent } from './dashboard.component';
import { VrService } from 'src/app/services/vr.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subject } from 'rxjs';
import { Athlete } from 'src/app/models/athlete';
import { Version } from '@angular/core';

describe('DashboardComponent', () => {
  let component: DashboardComponent;

  const MockVrService: jest.Mock<VrService> = jest.fn<VrService​​>(() => ({
    me: jest.fn().mockReturnValue((new Subject<Athlete​​>()).asObservable()),
    version: jest.fn().mockReturnValue((new Subject<Version>()).asObservable())
  }));
  const MockAuthService: jest.Mock<AuthService> = jest.fn<AuthService​​>(() => ({
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

  it('should call signout', () => {
    component.signOut();

    expect(mockAuthService.signOut).toHaveBeenCalled();
  });
});
