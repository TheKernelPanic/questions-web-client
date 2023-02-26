import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MimetypeSelectorComponent } from './mimetype-selector.component';

describe('MimetypeSelectorComponent', () => {
  let component: MimetypeSelectorComponent;
  let fixture: ComponentFixture<MimetypeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MimetypeSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MimetypeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
