// Static constants
const BG_UPDATE_SPEED_MS = 10_000;

// UI constants
const webandmedia = document.querySelector('.brand');
const redblock = document.querySelector('.right-filler-block'); // TODO: remove
const nav = document.querySelector('.nav');
const navlinks = document.querySelectorAll('.nav a');
const fillerBlocks = document.querySelectorAll('.background-block');
const sun = document.getElementById('sun');
const ship = document.getElementById('ship');

// Sections
const home = document.getElementById('home');
const services = document.getElementById('services');
const portfolio = document.getElementById('portfolio');
const about = document.getElementById('about');
const contact = document.getElementById('contact');

// const GOTO = document.getElementById("services");
// GOTO.scrollIntoView(true);

const links = ['home', 'services', 'portfolio', 'about', 'contact'];
const navLinks = [];
links.forEach((link) => {
  navLinks.push(document.querySelector('.' + link));
});

// ----------------------------------------------------------------------------------------------------------------------
// Navlink/.active stuff. Make an obj or something to hold all this shit
// Prefix or suffix can be empty to get only a prefix or only a suffix
const navlinkActiveClassName = 'active';
const navlinkActivePrefix = '[';
const navlinkActiveSuffix = ']';

navlinks.forEach((navlink) => {
  navlink.addEventListener('click', (e) => {
    setNoLinksActive();
    navlink.classList.add(navlinkActiveClassName); // add css class
    navlink.innerHTML =
      navlinkActivePrefix + navlink.innerHTML + navlinkActiveSuffix; // add prefix
    navlink.setAttribute('data-glitch', navlink.innerHTML); // add css ::before/::after
    navlink.style.transform = 'skew(' + randomInRange(-3, 3) + 'deg)';
  });
});

/**
 * Iterates over each navlink and removes the active classname and
 * removes the prefix & suffix.
 */
function setNoLinksActive() {
  navlinks.forEach((navlink) => {
    // TODO: use regex for prefix & suffix
    navlink.classList.remove(navlinkActiveClassName); // remove css class
    navlink.innerHTML = navlink.innerHTML.replace(navlinkActivePrefix, ''); // remove prefix
    navlink.innerHTML = navlink.innerHTML.replace(navlinkActiveSuffix, ''); // remove suffix
    navlink.setAttribute('data-glitch', navlink.innerHTML); // remove css ::before/::after
    navlink.style.transform = 'skew(0deg)';
  });
}

function initActiveNavlink() {
  const n = navlinks[0];
  n.classList.add(navlinkActiveClassName);
  n.innerHTML = navlinkActivePrefix + n.innerHTML + navlinkActiveSuffix;
  n.setAttribute('data-glitch', n.innerHTML);
}

const tabs = document.querySelectorAll('.tab');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    // Remove .active from all tabs and add it to the appropriate tab
    removeActiveClass('.tab.active');
    tab.classList.add('active');

    // Remove .active from all service content elements
    removeActiveClass('.tab-page.active');

    // Get the content associated with the tab and activate the content
    const content = document.querySelector(`.tab-page.${tab.dataset.content}`);
    content.classList.add('active');
  });
});

/**
 * Removes the "active" class on an element via a query selector.
 *
 * @param {String} querySelector The selector used to find the active element
 */
function removeActiveClass(querySelector) {
  const active = document.querySelector(querySelector);
  if (active !== null) {
    active.classList.remove('active');
  }
}

// ----------------------------------------------------------------------------------------------------------------------

// Navtoggle
const navscreen = document.getElementById('navscreen');
const navtoggle = document.getElementById('navtoggle');
const navtoggleIcon = navtoggle.childNodes[0];
navtoggle.addEventListener('click', function () {
  if (navscreen.classList.contains('active')) {
    navscreen.classList.remove('active');
    navtoggleIcon.classList.replace('fa-times', 'fa-eject');
    // navscreen.style.opacity = 0;
  } else {
    navscreen.classList.add('active');
    navtoggleIcon.classList.replace('fa-eject', 'fa-times');
    // navscreen.style.opacity = 1;
  }
});

const navscreenLinks = document.querySelectorAll('.navscreen-link');
navscreenLinks.forEach((nsl) => {
  nsl.addEventListener('click', () => {
    navscreen.classList.remove('active');
    navtoggleIcon.classList.replace('fa-times', 'fa-eject');
    // navscreen.style.opacity = 0;
  });
});

/**
 * Enables smooth scroll for each nav link.
 */
function setSmoothScrollOnAnchors() {
  const anchors = document.querySelectorAll('a[href^="#"]');
  anchors.forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView();
    });
  });
}

// Parallax shit
let fuzzyBackground = true;
let oldScroll = 0;
document.addEventListener('scroll', function (e) {
  return;
  const scroll = window.scrollY;
  sun.style.top = 'calc(10% - ' + scroll * 0.3 + 'px)';
  ship.style.top = 'calc(15% + ' + scroll * 0.2 + 'px)';

  const scrollingDown = scroll > oldScroll;
  if (scrollingDown) {
    ship.style.transform = 'rotate(0) scale(' + 0.5 + ')';
  } else {
    ship.style.transform = 'rotate(180deg) scale(' + 0.5 + ')';
  }

  const vh = getViewportHeight();
  if (scroll + 100 > vh) {
    // nav.style.opacity = 0.1;
    nav.classList.add('with-bg');
  } else {
    // nav.style.opacity = 1;
    nav.classList.remove('with-bg');
  }

  if (scroll % 10 === 0) {
    document.body.style.backgroundPositionX = randomInRange(-50, 50) + 'vw';
    document.body.style.backgroundPositionY = randomInRange(-50, 50) + 'vh';
  }

  removeActiveClass('nav .active');
  let navscroll = scroll + 150;
  if (navscroll >= home.offsetTop && navscroll < services.offsetTop) {
    setNavActive(0);
  } else if (
    navscroll >= services.offsetTop &&
    navscroll < portfolio.offsetTop
  ) {
    setNavActive(1);
  } else if (navscroll >= portfolio.offsetTop && navscroll < about.offsetTop) {
    setNavActive(2);
  } else if (navscroll >= about.offsetTop && navscroll < contact.offsetTop) {
    setNavActive(3);
  } else {
    setNavActive(4);
  }

  oldScroll = scroll;
});

function setNavActive(index) {
  setNoLinksActive();
  navlinks[index].classList.add(navlinkActiveClassName); // add css class
  navlinks[index].innerHTML =
    navlinkActivePrefix + links[index] + navlinkActiveSuffix; // add prefix
  navlinks[index].setAttribute('data-glitch', navlinks[index].innerHTML); // add css ::before/::after
  navlinks[index].style.transform = 'skew(' + randomInRange(-3, 3) + 'deg)';
}

/**
 * Changes the body"s background x and y positions to a random vw/vh
 * every {BG_UPDATE_SPEED_MS} milliseconds.
 */
// const randomBackgroundSize = setInterval(function () {
//     // Random film grain bg position
//     if (fuzzyBackground) {
//         document.body.style.backgroundPositionX = randomInRange(-50, 50) + "vw";
//         document.body.style.backgroundPositionY = randomInRange(-50, 50) + "vh";
//     }

//     // Background blocks movement
// }, BG_UPDATE_SPEED_MS);

// #region

/**
 * Returns a random number between a minimum and maximum.
 *
 * @param {number} min lower bounds
 * @param {number} max upper bounds
 */
function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function getViewportHeight() {
  return Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );
}

// #endregion

/**
 * Startup functions. Gets called at the bottom of this file.
 */
(function init() {
  initActiveNavlink();
  setSmoothScrollOnAnchors();
})();
