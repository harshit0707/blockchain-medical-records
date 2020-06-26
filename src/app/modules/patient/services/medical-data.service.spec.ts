import { TestBed } from '@angular/core/testing';

import { MedicalDataService } from './medical-data.service';

describe('MedicalDataService', () => {
  let service: MedicalDataService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(MedicalDataService);
  }
  );

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getMyData() should work', () => {
    service.getMyData();
  });

  it('#getApprovalQueueData() should work', () => {
    service.getApprovalQueueData();
  });

  it('#approveData() should work', () => {
    service.approveData(0);
  });

  it('#denyData() should work', () => {
    service.denyData(0);
  });

  it('#getPermissionsQueueData() should work', () => {
    service.getPermissionsQueueData();
  });

  it('#grantPermission() should work', () => {
    service.grantPermission(0, 10);
  });

  it('#denyPermission() should work', () => {
    service.denyPermission(0);
  });
});
