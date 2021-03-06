/*
 * A sample custom element that uses the ElementBase base class, which defines a
 * set of common custom element mixins.
 */

import ElementBase from '../../src/ElementBase';


/* Define a custom element. */
export default class GreetElement extends ElementBase {

  // Define a "punctuation" attribute.
  // If a user of this component sets the "punctuation" attribute in markup,
  // the AttributeMarshalling mixin will cause this property to be set.
  get punctuation() {
    // Use this.$ reference created by the AutomaticNodeFinding mixin.
    return this.$.punctuation.textContent;
  }
  set punctuation(value) {
    this.$.punctuation.textContent = value;
  }

  // This template is picked up by the TemplateStamping mixin.
  get template() {
    return `
      Hello,
      <slot></slot><span id="punctuation">.</span>
    `;
  }

}


// Register the element. This could alternatively be handled by the importer.
document.registerElement('greet-element', GreetElement);
