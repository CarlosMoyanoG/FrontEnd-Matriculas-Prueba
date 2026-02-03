import { TestBed } from '@angular/core/testing';

import { ServicioMatriculas } from './servicio-matriculas';

describe('ServicioMatriculas', () => {
  let service: ServicioMatriculas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioMatriculas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
