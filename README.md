This prototype implements common web component features as mixins. It
explores the idea that mixins can achieve the same results as a monolithic
framework, while permitting more flexibility and a pay-as-you-go approach to
complexity and performance.

Design goals:

1. Demonstrate that it's possible to create web components entirely from mixins.
2. Have each web component mixins focus on solving a single, common task. They
   should be well-factored. They should be able to be used on their own, or in
   combination.
3. Introduce as few new concepts as possible. Any developer who understands the
   DOM API should find this architecture appealing, without having to learn many
   proprietary concepts (beyond mixins, see below).
4. Focus on native browser support for ES6 and web components. The architecture
   should be useful in a production application today, but should also feel
   correct in a future world in which native ES6 and web components are
   everywhere.

# Installation

    > npm install
    > grunt build

# Composing classes with mixins

A foundation of this prototype is that web components can be expressed as
compositions of base classes and mixins. This prototype defines a mixin as a
function that takes a base class, and returns a subclass defining the new
features.

    let MyMixin = (base) => class MyMixin extends base {
      // Mixin defines properties and methods here.
    };

Such mixins should generally ensure that base class properties and methods are
not broken by the mixin. In particular, if a mixin wants to add a new property
or method, it should take care to also invoke the base class' property or
method. To do that consistently, mixin functions should follow standardized
[Composition Rules](Composition Rules.md). See that document if you are
interested in creating your own mixins.

A virtue of a functional mixin is that you do not need to use any library to
apply it. This increases the chance that mixins can be shared across projects.
If a common extension/mixin solution can be agreed upon, frameworks sharing that
solution gain a certain degree of code sharing, interoperability, and can share
conceptual materials. This reduces the learning curve for dealing with any one
framework.

Frameworks can still make their own decisions about which features they want to
offer by virtue of which mixins they incorporate into their base classes.


# Applying multiple mixins

Since web components often include many mixins, a helper mixin called Composable
provides syntactic sugar that allows multiple mixins to be applied in a single
call. Instead of defining an element like:

    class MyElement extends Mixin1(Mixin2(Mixin3(Mixin4(HTMLElement)))) {
      ...
    }

You can write:

    class MyElement extends Composable(HTMLElement).compose(
      Mixin1,
      Mixin2,
      Mixin3,
      Mixin4
    ) {
      ...
    }


# Web component mixins

The /src folder includes an initial set of mixins for very common web component
features:

1. Template stamping into a Shadow DOM tree.
2. Polymer-style [automatic node finding](https://www.polymer-project.org/1.0/docs/devguide/local-dom.html#node-finding)
   for convenient access to elements within the shadow tree.
3. Marshalling attributes to properties. This includes mapping hyphenated
   `foo-bar` attribute references to camelCase `fooBar` property names.


# Element base classes

A sample base class, [ElementBase](src/ElementBase.js), shows one way these
mixins might be combined to create a custom element base class. This base class
is not special in any way. It is essentially just a pre-packaged application
of the mixins described above:

    class ElementBase extends Composable(HTMLElement).compose(
      TemplateStamping,
      AutomaticNodeFinding,
      AttributeMarshalling
    ) {
      ...
    }

Another example, [X-Tag](demos/X-Tag), shows a hypothetical application of this
strategy to the X-Tag framework. The sample base class in that example uses a
different set of mixins to demonstrate that that is possible.

A [Hello, world](demos/Hello%20World) demo shows this sample ElementBase class being used to
create a simple [greet-element](demos/Hello%20World/GreetElement.js) component. This can be
viewed as a [live demo](http://componentkitchen.github.io/core-component-mixins/demos/Hello%20World).

More demos are available in the /demos folder.


# Separating class construction from custom element registration

This codebase generally assumes that class creation (e.g., with ES6 `class`) is
handled separately from custom element registration with
`document.registerElement()`. That said, a framework can still decide to offer
a single entry point that both defines a class and registers it. This is shown
in the `xtag.register()` function of the [X-Tag](demos/X-Tag) example.
