import { VrDetailComponent } from './vr-detail.component';
import { VrService } from 'src/app/services/vr.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, ParamMap } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { Vr } from 'src/app/models/vr';

describe('VrDetailComponent', () => {
  let component: VrDetailComponent;
  const MockVrService: jest.Mock<VrService> = jest.fn<VrService>(() => ({
    get: jest.fn().mockReturnValue((new Subject<Vr>()).asObservable())
  }));
  const MockAuthService: jest.Mock<AuthService> = jest.fn<AuthService>(() => ({
    whoami: jest.fn().mockReturnValue('1111')
  }));
  const MockActivatedRoute: jest.Mock<ActivatedRoute> = jest.fn<ActivatedRoute>(() => ({
    snapshot: {
      paramMap: {
        get: jest.fn().mockReturnValue('1234abcd')
      }
    }
  }));
  const MockRouter: jest.Mock<Router> = jest.fn<Router>(() => ({

  }));

  let mockVrService: VrService;
  let mockAuthService: AuthService;
  let mockActivatedRoute: ActivatedRoute;
  let mockFormBuilder: FormBuilder;
  let mockRouter: Router;

  beforeEach(() => {
    mockVrService = new MockVrService();
    mockAuthService = new MockAuthService();
    mockActivatedRoute = new MockActivatedRoute();
    mockFormBuilder = new FormBuilder();
    mockRouter = new MockRouter();

    component = new VrDetailComponent(mockVrService, mockAuthService, mockActivatedRoute, mockFormBuilder, mockRouter);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load vr from param ID in url', () => {
    component.ngOnInit();

    expect(mockVrService.get).toHaveBeenCalledWith('1234abcd');
  });
});
