/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LittersComponent } from './litters.component';

describe('LittersComponent', () => {
  let component: LittersComponent;
  let fixture: ComponentFixture<LittersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LittersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LittersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
