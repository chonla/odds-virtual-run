import { VrEditorComponent } from './vr-editor.component';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { Vr } from 'src/app/models/vr';
import { VrService } from 'src/app/services/vr.service';
import { Router, ActivatedRoute } from '@angular/router';

describe('VrEditorComponent', () => {
  let component: VrEditorComponent;

  describe('Loaded without ID', () => {
    const mockGetVrObserver: Subject<Vr> = new Subject<Vr>();
    const mockCreateVrObserver: Subject<Vr> = new Subject<Vr>();
    const MockRouter: jest.Mock<Router> = jest.fn<Router>(() => ({
      navigate: jest.fn()
    }));
    const MockActivatedRoute: jest.Mock<ActivatedRoute> = jest.fn<ActivatedRoute>(() => ({
      snapshot: {
        paramMap: {
          has: jest.fn().mockImplementation(() => {
            return false;
          })
        }
      }
    }));
    const MockVrService: jest.Mock<VrService> = jest.fn<VrService>(() => ({
      get: jest.fn().mockImplementation(() => {
        return mockGetVrObserver.asObservable();
      }),
      create: jest.fn().mockImplementation(() => {
        return mockCreateVrObserver.asObservable();
      })
    }));

    let formBuilder: FormBuilder;
    let mockVrService: VrService;
    let mockRouter: Router;
    let mockActivatedRoute : ActivatedRoute;

    beforeEach(() => {
      formBuilder = new FormBuilder();
      mockVrService = new MockVrService();
      mockRouter = new MockRouter();
      mockActivatedRoute = new MockActivatedRoute();
      component = new VrEditorComponent(formBuilder, mockVrService, mockRouter, mockActivatedRoute);
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should set edit mode to false when initialized', () => {
      expect(component.editMode).toBe(false);
    });

    it('should not load virtual run data if no link provided', () => {
      component.ngOnInit();

      expect(component.editMode).toBe(false);
      expect(component.vrID).toBeUndefined();
      expect(mockVrService.get).not.toHaveBeenCalled();
    });

    it('should create form when save and redirect to returned link', () => {
      component.ngOnInit();

      component.vrForm.setValue({
        '_id': '',
        'title': 'test',
        'period': [new Date('2018-12-20T08:26:26.441Z'), new Date('2018-12-25T08:26:26.441Z')],
        'detail': 'this is detail'
      });

      component.saveForm();

      mockCreateVrObserver.next({
        '_id': '1234',
        'title': 'test',
        'period': ['2018-12-20T08:26:26.441Z', '2018-12-25T08:26:26.441Z'],
        'detail': 'this is detail',
        'link': 'cccc',
        'created_by': 11223334,
        'created_datetime': '2018-12-19T08:26:26.441Z',
        'engagements': []
      });

      expect(mockVrService.create).toHaveBeenCalledWith({
        '_id': '',
        'title': 'test',
        'period': [new Date('2018-12-20T08:26:26.441Z'), new Date('2018-12-25T08:26:26.441Z')],
        'detail': 'this is detail'
      });
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/vr', 'cccc']);
    });
  });

  describe('Loaded with ID', () => {
    const mockGetVrObserver: Subject<Vr> = new Subject<Vr>();
    const mockUpdateVrObserver: Subject<Vr> = new Subject<Vr>();
    const MockRouter: jest.Mock<Router> = jest.fn<Router>(() => ({
      navigate: jest.fn()
    }));
    const MockActivatedRoute: jest.Mock<ActivatedRoute> = jest.fn<ActivatedRoute>(() => ({
      snapshot: {
        paramMap: {
          has: jest.fn().mockImplementation(() => {
            return true;
          }),
          get: jest.fn().mockImplementation(() => {
            return 'ok';
          })
        }
      }
    }));
    const MockVrService: jest.Mock<VrService> = jest.fn<VrService>(() => ({
      get: jest.fn().mockImplementation(() => {
        return mockGetVrObserver.asObservable();
      }),
      update: jest.fn().mockImplementation(() => {
        return mockUpdateVrObserver.asObservable();
      })
    }));

    let formBuilder: FormBuilder;
    let mockVrService: VrService;
    let mockRouter: Router;
    let mockActivatedRoute : ActivatedRoute;

    beforeEach(() => {
      formBuilder = new FormBuilder();
      mockVrService = new MockVrService();
      mockRouter = new MockRouter();
      mockActivatedRoute = new MockActivatedRoute();
      component = new VrEditorComponent(formBuilder, mockVrService, mockRouter, mockActivatedRoute);
    });

    it('should load virtual run data if link provided', () => {
      component.ngOnInit();

      expect(component.editMode).toBe(true);
      expect(component.vrID).toEqual('ok');
      expect(mockVrService.get).toHaveBeenCalledWith('ok');
    });

    it('should set virtual run form data from the returned data', () => {
      component.ngOnInit();

      mockGetVrObserver.next({
        '_id': '1234',
        'title': 'test',
        'period': ['2018-12-20T08:26:26.441Z', '2018-12-25T08:26:26.441Z'],
        'detail': 'this is detail',
        'link': 'aaaa',
        'created_by': 11223334,
        'created_datetime': '2018-12-19T08:26:26.441Z',
        'engagements': []
      });

      expect(component.vrForm.value).toEqual({
        '_id': '1234',
        'title': 'test',
        'period': [new Date('2018-12-20T08:26:26.441Z'), new Date('2018-12-25T08:26:26.441Z')],
        'detail': 'this is detail'
      });
      expect(component.vrForm.pristine).toBe(true);
    });

    it('should update form when save and redirect to returned link', () => {
      component.ngOnInit();

      mockGetVrObserver.next({
        '_id': '1234',
        'title': 'test',
        'period': ['2018-12-20T08:26:26.441Z', '2018-12-25T08:26:26.441Z'],
        'detail': 'this is detail',
        'link': 'aaaa',
        'created_by': 11223334,
        'created_datetime': '2018-12-19T08:26:26.441Z',
        'engagements': []
      });

      component.saveForm();

      mockUpdateVrObserver.next({
        '_id': '1234',
        'title': 'test',
        'period': ['2018-12-20T08:26:26.441Z', '2018-12-25T08:26:26.441Z'],
        'detail': 'this is detail',
        'link': 'cccc',
        'created_by': 11223334,
        'created_datetime': '2018-12-19T08:26:26.441Z',
        'engagements': []
      });

      expect(mockVrService.update).toHaveBeenCalledWith('ok', {
        '_id': '1234',
        'title': 'test',
        'period': [new Date('2018-12-20T08:26:26.441Z'), new Date('2018-12-25T08:26:26.441Z')],
        'detail': 'this is detail'
      });
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/vr', 'cccc']);
    });
  });
});
