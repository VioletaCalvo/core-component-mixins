import ElementBase from "ElementBase.js";

/* Define a custom element. */
class GreetElement extends ElementBase {

  createdCallback() {
    super.createdCallback();
    this.log("GreetElement created");
  }

  get punctuation() {
    return this.root.querySelector('#punctuation').textContent;
  }
  set punctuation(value) {
    this.root.querySelector('#punctuation').textContent = value;
  }

  get template() {
    // return document.querySelector('#greet-element');
    return `
      Hello,
      <content></content><span id="punctuation">.</span>
    `;
  }

}

document.registerElement('greet-element', GreetElement);

export default GreetElement;
