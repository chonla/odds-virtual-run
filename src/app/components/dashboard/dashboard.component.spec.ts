import { DashboardComponent } from './dashboard.component';
import { VrService } from 'src/app/services/vr.service';
import { AuthService } from 'src/app/services/auth.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;

  const MockVrService: jest.Mock<VrService> = jest.fn<VrService​​>(() => ({

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

  it('should call signout', () => {
    component.signOut();

    expect(mockAuthService.signOut).toHaveBeenCalled();
  });
});
