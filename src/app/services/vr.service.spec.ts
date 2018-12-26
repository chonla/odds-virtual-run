import { VrService } from './vr.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

describe('VrService', () => {
  let MockHttpClient: jest.Mock<HttpClient>;
  let httpClient: HttpClient;
  let service: VrService;

  beforeEach(() => {
    MockHttpClient = jest.fn<HttpClient>(() => ({
      get: jest.fn().mockImplementation(() => {
        return (new Subject<any>()).asObservable();
      }),
      post: jest.fn().mockImplementation(() => {
        return (new Subject<any>()).asObservable();
      }),
      patch: jest.fn().mockImplementation(() => {
        return (new Subject<any>()).asObservable();
      }),
      delete: jest.fn().mockImplementation(() => {
        return (new Subject<any>()).asObservable();
      })
    }));
    httpClient = new MockHttpClient();
    service = new VrService(httpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get version from api', () => {
    service.version();

    expect(httpClient.get).toHaveBeenCalledWith(`${environment.urls.baseUrl}/api/version`);
  });

  it('should get my profile from api', () => {
    service.me();

    expect(httpClient.get).toHaveBeenCalledWith(`${environment.urls.baseUrl}/api/me`);
  });

  it('should update virtual run from given data', () => {
    const expected = {
      _id: 'cccc',
      link: '',
      title: 'test',
      period: [new Date('2018-12-20T08:26:26.441Z').toISOString(), new Date('2018-12-25T08:26:26.441Z').toISOString()],
      detail: 'test 2',
      created_by: 0,
      created_datetime: '',
      engagements: []
    };

    service.update('aaa', {
      _id: 'cccc',
      title: 'test',
      period: ['2018-12-20T08:26:26.441Z', '2018-12-25T08:26:26.441Z'],
      detail: 'test 2'
    });

    expect(httpClient.patch).toHaveBeenCalledWith(`${environment.urls.baseUrl}/api/vr/aaa`, expected);
  });

  it('should create new virtual run from given data', () => {
    const expected = {
      _id: '',
      link: '',
      title: 'test',
      period: [new Date('2018-12-20T08:26:26.441Z').toISOString(), new Date('2018-12-25T08:26:26.441Z').toISOString()],
      detail: 'test 2',
      created_by: 0,
      created_datetime: '',
      engagements: []
    };

    service.create({
      _id: 'cccc',
      title: 'test',
      period: ['2018-12-20T08:26:26.441Z', '2018-12-25T08:26:26.441Z'],
      detail: 'test 2'
    });

    expect(httpClient.post).toHaveBeenCalledWith(`${environment.urls.baseUrl}/api/vr`, expected);
  });

  it('should get virtual run data from given link', () => {
    service.get('1234');

    expect(httpClient.get).toHaveBeenCalledWith(`${environment.urls.baseUrl}/api/vr/1234`);
  });

  it('should get available virtual runs', () => {
    service.available();

    expect(httpClient.get).toHaveBeenCalledWith(`${environment.urls.baseUrl}/api/vr`);
  });

  it('should get all virtual runs i have joined', () => {
    service.mine();

    expect(httpClient.get).toHaveBeenCalledWith(`${environment.urls.baseUrl}/api/me/vr`);
  });

  it('should join the virtual run by link with given distance', () => {
    service.join('1234', {
      'distance': '123.04'
    });

    expect(httpClient.post).toHaveBeenCalledWith(`${environment.urls.baseUrl}/api/join/1234`, {
      'distance': '123.04'
    });
  });

  it('should unregister me from virtual run by link', () => {
    service.leave('1234');

    expect(httpClient.post).toHaveBeenCalledWith(`${environment.urls.baseUrl}/api/leave/1234`, {});
  });

  it('should remove given virtual run by link', () => {
    service.remove('1234');

    expect(httpClient.delete).toHaveBeenCalledWith(`${environment.urls.baseUrl}/api/vr/1234`);
  });
});
