const navscreen = document.getElementById('navscreen');
const navtoggle = document.getElementById('navtoggle');
const navtoggleIcon = navtoggle.childNodes[0];

navtoggle.addEventListener('click', function () {
  if (navscreen.classList.contains('active')) {
    navscreen.classList.remove('active');
    navtoggleIcon.classList.replace('fa-times', 'fa-eject');
  } else {
    navscreen.classList.add('active');
    navtoggleIcon.classList.replace('fa-eject', 'fa-times');
  }
});

const navscreenLinks = document.querySelectorAll('.navscreen-link');
navscreenLinks.forEach(function (nsl) {
  nsl.addEventListener('click', function () {
    navscreen.classList.remove('active');
    navtoggleIcon.classList.replace('fa-times', 'fa-eject');
  });
});
