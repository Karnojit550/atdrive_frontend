import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleLoaderComponent } from './simple-loader.component';

describe('SimpleLoaderComponent', () => {
  let component: SimpleLoaderComponent;
  let fixture: ComponentFixture<SimpleLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
