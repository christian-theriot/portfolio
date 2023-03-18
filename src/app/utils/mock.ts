import { Component } from '@angular/core';

export function MockComponent({ selector }: { selector?: string }) {
  @Component({ selector, template: '<p>test</p>' })
  class MockedComponent {}

  return MockedComponent;
}
