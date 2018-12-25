import { VrListComponent } from './vr-list.component';
import { VrService } from 'src/app/services/vr.service';
import { Subject } from 'rxjs';
import { Vr } from 'src/app/models/vr';

describe('VrListComponent', () => {
  const mockAvailableVrsObserver: Subject<Vr[]> = new Subject<Vr[]>();
  const mockMyVrsObserver: Subject<Vr[]> = new Subject<Vr[]>();
  const MockVrService: jest.Mock<VrService> = jest.fn<VrService>(() => ({
    available: jest.fn().mockImplementation(() => {
      return mockAvailableVrsObserver.asObservable();
    }),
    mine: jest.fn().mockImplementation(() => {
      return mockMyVrsObserver.asObservable();
    })
  }));
  let mockVrService: VrService;
  let component: VrListComponent;

  beforeEach(() => {
    mockVrService = new MockVrService();
    component = new VrListComponent(mockVrService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get available virtual runs when initialized', () => {
    component.ngOnInit();

    expect(mockVrService.available).toHaveBeenCalled();
  });

  it('should get my virtual runs when initialized', () => {
    component.ngOnInit();

    expect(mockVrService.mine).toHaveBeenCalled();
  });

  it('should set Virtual Run data to data return from service', () => {
    const mockVrData: Vr[] = [
      {
        _id: "aaaaa",
        link: "12345",
        title: "Test",
        period: ["AAA","BBB"],
        detail: "Example",
        created_by: 11111,
        created_datetime: "CCCC",
        engagements: []
      }
    ];

    component.ngOnInit();

    mockAvailableVrsObserver.next(mockVrData);

    expect(component.vrList).toEqual(mockVrData);
  });

  it('should set my Virtual Run data to data return from service', () => {
    const mockVrData: Vr[] = [
      {
        _id: "aaaaa",
        link: "12345",
        title: "Test",
        period: ["AAA","BBB"],
        detail: "Example",
        created_by: 11111,
        created_datetime: "CCCC",
        engagements: []
      }
    ];

    component.ngOnInit();

    mockMyVrsObserver.next(mockVrData);

    expect(component.myVrList).toEqual(mockVrData);
  });

});
