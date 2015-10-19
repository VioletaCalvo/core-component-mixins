/* Base class for defining custom elements. */

class ElementBase extends HTMLElement {

  // Handle a change to the attribute with the given name.
  attributeChangedCallback(name, oldValue, newValue) {
    this.log(`attribute ${name} changed to ${newValue}`);
    // If the attribute name corresponds to a property name, then set that
    // property.
    // TODO: This looks up the existence of the property each time. It would
    // be more efficient to, e.g., do a one-time computation of all properties
    // defined by the element (including base classes).
    // TODO: Ignore standard attribute name.
    // TODO: Map hyphenated foo-bar attribute names to camel case fooBar names.
    if (hasProperty(this, name)) {
      this[name] = newValue;
    }
  }

  createdCallback() {
    this.log("created");
    if (this.template) {
      createShadowRootWithTemplate(this, this.template);
    }
    marshallAttributesToProperties(this);
  }

  // static extend(properties) {
  //   return {};
  // }

  log(text) {
    console.log(`${this.localName}: ${text}`);
  }

}

function createShadowRootWithTemplate(element, template) {
  if (typeof template === 'string') {
    // Upgrade plain string to real template.
    template = createTemplateWithInnerHTML(template);
  }
  element.log("cloning template into shadow root");
  element.root = element.createShadowRoot();
  let clone = document.importNode(template.content, true);
  element.root.appendChild(clone);
}

function createTemplateWithInnerHTML(innerHTML) {
  let template = document.createElement('template');
  // REVIEW: Is there an easier way to do this?
  // We'd like to just set innerHTML on the template content, but since it's
  // a DocumentFragment, that doesn't work.
  let div = document.createElement('div');
  div.innerHTML = innerHTML;
  while (div.childNodes.length > 0) {
    template.content.appendChild(div.childNodes[0]);
  }
  return template;
}

function hasProperty(obj, name) {
  if (!obj) {
    return false;
  } else if (obj.hasOwnProperty(name)) {
    return true;
  } else {
    return hasProperty(Object.getPrototypeOf(obj), name);
  }
}

function marshallAttributesToProperties(element) {
  [].forEach.call(element.attributes, (attribute) => {
    element.attributeChangedCallback(attribute.name, undefined, attribute.value);
  });
}

document.registerElement('element-base', ElementBase);

export default ElementBase;
