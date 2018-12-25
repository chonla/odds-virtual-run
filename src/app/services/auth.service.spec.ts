import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

describe('AuthService', () => {
  let service: AuthService;

  const MockHttpClient: jest.Mock<HttpClient>= jest.fn<HttpClient>(() => ({
    get: jest.fn().mockImplementation(() => {
      return (new Subject<any>()).asObservable();
    })
  }));
  const MockRouter: jest.Mock<Router> = jest.fn<Router>(() => ({
    navigate: jest.fn()
  }));
  const MockCookieService:jest.Mock<CookieService> = jest.fn<CookieService>(() => ({
    get: jest.fn(),
    check: jest.fn(),
    delete: jest.fn()
  }));
  let mockCookieService: CookieService;
  let mockRouter: Router;
  let mockHttpClient: HttpClient;

  beforeEach(() => {
    mockCookieService = new MockCookieService();
    mockHttpClient = new MockHttpClient();
    mockRouter = new MockRouter();
    service = new AuthService(mockCookieService, mockRouter, mockHttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return cookie token', () => {
    service.getToken();

    expect(mockCookieService.get).toHaveBeenCalledWith('token');
  });

  it('should return cookie me', () => {
    service.whoami();

    expect(mockCookieService.get).toHaveBeenCalledWith('me');
  });

  it('should save token to service', () => {
    service.saveToken('this_is_a_token');

    expect(mockHttpClient.get).toHaveBeenCalledWith(`${environment.urls.baseUrl}/gateway?code=this_is_a_token`);
  });

  it('should check login by return status of token present', () => {
    service.isLogin();

    expect(mockCookieService.check).toHaveBeenCalledWith('token');
  });

  it('should remove all cookies and redirect to welcome page', () => {
    service.signOut();

    expect(mockCookieService.delete).toHaveBeenCalledWith('token', '/');
    expect(mockCookieService.delete).toHaveBeenCalledWith('me', '/');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/welcome']);
  });

});
