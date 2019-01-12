import { ReceptionistGuard } from './receptionist.guard';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('ReceptionistGuard', () => {
  let guard: ReceptionistGuard;

  const MockAuthServiceNoToken: jest.Mock<AuthService> = jest.fn<AuthService​​>(() => ({
    getToken: jest.fn().mockReturnValue('')
  }));
  const MockAuthServiceWithToken: jest.Mock<AuthService> = jest.fn<AuthService​​>(() => ({
    getToken: jest.fn().mockReturnValue('test')
  }));
  const MockRouter: jest.Mock<Router> = jest.fn<Router>(() => ({
    navigate: jest.fn()
  }));
  const MockActivatedRouteSnapshot: jest.Mock<ActivatedRouteSnapshot> = jest.fn<ActivatedRouteSnapshot>(() => ({}));
  const MockRouterStateSnapshot: jest.Mock<RouterStateSnapshot> = jest.fn<RouterStateSnapshot>(() => ({}));
  let mockAuthService: AuthService;
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let mockRouterStateSnapshot: RouterStateSnapshot;

  beforeEach(() => {
    mockRouter = new MockRouter();
    mockActivatedRouteSnapshot = new MockActivatedRouteSnapshot();
    mockRouterStateSnapshot = new MockRouterStateSnapshot();

  });

  it('should redirect to dashboard if token exists and return false', () => {
    mockAuthService = new MockAuthServiceWithToken();

    guard = new ReceptionistGuard(mockAuthService, mockRouter);

    const result = guard.canActivate(mockActivatedRouteSnapshot, mockRouterStateSnapshot);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/vr']);
    expect(result).toBe(false);
  })

  it('should allow user to access the page', () => {
    mockAuthService = new MockAuthServiceNoToken();

    guard = new ReceptionistGuard(mockAuthService, mockRouter);

    const result = guard.canActivate(mockActivatedRouteSnapshot, mockRouterStateSnapshot);

    expect(mockRouter.navigate).not.toHaveBeenCalled();
    expect(result).toBe(true);
  })

});
