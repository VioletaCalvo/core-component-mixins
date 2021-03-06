import { assert } from 'chai';
import * as testElements from "./testElements";

describe("ElementBase", () => {

  it("component stamps string template into root", () => {
    let element = document.createElement('element-with-string-template');
    assert(element.shadowRoot);
    assert.equal(element.shadowRoot.textContent.trim(), "Hello");
  });

  it("component stamps real template into root", () => {
    let element = document.createElement('element-with-real-template');
    assert(element.shadowRoot);
    assert.equal(element.shadowRoot.textContent.trim(), "Hello");
  });

  it("can create component class with ES5-compatible .compose()", () => {
    let element = document.createElement('es5-class');
    assert.equal(element.customProperty, 'property');
    assert.equal(element.method(), 'method');
    assert.equal(element.value, 'value');
  });

  it("hyphenated attribute marshalled to corresponding camelCase property", () => {
    let element = document.createElement('element-with-camel-case-property');
    assert.isUndefined(element.customProperty);
    element.setAttribute('custom-property', "Hello");
    assert.equal(element.customProperty, "Hello");
  });

  it("extension can define createdCallback", () => {
    let element = document.createElement('element-with-created-mixin');
    assert(element.mixinCallbackInvoked);
    assert.equal(element.shadowRoot.textContent.trim(), "Hello");
  });

});
