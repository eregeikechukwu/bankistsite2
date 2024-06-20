'use strict';

// I wanna start by saying that many things that I'm gonna show you in this section, you could implement using external libraries that will achieve the exact same thing, sometimes with a moch more complex implementation and more features.
// However, it's really important that you learn how to do these basic DOM manipulations yourself, because these are excellent use cases for DOM manipulation. Also, it's good to do stuff on your own, instead of including twenty libraries into your project that will slow down your website or app

const btnsOpenModel = document.querySelectorAll('.btn--open-modal');
const btnCloseModal = document.querySelector('.btn--close-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const nav = document.querySelector('.nav');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const navContent = document.querySelectorAll('.menu__list__item');

const btnapp = document.querySelector('.btn--app');

//////////////////////////////////////////////////////////////////
// LEC 2) PROJECT: "Bankist" Website

// [SHOW PROJECT]
// This code comes from the modal window we already built earlier. Let's just do 2 quick modifications here!

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////////////////////////////////////////////////
// LEC 4) How the DOM Really Works: Practice

/* 
// We can use the console to check out and confirm all the things that we learned in the last video

// 1.
// First, we can check the different types of nodes...
// querySelector returns an element. But all elements are also nodes, and nodes have the childNodes property, which as the name says, returns a nodeList of all child nodes
console.log(document.querySelector('.nav').childNodes);
// [Check __proto__ in console, go all the way up the chain!]

console.log(document.querySelector('h1').childNodes);

// This is just a TEXT node, not even a real HTML element, and we can STILL get the textContent property on in, becuase this inherited from the node
console.log(document.querySelector('h1').childNodes[0].textContent);
// Now, this is not useful, I just want to show you that this is really how things work

// 2.
// We can also confirm that the h1 elemen is, in fact, an HTMLHeadingElement, all the same for all other parent node types
console.log(document.querySelector('h1') instanceof HTMLHeadingElement);
console.log(document.querySelector('h1') instanceof Element);
console.log(document.querySelector('h1') instanceof Node);
console.log(document.querySelector('h1') instanceof EventTarget);

// And having in mind the diagram from the last video, the h1 element is of course NOT a child type of window and document
console.log(document.querySelector('h1') instanceof Window);
console.log(document.querySelector('h1') instanceof Document);
 */

//////////////////////////////////////////////////////////////////
// LEC 5) Selecting, Creating and Deleting Elements

/* 
// This lecture will serve like a quick reference for you in the future, because these methods are way more difficult to find and understand from the decoumentation like for example array methods

// 1) Selecting elements

// 0.
// Let's start at the very top of any HTML document. If we want to select the entire document as an ELEMENT, we need to do
console.log(document.documentElement);
// Just document is not enouh, because that's not a REAL DOM element. For example, if we want to apply CSS styles to the entire html element, we need documentElement, not just document

// We can also easily select the document's head and body elements
console.log(document.head);
console.log(document.body);

// 1.
// So, for theses special elements, we don't even need a selector. To select ANY other element on the page, we have of course querySelector and querySelectorAll, that we are already familiar with:
document.querySelector('.header');
// This returns the first matched elements

const allSections = document.querySelectorAll('.section');
console.log(allSections);
// This returns a nodelist

// We have been using these all the time, and they are in fcat the most used ways of selecting elements.
// Now, these are available not only on document, but ALSO on all elements! We use this when we want to select child elements, which is very useful for event delegation

// 2.
// Then there is also getElementById. This one is ONLY available on document.
document.getElementById('section--1'); // No # necessary!

// 3.
// Then we also have getElementsBy methods. With an S!
// First, we can get elements by element name basically, like all section or all button elements
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);
// Now, this does return a so-called HTML collection, which is similar to a NodeList, with the difference that the HTML collection is LIVE, which means that if the DOM changes, the collection reflects the changes immediatly. This does NOT happen in a NodeList. Also, HTML collections do not have the forEach method, but they are iterable. Besides that, the HTML collection is also similar to an array, for example we can access elements using the [] notation

// [Delete button, then call allButtons in console. Now it only has 11 elements! Do the same with sections, and show that the NodeList does not change. This is relevant because we can of course delete elements programatically as well]

// 4.
// Second, we can elements by their class name.
console.log(document.getElementsByClassName('btn'));
// This one also returns a live HTML collection. Both these methods can also be called on elements, not just on the document!

// Both of these are easily replicable using querySelectorAll, which is why we use it most the time in these situations. The only reason to use getElementsByTagName or getElementsByClassName is if we REALLY need a LIVE HTML collection for some reason, but personally I never needed that.

//////////////////////////////////////////////////////////////////
// 2) Creating, inserting and deleting elements

// 1.
const message = document.createElement('div');
// Remember, this is how we add one or more classes
message.classList.add('cookie-message');
// We can also set other attributes like this, but more about HTML attribues later

// This is if we only want text inside the element
// message.textContent =
//   'We use cookies for improved functionality and analytics.';

// But we can also insert HTML. For that, we need to use innerHTML, available on all elements
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// Of course, both are also readbale, so we can just read text or innerHTML without modifying it

// 2.
// Anyway, this inserts element as FIRST CHILD of selected PARENT element (header in this case)
// const header = document.querySelector('.header')
// header.prepend(message);

// We could also attach to the body like this
// document.body.prepend(message);

// Inserts element as LAST CHILD
// header.append(message);
// [REMOVE AT END LEc 6]

// 3.
// Now, as we can see, the element was only inserted ONCE! That's because this is now a LIVE element living in the DOM, and so it can't be at multiple places at the same time. Just like a person cannot be at 2 places simultaneously.
// But what happened here? Why is the element now APPENDED and not PREPENDED? Well, in this instruction [highlight], the message element was, in fact, prepended to the header. But then, the prepend method MOVED the object to the end of the header.
// So, what this means is that we can use the prepend and append methods not only to INSERT elements, but also to MOVE them. Again, because a DOM element is unique, it can only exist at one place at the time.

// But what if we actually WANTED to insert multiple copies of the same elemnt? Well, in that case, we would need to CLONE the element first
// header.prepend(message.cloneNode(true));
// true makes it so that all children are also copied

// 4.
// There are two more methods for inserting elements, similar to prepend and append
// Inserts element BEFORE target (check in inspector)
// header.before(message);

// Inserts element AFTER target (check in inspector)
// header.after(message);
// These two also MOVE DOM elements

// 5.
// Deleting elements
// setTimeout(() => message.remove(), 5000);

// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function(e) {
//     message.remove();
//   });
// [REMOVE AT END LEc 6]

// the remove method is availabe on all nodes, and it's relatively recent. Before, we could only remove CHILD elements, and so we used to have to select the parent element, and then remove the child from there
// document.querySelector('.btn--close-cookie').addEventListener('click', function(e) {
//   message.parentElement.removeChild(message);
// });
 */

//////////////////////////////////////////////////////////////////
/* 
// Now, instead of creating the element using createElement, and then inserting it, we could simply create an HTML string and insert it using the insertAdjacentHTML method. We actually did this before in the bankist app to create movements!
document
  .querySelector('.header')
  .insertAdjacentHTML(
    'beforeend',
    '<div class="cookie-message">(OTHER) We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">OK! Close message</button></div>',
  );
// beforeend is equivalent to the append method. afterbegin would be like the prepend method, so it would still be a children.
// Then there is also beforebegin, which inserts the element just BEFORE the selected element, so as a sibling. Finally, afterend inserts right AFTER the selected element.

// I personally prefer this method, because it's just faster to write and doesn't involve multiple methods and steps

// Now, this time, we do NOT have the message element stored in memory, so we will have to select it here! That's clearly a disadvantage, so consider this when creating new elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function(e) {
    console.log(e.target);
    document.querySelector('.cookie-message').remove();
  });
 */

//////////////////////////////////////////////////////////////////
// LEC 6) Styles, Attributes and Classes

/* 
// We talked about some of this before, and will use this stuff later in practicem but once again, I want this lecture to be a nice reference where you can find all the relevant tools in the future, all in one place
// That's why I only touch on each future very briefly, with a very simple example, just so that you KNOW they exists. Some of them we will use later, but it's impossible to create examples for ALL these functions and methods

//////////////////////////////////////////////////////////////////
// 1) Styles
// 1.
// Next, let's talk about CSS styles. We already set CSS styles before, but there is some more things to learn.
// So, this is how we SET a style. All CSS property names become camelCase names.
message.style.backgroundColor = '#37383d';
// Here we use the element we just created before, but of course we could also select an element and set the style there

// We need to write the CSS value exactly as we would do in CSS, so that means we always need to include units
document.querySelector('.nav__logo').style.height = '45px';

// 2.
// Now, we could think that the same way we can set styles, we could also GET styles, right?
console.log(message.style.height);
// Well, it doesn't work that way! That's because using the style property we can ONLY get inline styles, like the ones that were SET using the style property
// So, this WILL work:
console.log(message.style.backgroundColor);

// Now, we still CAN get styles, but we need to use the getComputedStyle function. This will return the COMPUTED styles, so styles that were CALCULATED based on the styles we defined in our CSS code. For example, in our styles we might specify a length in rem or %, but the browser will eventually convert that to pixels, and so the computed length will always be in pixels.
// So, we do NOT get the styles as we defined them in our stylesheet, but the styles already converted to their final values. This includes values that were INHERITED from other styles. Basically, this will return a value for EVERY SINGLE CSS property there is, even if we didn't define it
// console.log(getComputedStyle(message));
console.log(getComputedStyle(message).height);
// So the getComputedStyle expects an element

// 3.
// So, let's say taht we wanted to add 40 pixels to the message's height
// Now the parseInt function comes in very handy!
const height = Number.parseInt(getComputedStyle(message).height);
console.log(height);
// message.style.height = height + 40 + 'px';
// [CHECK IN CONSOLE]

// 4.
// Now, there is actually another way of setting styles
message.style.setProperty('height', height + 40 + 'px');
// Here, property names are the USUAL names, without camelCase!
message.style.setProperty('font-size', '17px');
// You might think that you can use getProperty to actually get CSS properties, instead of using getComputedStyle, but that's not how it works.And if you want, you can go down the rabbit hole and searching getProperty on MDN, and you will spend half an hour finding out about really interesting stuff. But I will not go into this here

// Finally, we can use this to set CSS cutom properties, which we usually call CSS variables. And the idea of CSS variables is very similar to the idea of variables in CSS, which is that we can change a value in many places all over our CSS file, by simply changing the value of one CSS variable. And we cam change CSS variables using the setProperty method
// Usually CSS variables are defined in the root element [CHECK CSS]. So that's where we should set them now. And that root element is, remember, document.documentElement
// document.documentElement.style.setProperty('--color-primary', 'orangered');
// [AT END]

//////////////////////////////////////////////////////////////////
// 2) Attributes

// 1.
const logo = document.querySelector('.nav__logo');
// DOM properties. These are automatically created on the DOM object for STANDARD HTML attributes for a certain element. For example, and image is supposed to have an alt attribute and a src attribute, and therefore, if these are populated in the HTML, properties are created in the element object
console.log(logo.alt);
console.log(logo.src);
console.log(logo.id);
console.log(logo.className); // className is an exception, it's an attribute with a different name, for historical reasons

// The same happens for links. The target and href attributes are expected for a elements, so here there are
const link = document.querySelector('.twitter-link');
console.log(link.target);
console.log(link.href);

// And we can also SET these attributes using these element properties
logo.alt = 'Beautiful minimalist logo design';
// [CHECK INSPECTOR]

// 2.
// Now, if we define a NON-standard attribute, it will NOT get its own property on the element [add attribute in HTML now]
console.log(logo.instructor);
// So this does NOT exists. Again, because the DOM does not expect an attribute with this name for this element. But, we can still get this attribute
console.log(logo.getAttribute('instructor'));

// Or we can SET attributes
logo.setAttribute('course', 'javascript');
// [CHECK INSPECTOR]

// Or we can check if an attribute exists
// if (logo.hasAttribute('instructor')) alert('YEAH');

// 3.
// Now, you might have noticed that the SRC attribute in the image is DIFFERENT than what is written in the HTML, right? Well, that's because the src property in the DOM element will always be an ABSOLUTE URL.
// If you want to get EXACTLY what is written in the HTML, you can still use getAttribute for the src property:
console.log(logo.getAttribute('src'));

// And the same is true for the href property on links! In this case, the URL was ALREADY absolute, so the attribute is the same, but it might not always be like that
console.log(link.getAttribute('href'));

// So keep this important distinction in mind. Any property involving URLs, the URL that's in the DOM element property will always be an ABSOLUTE URL. If you want the one that's literally written in the HTNL, use getAttribute

// 4.
// Finally, there is a special type of attributes that we can define, and that's data attributes. Data attributes are a special kind of attrubutes that start with the word data, and then anything we want. Let's add one to the HTML
// Then, this attribute will become available in a special object called dataset
console.log(logo.dataset.author);
// When there are hyphens, the property names becomes camelCase, just like CSS property names
console.log(logo.dataset.logoColor);

// We use data attributes when we need STORE DATA in the user interface, so in the HTML code. We will see how useful they can be throughout the rest of the course

//////////////////////////////////////////////////////////////////
// 3) Classes
// Finally, let's talk about classes, and at this point, we actually already know all there is about classes, so let's just quickly summarize

// So, we learned a minute ago that we can get and set an elemen't class using the className element property
// document.querySelector('.header__img').className = 'btn';

// But this will override the existing class, and allows only ONE class on an element.
// So if we want to ADD one or more classes to the existing class or classes, we use the element's classList, as we have done many times already
// document.querySelector('.header__img').classList.add('btn', 'modal');

// Besides adding, we can also remove and toggle classes, and check if a class exists on an element.
console.log(document.querySelector('.header__img').classList.contains('modal'));
// Remember that the method is called CONTAINS, not INCLUDES like on arrays. I've ran into that error in the past, so I'm letting you know
 */
document.querySelector('.nav__logo').style.height = '45px';

//////////////////////////////////////////////////////////////////
// LEC 7)	Implementing Smooth Scrolling

// Put these at TOP
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

// 0.
// We will implement scrolling in two different ways.

btnScrollTo.addEventListener('click', function (e) {
  // 1.
  // To scroll to the element, we need to forst get its coordinates
  const s1Coordinates = section1.getBoundingClientRect();
  console.log(s1Coordinates);

  // This is not the best way to understand, so let's get the coordinates from the button we just clicked
  console.log(e.target.getBoundingClientRect());
  // x/y are the X/Y-coordinates of the rectangle origin relative to VISIBLE window, NOT the entire document. So when we scroll, these change!
  // Left and top are equivalent to X and Y

  // We can also get the current scroll position, if necessary
  console.log(
    'Current scroll position (X/Y):',
    window.pageXOffset,
    window.pageYOffset
  );

  // And since we're talking about coordinates and stuff, we can also read the height and width of the viewport. This provides the dimensions of the viewport AVAILABLE for content, so without any scrollbars!
  console.log(
    'Height/width of viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // 2.
  // window.scrollTo(s1Coordinates.left, s1Coordinates.top);
  // window.scrollTo({
  //   top: s1Coordinates.top,
  //   left: s1Coordinates.left,
  //   behavior: 'smooth',
  // });

  // window.scrollBy({ top: 200, behavior: 'smooth' });

  // 3.
  // BEST and most modern way. Here we don't need to get any coordinates!
  section1.scrollIntoView({ behavior: 'smooth' });
});

//////////////////////////////////////////////////////////////////
// LEC 8)	Types of Events and Event Handlers

/* 
// 0.
// We already worked with events before, but let's now add some more important concepts and make things more clear.
// So, an event is basically a SIGNAL generated by a DOM node. And a signal means that something has happened. For exmple, a click somewhere, or the mouse moving, or the user triggering the fullscreen mode, and really anything of importance, generates an event.
// And as we already know, we can LISTEN to these event using event listerners, so that we can handle them if we want. But no matter IF we handle a certain event por NOT, like a click, that event ALWAYS happens when a user clicks. It doesn't matter if we are actually listening for it or not. Alright?

// So, we already worked with a couple of different events earlier in the course, but let's now take a look at some more types of events, and at different ways of listening to events

const h1 = document.querySelector('h1');

// 1.
// The first and best way to listen to events is to use the addEventListener method on the element on which the event is supposed to happen
// And let's try a new event this time, the mouseenter. This even is a bit like hover in CSS, so it tires whenever the mouse enters a certain elements, as the name says
// h1.addEventListener('mouseenter', function(e) {
//   alert('addEventListener: Great, you are reading our heading 😃');
// });

// So far we have only used clike click and keyboard events, but there are so many other events. Let's take a look!
// https://developer.mozilla.org/en-US/docs/Web/Events

// 2.
// Another way to listen for an event is to use an on-event property
h1.onmouseenter = function(e) {
  alert('onmouseenter: Great, you are reading our heading 😃');
};
// So, for each event, there is an on-event property like this. There is also onclick, onkeypress, and so on and so forth.

// 3.
// However, this way of listenting to events is a bit old-school, it used to done like this, but now we should really use addEventListener. I'm just showing you this one in case you ever come across it.
// So, there are 2 reasons for preferring addEventListener

// First, with addEventListener we can add multiple event handlers for the SAME event, like this
h1.addEventListener('mouseenter', function(e) {
  this.style.color = 'red';
});

// However, if we don the thing with the on-event property, watch what happens
h1.onmouseenter = function(e) {
  this.style.fontSize = '80px';
};
// Now, the first event handler is NO LONGER running. That's because this is a property, and so here we are overwriting it.

// Now, the second reason why addEventListener is better, is that we can REMOVE an event handler, in case we don't need it anymore! This is something we hadn't done before, but it's very simple. We just to make sure that the handler function is a named function! It doesn't work to just write the same function! We have to expert the function into a named function variable. So let's start with that.
const alertH1 = function() {
  alert('addEventListener: Great, you are reading our heading 😃');

  // And this is how we REMOVE an event handler. It needs to be the exact same event of course, and the same handler function.
  // h1.removeEventListener('mouseenter', alertH1);
  // The removeEventListener of course doesn't have to be inside the handler function. This is just a pattern to basically only handle an event once! Because afterwards, the handler is immediatly removed
  // But you can remove after a certain time has passed, or after a form has been submitted, or something like that
};
h1.addEventListener('mouseenter', alertH1);

// Removing event listener after 5 seconds
setTimeout(() => {
  h1.removeEventListener('mouseenter', alertH1);
}, 5000);

// 4.
// Finally, there is a 3rd way of handling events, which is as an HTML attribute. This one should never be used, but again, I'm showing it to you more as a curiosity
// [GO TO HTML]
// <h1 onclick="alert('HTML: Great, you are reading our heading 😃')">
 */

//////////////////////////////////////////////////////////////////
// LEC 10) Event Propagation in Practice

/* 
// 0.
// So let's now see event propagation in practice, and mainly, event bubbling.
// We're gonna do that be attaching event handlers to the naviagtion links, as well as ALL the parent elements.

// 2.
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// 1.
// Only works on first link, because we're not using querySelectorAll, so it matches only the first
document.querySelector('.nav__link').addEventListener('click', function(e) {
  // 2.
  this.style.backgroundColor = randomColor();
  // console.log('LINK')

  // 3.
  // The target is WHERE the event ORIGINATED, NOT the element on which the hander is attached. So where the user CLICKED, in this example
  // console.log('NAV LINK', e.target.className);

  // 4.
  // If we want the CURRENT element, so, the element on which the event handler is attached to [HIGHLIGHT the element]
  console.log('LINK', e.target.className, e.currentTarget.className);
  // But usually, the target is more important

  // 5.
  // By the way, the current target is, according to the explanation beofre, the same as the this keyowrd, right?
  // console.log(e.currentTarget === this);

  // 6.
  // If we do NOT want to event do bubble up, we can actually stop it from doing so. All we need to so is to call the stopPropagation method on it.
  // e.stopPropagation();
  // Let's try to put this on the container instead, to see how stopping the bubbling phase looks like there

  // Now, generally, it's never a good idea to stop propagation, but I still showed this to you in case you ever really need it.
  // Sometimes stopping event propagation fixes problems in complex apps with multiple handlers for the same events. However, it's still not a good idea to use stopPropagation even if this situation.
});

document.querySelector('.nav__links').addEventListener('click', function(e) {
  this.style.backgroundColor = randomColor();
  // console.log('CONTAINER', e.target);
  console.table('CONTAINER', e.target.className, e.currentTarget.className);
  console.log(e.timeStamp);

  // e.stopPropagation();
});

document.querySelector('.nav').addEventListener('click', function(e) {
  this.style.backgroundColor = randomColor();
  // console.log('NAVIGATION', e.target);
  console.log('NAVIGATION', e.target.className, e.currentTarget.className);
  console.log(e.timeStamp);
});

document.querySelector('.header').addEventListener(
  'click',
  function(e) {
    this.style.backgroundColor = randomColor();
    // console.log('HEADER', e.target);
    console.log('HEADER', e.target.className, e.currentTarget.className);
  },

  // 7.
  // true,
);

// The order these logs appear in the console has NOTHING to do with the order of the code. It's just the order of the parent elements in the code.

// 7.
// So, these event listeners we set up here DO recieve events from the target elements, and from the bubbling phase as well. So, in other words, these handlers are listening for click events that happen on the element itself, and for click events that are BUBBLING UP from their child elements, right? So that's phase 2 and 3.
// But what about the capture phase? So, phase 1? We already know that events are captured coming down from the document element all the way to the target. But our event handlers, are NOT picking up these events during the capture pahse.
// That's because, by DEFAULT, event listeners only respond to events that happen on the target element, and during the bubbling phase. The reason for this is that the capturing phase is usually irrelevant for us, it's just not useful. The bubbling phase, on the otehr hand, can be VERY useful for something called event delegation, as we will see in the next lecture.
// Now, if we DO want to catch events during the capturing phase, we can define a THIRD parameter in the addEventListener function, which is the useCapture parameter, and set it to true.
// In the case, the event handler NO LONGER listens to BUBBLING events. So, each event listener is eacher a listener for the bubbling phase, OR the capturing phase
// The default of this parameter is false, which is why we usually never see capturing happen
// But that's very rarely used these days. The only reason BOTH capturing and bubbling exist is for historical reasons, from the time of where different browsers implemented different versions of JavaScript, whithout any standardization as we have now with ECMAScript

// 8.
// Some events do NOT bubble, because it doesn't make sense for them. Two examples are the focus and the blur events, which happens when an input fields becomes focusses, or lsoes focus. But again, most events DO bubble.
// In the next lecture we will learn WHY this is so useful, and implement event delegation.
 */

//////////////////////////////////////////////////////////////////
// LEC 11) Event Delegation: Implementing Page Navigation

// 0.
// Let's now use the power of event bubbling to implement something called event delegation!
// So, what we're gonna do is to implement a smooth scrolling behavior in the navigation, so that clicking a link automatically scolls smootly to the corresponsing section.

// 1.
// But let's first implement this WITHOUT event delegation, so that you can see the problem of the approach we have been using so far
// So we would select the links
const allLinks = document.querySelectorAll('.nav__link');

// And then add one event listener to EACH link
/* allLinks.forEach(el =>
  el.addEventListener('click', function(e) {
    // Notice how in the href attribute of each link, we have # and then the the ID of the corresponing section that we want to scroll to. This is called an ANCHOR in HTML, and will automatically SCROLL to the element with the ID that is written in the href attribute
    // So if we didn't want SMOOTH scrolling, we wouldn't even need any JavaScript. But of course we want. And so we need to start by preventing this default behavior
    e.preventDefault();

    // Next, we need to get the href attribute. We can get it from the current element to which the element is attached to
    const id = this.getAttribute('href');

    // Finally, we just need to select the element with this ID, and scroll smoothly to it
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }),
); */

// Now, this works just fine, but it's not really EFFICIENT. We are adding the EXACT same event handler to multiple events, and that's unecessary. I mean, it's fine for 3 elements, but what if we had 1000 or 10.000 elements? That would certainly impact performance. And it's just not a clean solution.

// 2.
// The better solution, is, without a doubt, event delegation, where we only need ONE event listener. So, what IS event delegation?
// Event delegation is to use the fact that events bubble, by putting the event listener on a common parent of all the elements that we are interested in. In our example, that's the nav__links UL element. So when a user clicks one of the links, the event is generated and bubbles up, just as we saw in the last video. We then basically CATCH the event in the common parent, and handle it there, because we also know where the event actually ORIGINATED, from looking at the event.target property.
// So, we implement event delegation in 2 steps. First, we add the event listener to a COMMON parent element of the elements we are interested in. Second, we DETERMINE where the event originated from, and then work with THAT element.
// So let's implement this now!

// 2.1
// We usually choose the closest common ancestor, so that it's easier to understand what our event handler is doing. But this would work just the same for any other common parent, like the body or even the document.
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // 2.2
  // And now, we just need to figure out where the event happened. So, remember that e.target is the target element, so the element where the event HAPPENED. This becomes REALLY useful now, because we can use this information to know exactly WHERE the event occured
  // console.log(e.target);

  // Notice how we get clicks on the nav__link but also on nav__linkS. HOWEVER, we only want clicks on elements that have the nav__link class, right? Because we only want scrolling to occur when a link is clicked, NOT the entire container

  // So we need a MATCHING STRATEGY here, matching only the elements that we are actually interested in! And in this case, the best strategy is to test if the element has the nav__link class!
  if (e.target.classList.contains('nav__link')) {
    // Any clicks that happen OUTSIDE of a nav__link are now simply ignored!
    // Now finding the right matching strategy is probably the hardest part of implementing event delegation, but don't worry, there will be plenty of examples throughout the rest of the course

    // And now, at this point, we already know that the clicke happened on one of the links we are interested in! So we can now get the href attribute from that element
    const id = e.target.getAttribute('href');

    // We need to exclude the link that has just # (LATER)
    if (id !== '#')
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Alright, great! Now, are you still not convinced of event delegation? Do you think it's too much work? Well, there is an even more important use case of event delegation, which is when we're working with elements that are NOT YET on the page on runtime.
// So, we really NEED event delegation in case we need event handlers on elements that are NOT YET created at the time the script executes. For example, buttons added dynamically while using the application. It's not possible to add event handlers on elements that don't exist, but we can still handle events on them, using delegation. We will do this later.

//////////////////////////////////////////////////////////////////
// LEC 12) DOM Traversing

/* 
// Walking through the DOM is the act of selecting an element from another element. This is very important, because sometimes we need to select elements REALTIVE to a certain element. Like a direct child or a direct parent element. Or, sometimes we don't even know the structure of the DOM at runtime.

// So let's work with the main heading here, and going downwards, upwards, and sideways from this element
const h1 = document.querySelector('h1');

//////////////////////////////////////////////////////////////////
// 1) Going downwards, selecting children
// 1.
// To select child ELEMENTS, we already know that we can use querySelector, because we already know that querySelector works on elements.
console.log(h1.querySelectorAll('.highlight'));
// So selects all the elements with the highlight class that are children of the h1 element, no matter how deep within the element. In this case, ther are direct children of h1, but it would go down as deep as necessary into the DOM tree.

// 2.
// Now, sometimes all we need are DIRECT children, and for that we have special methods, that we also call on an element.
// All direct child nodes
console.log(h1.childNodes);
// We already know that nodes can be anything, like text, elements, and even comments. That's why usually we're interested in ELEMENTS
// If we want text, we can use the textContent that is available on all nodes, or innerHTML that is available on all elements

// 3.
// All direct child elements. Returns an HTML Collection, which is LIVE, remember. So this will change when children are updated
console.log(h1.children);
// So this one doesn't include the raw text, just real HTML elements

// There is also firstElementChild and lastElementChild
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'black';

// For nodes, there is firstChild and lastChild, but I won't go into these now

//////////////////////////////////////////////////////////////////
// 2) Going upwards, selecting parents
// 1.
// For direct parents, it's very straigtforward. We can select the parent NODE
console.log(h1.parentNode);
// But again, usally we are interested in the parent ELEMENT
console.log(h1.parentElement);
// In this case, they are the same

// But most of the time, we need a parent element which is not a DIRECT parent. So we might need a parent element, no matter how far away it is in the DOM tree. For that, we have the closest element!
h1.closest('.header').style.backgroundImage = 'var(--gradient-secondary)';
// We can set styles to CSS variables!
// If the selector matches the element on which we're calling closest, that's the element that will be returned. On otehr word, if the element itself is the closest element, that's the one that's returned (This is what happened in the last lecture)
h1.closest(h1).style.backgroundImage = 'var(--gradient-secondary)';

// This accepts a CSS selector, just like querySelector. But, in a way, the closest method is the OPPOSITE of querySelector! So querySelector finds children no matter how deep in the DOM tree, and closest finds PARENTS, no matter how far up in the DOM tree

//////////////////////////////////////////////////////////////////
// 3) Going sideways, selecting siblings

// 1.
// We can only directly select direct siblings. So this selects the previous and next ELEMENT siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

// And as always, we can also select sibling nodes
console.log(h1.previousSibling);
console.log(h1.nextSibling);

// 2.
// We also get ALL the siblings, including the selected element, by moving up to the parent, and then selecting all children
console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(el => {
  // We can do comparisons with elements, and it works as expected!
  if (el !== h1) el.style.transform = 'scale(0.5)';
});

//////////////////////////////////////////////////////////////////
// And now just as a fun demo, let's see how it can be necessary to find elements RELATIVE to a selected element

document.body.addEventListener('mouseover', function(e) {
  const current = e.target;

  // Select all CHILD button elements
  current
    .querySelectorAll('button')
    .forEach(btn => (btn.style.background = 'var(--gradient-secondary)'));

  // Select closest section element
  const section = current.closest('.section');
  // const section = current.parentElement;
  // It won't work like this. That's why we REALLY need closest!

  if (section) {
    section.style.background = 'var(--gradient-primary)';

    // Select siblings of current section
    section.previousElementSibling.style.background = 'black';
    section.nextElementSibling.style.background = 'black';
  }
});
 */

//////////////////////////////////////////////////////////////////
// LEC 13) Building a Tabbed Component

// 0.
// We're gonna implement a very popular component now, which is a tabbed component, like this.
// Now, we need a bunch on HTML to implement this, so let me walk you through it [SHOW HTML]... One important thing is that the tabs, represented as buttons here, have a data attribute, which represents WHICH tab should be opened when the button is clicked. Tab 1 is the one with --1, etc.

const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
const tabsContainer = document.querySelector('.operations__tab-container');

// 1.
// So let's add an event handler for the 3 buttons. We could do this, right?
// tabs.forEach(t => t.addEventListener("click", () => 1));
// But as we learned in the last video, this is bad. What if we had 200 buttons? Having 200 event listeners might slow down the page.

// The better way: event delegation! So, what is the common parent element of the buttons? It's the tab-container!
tabsContainer.addEventListener('click', e => {
  // 2.
  // Next up, we need our matching strategy. So we are interested in the buttons. So what about this?
  // v1: Problem when there are elements in the button that are not the button itself
  // const clicked = e.target;
  // So we got a problem when clicking on the outside of the buttons, so on the tabsContainer itself. But, let's first worry about the SPAN element. Look what happens when we click on the number! We get a span, not a click on the button as we expected. So, we needt to move up to the parent, right? This is where we need DOM Traversion!

  // v2: This solves the clicking on the span elements, but what about the button itself? Doesnt work!
  // const clicked = e.target.parentElement;

  // v3: closest solve this, because it simply looks for the closest PARENT element with the provided query, even if it's the clicked element itself. Remeber?
  const clicked = e.target.closest('.operations__tab');

  // We will mark the active tab by adding the operations__tab--active class [check HTML for first tab]
  console.log(clicked);
  // clicked.classList.add('operations__tab--active');

  // Great, so now we have our button element, no matter if we click on the button itself or the span. But what about clicking on the tabsContainer?
  // Well, as you see here in the console, in this case, clicked is NULL. That's the result of the closest method when NO matching parent element can be found. So let's IGNORE any click when clicked is NULL, Or, in other words, let's only execute our logic if clicked actually exixts!
  if (clicked) {
    // So, in this lecture we could NOT simply use the solution that we used in the navigation example, where we just checked for a class, because then we would have ignored clicks on the SPAN element. That's why we first found the closest parent button, and then checked if there was a result.

    // 4.
    // Now to make this work, we need to start by deactivating ALL tabs and tab content areas
    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    tabsContent.forEach(c => c.classList.remove('operations__content--active'));

    // 3.
    clicked.classList.add('operations__tab--active');

    // And now, finally, we also need to activate the tab content area itself. Remember, we get the information of WHICH content are should be activated, from the data-tab attribute of the corresponsing tab button, right? So let's read that data from the clicked tab
    // And the custom data attributes are extremely useful here, because they allowed us to store data in the HTML that we needed to retrieve later
    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add('operations__content--active');
  }
});

//////////////////////////////////////////////////////////////////
// LEC 14) Passing Arguments to Event Handlers

// Let's create an effect on the navigation where all the links fade out when we hover over one of them, except the link that we are hovering on.

// v1)
// // Of course we don't want to add an event listener to each link individually. So, what do we do? That's right, we use event delegation again!
// nav.addEventListener('mouseover', function(e) {
// // We used the mouseENTER event previously, and mouseOVER is very similar to mouseenter, with the big difference that mouseENTER does NOT bubble. There are also the opposites of these events, that we can basically use to UNDO what we did on hover. The opposite of mouseENTER is mouseLEAVE, and the opposite of mouseOVER is mouseOUT. You can check this out, as always, in the documentation on MDN.

//   // Here is where we MATCH the element that we're actually looking for, which is the elements with the nav__links class. So, when the target of the event is an element containing that class, we execute our logic
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;

//     // Let's assume that there are other navigations on the page, and so we  need to select elements RELATIVE to the hovered link. So we need to traverse the DOM
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = 0.5;
//     });
//     logo.style.opacity = 0.5;
//   }
// });

// nav.addEventListener('mouseout', function(e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = 1;
//     });
//     logo.style.opacity = 1;
//   }
// });
// // This works, but is of course EXTREMELY repetitive!

// WHY it won't work calling function

// v2
// // So let's make our code more DRY!
// const handleHover = function(e, opacity) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = opacity;
//     });
//     logo.style.opacity = opacity;
//   }
// };

// // Now, you might think that we are able to do something like this, but it won't work
// // nav.addEventListener('mouseover', handleHover(e, 0.5));
// // The first obvius problem is that e is not defined. But the main problem is that the addEventListener function expects a FUNCTION. But what we did here, was to CALL the function! So this here [highlight] is now a VALUE, and no longer a function.
// // So we already talked about this a lot of times, right? But it's important to keep remembering this. So, again, we need to pass in a callback function here, so that the ENGINE can call this function as soon as the event happens. When we call the function OURSELVES like this, it will return a value, in this case undefined because we didn't return anything from the function. So here we now have undefined, and NO function, and so this is never gonna work.

// // The solution to this problem is to still have an anonymous handler callback like before, and then call our own function manually in there!
// nav.addEventListener('mouseover', function(e) {
//   handleHover(e, 0.5);
//   // And so now the problem we had before disappears, because here we call the handleHover function only as soon as this whole [highlight] function is called.

//   // Now, all this is necessary because the event listener function only has ONE parameter, and that's the event. We can NOT pass any additonal arguments into this handler function manually, and so we need to use workaround like this
// });

// nav.addEventListener('mouseout', function(e) {
//   handleHover(e, 1);
// });

// v3
// But we can do even better, and remove the anonymous event hander functions altogether!
const handleHover = function (e) {
  // console.log(this);
  // Remember, usually this is equal to e.currentTarget. But even when setting the this variable manually, e.currentTarget still points to the element to which the handler is attached to. In this case, that would be the nav element [highlight]
  // console.log(e.currentTarget);

  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      // 2.
      // And now, we can use the this variable that we BOUND to this function. So, we set the this variable to 0.5 using bind down here, and so now we have access to that 0.5 value by using the this keyword.
      // Again, this is necessary because we can NOT pass arguments to an event handler function, except for the event object itself.
      // But we CAN use this nice thrick with the this keyword
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// 1.
// The ideal way to solve this problem is to use the bind method on our handler function. We will talk in depth about the bind method in the next section, but in short, what the bind method does, is to create a COPY of the the functions that it's called on, and sets the THIS variable in the function, to the value that we passed in!
// So, here we are NOT calling handleHover, okay? We are just creating a COPY of the function, with a PRE-DEFINED this variable
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
// If you need to pass in multiple arguments, just make the this keyword an object with all the data you wanna pass in

//////////////////////////////////////////////////////////////////
// LEC 15) Implementing a Sticky Navigation: The Scroll Event

/* 
// 0.
// Let's implement a pretty common feature on webpages, which is a navigation that becomes attached to the top of the page after we scroll to a certain point. This is called a sticky navigation

// 2.
const initialCoordinates = section1.getBoundingClientRect();
console.log(initialCoordinates);
// x/y – X/Y-coordinates of the rectangle origin relative to window,
// width/height – width/height of the rectangle (can be negative).
// top/bottom – Y-coordinate for the top/bottom rectangle edge,
// left/right – X-coordinate for the left/right rectangle edge.

// 1.
// To implement this, we're gonna use the scroll event for now. This is a new one
window.addEventListener('scroll', function(e) {
  // We can get the current scroll position, as we learned before.
  // scrollY and scrollX live on the window element, NOT the event object, which is useless in scroll
  console.log(window.scrollY);

  // 2.
  // Now, we will achieve the sticky effect, by simply adding a sticky class to the navigation when it should become sticky [SHOW CSS]
  // Now the question is: when exactly should the navigation become sticky?
  // Well, it should happen as soon as we reach the first section. So, how do we determine that position? Well, we just take the TOP coordinate of this first section, and add the sticky class whenever the current scroll position is GREATER than the TOP, so, the STARTING position of the section
  // Let's calculate that outside, because it never changes, we can optimize this
  if (window.scrollY > initialCoordinates.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});

// Now, this works just fine, but this is actually a VERY BAD way of performing a certain action at a certain position of the page. That's because the scroll event fires every single time there is a small change in the scroll, which makes this very inefficient and terrible for performance, especially on mobile. So you should avoid the scroll event at all costs.
// So, using the scoll event is the OLD way of doing things, but now we have a better and way more efficient tool, which is called the Intersection Observer API. So let's implement the same functionality using an Intersection Observer in the next lecture.
 */

//////////////////////////////////////////////////////////////////
// LEC 16) A Better Way: The Intersection Observer API

// 0.
// So, the intersection observer API allows us to OBSERVE changes to HOW a certain TARGET element intersects ANOTHER element, or the viewport. And so from this definition alone, I think you can see, that this will be useful in implementing our sticky navigation.
// But let's now start by learning how the Intersection Observer API works, without our sticky naviagtion, because at the beginning, it can seem to be a bit intimidating.

// 3.
// Here we define the callback function that will get called EACH TIME the observed element is intersecting the ROOT element at the threshold we defined. In the current examole, whenever the first section is interssecting the viewport 10%, this function will get called, no matter if the page is scrolling up or down.
// The function is called with an array of all the threashold entries and the observer object itself. There are MULTIPLE entries, because there can be multiple thresholds! Let's experiment with that later.
const obsCallback = function (entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
    // Notice that the callback fires when 10% become FIRST visible, and then AGAIN, when we're scolling it out out view, and it's back at about 10% intersection.

    // So we get access to the intersectionRation, which is similar to the threshold value
    // We also get the isIntersecting property which tells us if the target is currently intersecting the root element by approximately the threshold
    // Based on this data, we can then perform actions
  });
};

// 2.
const obsOptions = {
  // The root is the element that the TARGET is intersecting. It can be the closest parent element, or the entire viewport, which is way more useful.
  // To intersect the entire viewport, so the part of the page we're seeing, we set root to null
  root: null,

  // The threshold is the PERCENTAGE OF INTERSECTION at which the observer callback will be called. Now this sounds very confusing, so let's just put this to 10%, which is 0.1, and then create the callback function
  // threshold: 0.1,

  // 4.
  threshold: [0, 0.2],
  // 1 means that the callback will be called only when 100% of the target is visible in the root, so in our example, in the viewport.
  // With 0, it triggers each time it moves completely out of view, or as soon as it ENTERS the view. That's because, remember, the callback will be called when the threshold is passed when moving INTO the view, and then moving OUT of the view. This is important to remember!
  // Now, I know this is kind of confusing, it took me some time to get a grip on this too. Just experiment with different thresholds and try to explore this yourself.
};

// 1.
// 1.1. So, to use the intersection observer API, we first need to create a new OBSERVER...
// 1.3. Now, we need to pass 2 arguments into the observer, a callback function, and the observer options as an object. Let's create one variable for each and then pass them in
const observer = new IntersectionObserver(obsCallback, obsOptions);

// 1.2: And then, we USE that observer to observer a certain TARGET
// observer.observe(section1);
// Section 1 is the TARGET here

//////////////////////////////////////////////////////////////////
// 0.
// Alright, so now that we have an idea about how the Intersection Observer API works

// 3.
// Let's get the height from getBoundingClientRect. We could use getComputedStyle as we used before, but for DIMENSIONS, this one is better, because it returns numbers right away, no need to parse
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

// 2.
// Don't need the observer
const stickNav = function (entries) {
  // There is only 1 entry, because there is only one treshold, so let's just save it to a variable, no need for a loop like before
  const [entry] = entries; // Destructuring
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

// 1.
const headerObserver = new IntersectionObserver(stickNav, {
  root: null,
  // With 0, it triggers each time the target moves OUT of view and INTO view
  threshold: 0,

  // 3.
  // Now, let's say we actually want to make the nvaigation sticky a bit sooner, exactly the height of the naviagtion sooner, so that the navigation comes exactly before the first section starts.
  // If we want EXACT pixel amounts, we need to use the rootMargin property
  // With this we add a 90px margin around the viewport, virtually "extending the viewport by 90px", so that it becomes intersected EARLIER [Check if it works on network tab]

  // A margin that is applied OUTSIDE of the box. We make it negative 90, so that this triggers 90 BEFORE target leaves viewport (90 is height of menu). Unfortunately, only px and % work, not rem
  // rootMargin: `-90px`,
  rootMargin: `-${navHeight}px`,
});

// So, how should we configure the intersection observer this time? Well, remember that we want tthe navigation to become stickly when the section-1 reaches the top of the viewport, right? Well, that is difficult to translate to the threshold, because there is not a percentage that can express "when section-1 reaches top of viewport"
// So what else could we do? Well, if you think about this, section-1 reacing the top of the viewport, is the same as the header, which is the elemen above it to become completely invisibe, so move completely OUT of the viewport. And that we can express! So let's actually observe the header, and set the treshold to zero
headerObserver.observe(document.querySelector('.header'));

//////////////////////////////////////////////////////////////////
// LEC 17) Revealing Elements on Scroll

// Let's implement another really cool and modern feature using the intersection observer API, which is to reveal elements as we scroll close to them. This can give your pages a very nice touch, and you can easily implement it without any external library
// So what we're gonna do is to reveal each SECTION as we approach it. And this is gonna be a really cool use case for intersection observers, which adds some interesting new twists

const allSections = document.querySelectorAll('.section');
const revealSection = (entries, observer) => {
  // Again, only one treshold
  const [entry] = entries;
  // console.log(entry);

  // We need to use entry.target this time, because we don't know beforehand which section is being scrolled to, because we are observing many sections at the same time, using the same observer.
  if (entry.isIntersecting) {
    // entry.target.classList.add('visible');
    entry.target.classList.remove('section--hidden');

    // Let's remove the observer, to take some work of the main thread. then, when we scroll up and down, no more logs of it
    observer.unobserve(entry.target);
  }
};
const rowObserver = new IntersectionObserver(revealSection, {
  root: null,
  // We don't want the target, so the row, to show exactly when it enters the viewport, but instead a little later, so we say 17% of the row should be visible
  threshold: 0.17,
  // We could have used rootMargin for a more precise measurements, but in this case it doesn't really matter
});

// Observing multiple targets using the same observer, which is no problem at all! In the callback function we can then determine WHICH element was intersected
allSections.forEach(row => {
  // Observe the row
  rowObserver.observe(row);

  // We need to add the section--hidden class to all sections, so that they are hidden at the beginning. We could do it manually in the HTML, but that's not good, in case JavaScript is disabled on the user's browser, then there is no way to see the content, because it will be hidden by default
  row.classList.add('section--hidden');
});

//////////////////////////////////////////////////////////////////
// LEC 18) Lazy Loading Images

// ??? MAYBE NOT NECESSARY? If you remove, put setting .src somethere else, because I will need it later in the async example!

// For this, it's ideal to have a very low-res placeholder images

// This selects all image elements which have a data-src attribute. This is a CUSTOM data attribute
const imgTargets = document.querySelectorAll('img[data-src]');
const loadImg = (entries, observer) => {
  entries.forEach(entry => {
    // console.log(entry);

    // entry.target is the image

    if (entry.isIntersecting) {
      // This happens asynchronously, behind the scenes. When it's ready, the image emits a load event.
      entry.target.src = entry.target.dataset.src;
      // With this, we handle the event when the image finished loading. We then remove the blurred filter! We use a reguylar function here becuase I want to use 'this'
      entry.target.addEventListener('load', function () {
        this.classList.remove('lazy-img');
      });

      // entry.target.onload = function() {
      // };
      // Creating an "empty" image:
      // document.createElement('img')

      // V1, without placeholder images
      // entry.target.src = entry.target.dataset.src;
      observer.unobserve(entry.target);
    }
  });
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  // We need to load this image BEFORE we actually reach it, so we don't create a visible lag. To acieve this, we add a 200px margin to the bottom, virtually "extending the viewport 200px down", so that it is intersected earlier. [Check if it works on network tab]
  // We want EXACTLY 200px, not some percentage, that's why we use the margin here, and NOT the treshold
  rootMargin: '0px 0px -200px 0px',
});

// Observer multiple targets!
imgTargets.forEach(img => {
  imgObserver.observe(img);
});

//////////////////////////////////////////////////////////////////
// LEC 19) 20) 21) Building a Slider Component: Part 1/2/3

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

let curSlide = 0;
const maxSlide = slides.length;

const createDots = () => {
  slides.forEach((s, i) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activateDot = dot => {
  const dots = document.querySelectorAll('.dots__dot');
  dots.forEach(d => d.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${dot}"]`)
    .classList.add('dots__dot--active');
};

const goToSlide = slide => {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

const prevSlide = () => {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

const nextSlide = () => {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

btnLeft.addEventListener('click', prevSlide);
btnRight.addEventListener('click', nextSlide);

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') prevSlide();
  if (e.key === 'ArrowRight') nextSlide();
});

dotContainer.addEventListener('click', e => {
  console.log(e.target);
  // 1.
  // if (e.target.classList.contains('dots__dot')) {

  // 2.
  // If we need to do more complex matching, we can use MATCHES instead, which tests if a certain element WOULD BE selected by a certain selector. The selector has the exact same form as in querySelector or in CSS

  // TODO classList NOT necessary?!
  if (e.target.matches('.dots__dot')) {
    const { slide } = e.target.dataset; // Destructuring
    goToSlide(slide);
    activateDot(slide);
  }
});

// Go to next slide every 10 seconds
// setInterval(nextSlide, 10000);

const init = () => {
  goToSlide(0);
  createDots();
  activateDot(0);
};
init();

/////////////////////////////////////////////
//OPTIMIZATION CODE
//////////////////////////////////////
//switch to app
btnapp.addEventListener('click', event => {
  event.preventDefault();
  console.log('Holla');
  window.location.href = 'index2.html';
});

//Nav Links
const mCheckbox = document.querySelector('.menu__checkbox');

document.addEventListener('DOMContentLoaded', function () {
  const mediaQ = window.matchMedia('(max-width: 500px)');

  navContent.forEach(el =>
    el.addEventListener('click', function () {
      if (mediaQ.matches) {
        mCheckbox.checked = false;
      }
    })
  );
});

////////////////////////////////////////
//Nav Animation
const navAnime = function () {
  navContent.forEach((element, index) => {
    element.classList.remove('visible');

    setTimeout(() => {
      console.log(index + 'yeah');
      element.classList.add('visible');
    }, (index + 1) * 200);
  });
};

mCheckbox.addEventListener('change', event => {
  if (event.target.checked) {
    navAnime();
    console.log('i am clicked');
  }
});

// TODO create slider function to isolate this code and not pollute global namespace.

//////////////////////////////////////////////////////////////////
// LEC 22) Lifecycle DOM Events

// 0.
// Now to close off this section, let's take a quick look at different, important events that occur in the DOM during a webpage’s lifecycle. And when we say lifecycle, we mean from the moment that the page is accessed, until the user leaves it.

// 1.
// The first event is called DOMContentLoaded. This event is fired by the document as soon as the HTML is completely parsed, which means that the HTML has been downloaded and been converted to the DOM tree. Also, all scripts must be downloaded and executed before the DOMContentLoaded event can happen.
// However, this event does NOT wait for IMAGES and other external resources to load, okay? Just HTML and JavaScript need to be loaded.
// Now, you might think that only after this event is fired, the browser will start rendering the page, but that's not true. The browser will try to start rendering as soon as it receives a FIRST chunk of the DOM, even if it's still incomplete. So this is all a very fluid process, okay?

// Anyway, we can of course listen to this event, such as we can listen to any other event.
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
  // And with this, we can execute code that should only be executed AFTER the DOM is available. But actually, we want ALL our code to be executed only after the DOM is ready, right? So does that mean that we should wrap our entire code into an event listener like this?
  // Well, no, we actually don't need to do that. That's because we have the script tag, which imports our script into the HTML, only at the END of the BODY [SHOW]. This means that as the browser parses the HTML, line by line, it will only find our script at the VERY END, when the rest of the HTML is ALREADY parsed anyway. Okay?
  // So, if we have the script tag at the end of the HTML, as we have here, we do NOT need to listen for the DOMContentLoaded event.
  // Now, there are also other ways of loading the JavaScript file with the script tag, using the async or defer attributes, but we will talk about these in the next lecture.
});
// Now if you're coming to vanilla JavaScript from jQuery, you're probably used to wrap all your code into a document.ready function, which is equivalent to the DOMContentLoaded event. But again, such thing is not necessary in regular JavaScript

// 2.
// Next up, there is the LOAD event. The load event is fired by the WINDOW, as soon as not only the HTML is parsed, but also all the images and external resources like CSS files are loaded. So, basically, when the complete page has finished loading, is when this event gets fired.
window.addEventListener('load', function (e) {
  console.log('Page fully loaded, including images!', e);
});

// [SET TO SLOW 3G TO SIMULATE. This network tab is amazing to take a look at how the page loads! Load script and show waterfall, and DOMContentLoaded event time]

// 3.
// The last event I wanna show you is the beforeunload event, which gets fired immediatly BEFORE the user is about to leave a page. For example, after clicking the browser tab's close button or the reload button.
// We can use this beforeunload event to ask users if they are 100% sure that they want to leave the page
window.addEventListener('beforeunload', function (e) {
  // Chrome does not require this, but other browsers so
  e.preventDefault();
  // In order to show the confirmation window, we need to set the returnValue on the event. But it will be ignored. This used to be the message shown to users, but developers abused this, and so now a generic message is shown
  // e.returnValue = '';
  // Also, the message only appears if the user INTERACTS with the page
  console.log(e);
});
// I'm sure you have seen think kind of alert on some pages you have used in the past. Now, please do NOT abuse this feature. A message like this is pretty intrusive, and should only be displayed if necessary.
// For example, when the user is leaving in the middle of filling out a big form or writing a blog post, or something like this, where data could be accidentally lost.

//////////////////////////////////////////////////////////////////
// LEC 23) Efficient Script Loading: defer and async

// 1.
// We still have the script at the end of the body tag. As we see, the script only starts fetching by the end! It waited 2.5 seconds before even starting [queuing, it 'waits; in a queue/stalled]. For people on a slow connection like this, this is a terrible experience. Of course there are other performance bottlenecks here, like this huge hero image, but we're only talking about JavaScript here
// Also, note how the DOMContentLoaded event was fired after 12.3 seconds. This time is probably different for you, but take note of it
// The complete load time is about 22 seconds

// 2.
// [Add DEFER to the head]
// NOW, the script starts downloading immediately! Also, DOMContentLoaded now fired after 9.3 seconds, 3 seconds faster!
// The complete load time is still at 22 seconds

// 3.
// [Add ASYNC to the head]
// NOW, the script again, starts downloading immediately as expected. This time, DOMContentLoaded fired after just 5.2 seconds!
// The complete load time is STILL at 22 seconds, because the resources are still the same

//////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////
// LEc X) Coding Challenge #1

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

/* 
const highlightedText = document.querySelectorAll('.highlight');
// const highlightedText = document.getElementsByClassName('highlight');
setInterval(() => {
  // This keeps working because the element has already been selected before, and so the NodeList doesn't change anymore. If it was a LIVE HTML collection, this would NOT work
  highlightedText[0].classList.toggle('highlight');
}, 500);
// An animation like this is probably best done with CSS, but this is just to show you stuff */

//////////////////////////////////////////////////////////////////
/* 
// MAYBE, MAYBE NOT?
// 1.
const mouseEl = document.createElement('div');
mouseEl.style.cssText =
  'height: 30px; width: 30px; border-radius: 50%; background: black; opacity: 0.3; position: absolute';
// document.body.append(mouseEl);

document.addEventListener('mousemove', function(e) {
  // console.log(e);
  // 4.
  // If we wanted to create one new element for each move, we would basically PAINT on the interface!
  // const mouseEl = document.createElement('div');
  // mouseEl.style.cssText =
  //   'height: 30px; width: 30px; border-radius: 50%; background: black; opacity: 0.3; position: absolute';
  // document.body.append(mouseEl);
  // 2.
  // mouseEl.style.top = e.clientY + 'px';
  // mouseEl.style.left = e.clientX + 'px';
  // 3.
  // Just like before with the scroll coordinates, this is for the VIEWPORT, so, relative to the view we are currently viewing!
  // BUT, we want to set the top and left positions relative to the top and left of the PAGE, so, the DOCUMENT.
  // mouseEl.style.top = e.pageY + 'px';
  // mouseEl.style.left = e.pageX + 'px';
});
 */
