import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonSelecterComponent } from './pokemon-selecter.component';

describe('PokemonSelecterComponent', () => {
  let component: PokemonSelecterComponent;
  let fixture: ComponentFixture<PokemonSelecterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonSelecterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonSelecterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
