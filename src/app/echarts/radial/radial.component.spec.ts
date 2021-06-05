/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RadialComponent } from './radial.component';

describe('RadialComponent', () => {
  let component: RadialComponent;
  let fixture: ComponentFixture<RadialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
