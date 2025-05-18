import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarExameComponent } from './listar-exame.component';

describe('ListarExameComponent', () => {
  let component: ListarExameComponent;
  let fixture: ComponentFixture<ListarExameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarExameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarExameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
