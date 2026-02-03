import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestMatriculas } from './test-matriculas';

describe('TestMatriculas', () => {
  let component: TestMatriculas;
  let fixture: ComponentFixture<TestMatriculas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestMatriculas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestMatriculas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
