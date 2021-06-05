/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OffspringsComponent } from './offsprings.component';

describe('OffspringsComponent', () => {
  let component: OffspringsComponent;
  let fixture: ComponentFixture<OffspringsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffspringsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffspringsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
