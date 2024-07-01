'use strict';

/////////////////////////////////////////////////////
// Grabbing elements

// Navbar
const navbar = document.querySelector('.nav');
const navItems = document.querySelector('.nav__items');
const navItemList = document.querySelectorAll('.nav__item');
const navLinkList = document.querySelectorAll('.nav__link');
const navLogo = document.querySelector('.nav__logo');

// Sections
const sections = document.querySelectorAll('.section');

// Tab component
const tabMenu = document.querySelector('.tab__menu');
const tabBtns = document.querySelectorAll('.section__btn');
const tabs = document.querySelectorAll('.section__tab');

// Slider
const slider = document.querySelector('slider');
const slides = document.querySelectorAll('.slider__slide');
const btnArrows = document.querySelectorAll('.btn__arrow');
const btnLeft = document.querySelector('.btn__arrow__left');
const btnRight = document.querySelector('.btn__arrow__right');
const dots = document.querySelector('.dots');

// Modal
const btnOpenModal = document.querySelector('.btn__header');
const modal = document.querySelector('.modal');
const layer = document.querySelector('.layer');
const btnCloseModal = document.querySelector('.signin__close');

/////////////////////////////////////////////////////
// Setting window to position 0 after loading DOM Content
window.addEventListener('DOMContentLoaded', () => window.scrollTo(0, 0));

/////////////////////////////////////////////////////
// Changing navbar opacity

function hoverManagement(e) {
	// Checking if the mouse is on a link
	if (e.target.classList.contains('nav__link')) {
		// Grabbing the link and assigning it to a variable
		const hovered = e.target;

		navLinkList.forEach((el) => {
			if (el !== hovered) el.style.opacity = this;
		});

		navbar.querySelector('.nav__logo').style.opacity = this;
	}
}

navbar.addEventListener('mouseover', hoverManagement.bind(0.5));
navbar.addEventListener('mouseout', hoverManagement.bind(1));

/////////////////////////////////////////////////////
// Displaying elements according to viewport scrowling

sections.forEach((section) => section.classList.add('section--hidden'));

function revealSection(entries, observer) {
	const [entry] = entries;
	// console.log(entry);

	if (!entry.isIntersecting) return;

	entry.target.classList.remove('section--hidden');
	observer.unobserve(entry.target);
	// entries.forEach(function (entry) {
	// 	// console.log(entry);
	// 	if (!entry.isIntersecting) return;

	// 	entry.target.classList.remove('section--hidden');
	// 	observer.unobserve(entry.target);
	// });
}

const sectionObserver = new IntersectionObserver(revealSection, {
	root: null,
	threshold: 0.05,
});

sections.forEach(function (section) {
	sectionObserver.observe(section);
});

/////////////////////////////////////////////////////
// Page scrolling

sections.forEach((section) => console.log(section.getBoundingClientRect()));
// Get navbar height
const navbarOffset = parseInt(window.getComputedStyle(navbar).getPropertyValue('height'));

navItems.addEventListener('click', function (e) {
	e.preventDefault();
	// console.log(sections[0].getBoundingClientRect(), yOffset, navbarOffset);

	if (e.target.classList.contains('nav__link')) {
		// Get id on button href attribute
		const id = e.target.getAttribute('href');
		console.log(id);

		// Get coordinates of section based on section id
		const coords = document.querySelector(id).getBoundingClientRect();
		console.log(coords.top, window.scrollY, navbarOffset);
		// console.log(window.pageYOffset);

		// Defining scrolling (position + window offset + navbar offset)
		// OBS:page offset is needed for when we are not on the top of the page, since top is a value related to the viewport position
		window.scrollTo({
			top: coords.top + window.scrollY - navbarOffset,
			// top: 1271,
			behavior: 'smooth',
		});

		// More direct, bot doesn't allow us to have an offset for navbar
		// document.querySelector(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
});

navLogo.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/////////////////////////////////////////////////////
// Tab Component

tabs.forEach((el) => {
	if (!el.classList.contains('tab1')) el.classList.add('section__tab--hidden');
});

function tabManagement(e) {
	if (e.target.classList.contains('section__btn')) {
		const clicked = e.target;
		const tabNumber = clicked.dataset.tab;
		console.log(tabNumber);

		tabBtns.forEach((el) => {
			el.classList.remove('section__btn--active');
			if (el === clicked) el.classList.add('section__btn--active');
		});

		tabs.forEach((el) =>
			!el.classList.contains(`tab${tabNumber}`)
				? el.classList.add('section__tab--hidden')
				: el.classList.remove('section__tab--hidden')
		);
	}
}

tabMenu.addEventListener('click', tabManagement);

/////////////////////////////////////////////////////
// Slider

let currentSlide = 0;

// Creating dots and positioning the slides for page load
slides.forEach(function (slide, i) {
	dots.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`);

	slide.style.transform = `translateX(${100 * i}%)`;
});

// Aux Functions
function hideDots() {
	Array.from(dots.children).forEach((dot) => dot.classList.remove('dots__dot--active'));
}

function hideSlides() {
	slides.forEach((slide) => (slide.style.opacity = 0));
}

function nextSlide() {
	currentSlide === slides.length - 1 ? (currentSlide = 0) : currentSlide++;
	goToSlide(currentSlide);
}

function previousSlide() {
	currentSlide === 0 ? (currentSlide = slides.length - 1) : currentSlide--;
	goToSlide(currentSlide);
}

// Function to go to slide (also changes dot and slide opacity)
function goToSlide(slideNumber) {
	hideSlides();
	hideDots();
	slides.forEach((slide, i) => {
		slide.style.transform = `translateX(${100 * (i - slideNumber)}%)`;
	});
	slides[currentSlide].style.opacity = 1;
	Array.from(dots.children)[currentSlide].classList.add('dots__dot--active');
}
goToSlide(0);

// Event Listeners
btnRight.addEventListener('click', nextSlide);

btnLeft.addEventListener('click', previousSlide);

dots.addEventListener('click', function (e) {
	const clicked = e.target;
	currentSlide = Number(clicked.dataset.slide);

	if (clicked.classList.contains('dots__dot')) {
		goToSlide(Number(currentSlide));
	}
});

document.addEventListener('keydown', function (e) {
	if (e.key === 'ArrowLeft') {
		previousSlide();
	}
	if (e.key === 'ArrowRight') nextSlide();
});

/////////////////////////////////////////////////////
// Modal

function displayModal(e) {
	e.preventDefault();
	modal.classList.remove('hidden');
}

function hideModal() {
	modal.classList.add('hidden');
}
// hideModal();

// Open modal
btnOpenModal.addEventListener('click', displayModal);

// Close modal with X button
btnCloseModal.addEventListener('click', hideModal);

// Close modal with Esc
document.addEventListener('keydown', function (e) {
	// console.log(e);
	if (e.key === 'Escape') hideModal();
});

// Close modal clicking on layer
layer.addEventListener('click', hideModal);
