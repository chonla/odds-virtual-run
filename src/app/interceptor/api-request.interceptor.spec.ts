import { ApiRequestInterceptor } from './api-request.interceptor';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

describe('ApiRequestInterceptor', () => {
  let interceptor: ApiRequestInterceptor;
  const MockRouter: jest.Mock<Router> = jest.fn<Router>(() => ({
    navigate: jest.fn()
  }));
  const MockAuthService:jest.Mock<AuthService> = jest.fn<AuthService>(() => ({
    getToken: jest.fn().mockReturnValue('hello')
  }));
  let mockAuthService: AuthService;
  let mockRouter: Router;

  beforeEach(() => {
    mockAuthService = new MockAuthService();
    mockRouter = new MockRouter();
    interceptor = new ApiRequestInterceptor(mockAuthService, mockRouter);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should not add authorization header if url is not to baseurl', () => {
    const MockNext: jest.Mock<HttpHandler> = jest.fn<HttpHandler>(() => ({
      handle: jest.fn().mockReturnValue((new Subject<any>()).asObservable())
    }));
    const MockRequest: jest.Mock<HttpRequest<any>> = jest.fn<HttpRequest<any>>(() => ({
      url: 'http://someurl/api/request'
    }));
    const next: HttpHandler = new MockNext();
    const req: HttpRequest<any> = new MockRequest();

    interceptor.intercept(req, next);
    expect(next.handle).toHaveBeenCalledWith(req);
  });

  it('should add authorization header if url is to baseurl', () => {
    let authorizationHeaderFound: boolean = false;
    let authorizationHeaderValue: string = '';
    const MockNext: jest.Mock<HttpHandler> = jest.fn<HttpHandler>(() => ({
      handle: jest.fn().mockImplementation((req: HttpRequest<any>) => {
        authorizationHeaderFound = req.headers.has('Authorization');
        authorizationHeaderValue = req.headers.get('Authorization');
        return (new Subject<any>()).asObservable();
      })
    }));
    const MockRequest: jest.Mock<HttpRequest<any>> = jest.fn<HttpRequest<any>>(() => ({
      url: `${environment.urls.baseUrl}/api/some/test`,
      clone: jest.fn().mockImplementation(o => {
        const newRequest = Object.assign(o, this);
        return newRequest;
      }),
      headers: new HttpHeaders()
    }));
    const next: HttpHandler = new MockNext();
    const req: HttpRequest<any> = new MockRequest();

    interceptor.intercept(req, next);
    expect(authorizationHeaderFound).toBe(true);
    expect(authorizationHeaderValue).toEqual('Bearer hello');
  });

});
