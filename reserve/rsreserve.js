// Elements
const formContainer = document.getElementById('form-container');
const form = document.getElementById('reservation-form');
const eventsSelect = document.getElementById('events-picker');
const eventName = document.getElementById('event-name');
const eventDescription = document.getElementById('event-description');
const eventImage = document.getElementById('event-img');
const eventStart = document.getElementById('event-start');
const eventEnd = document.getElementById('event-end');
const eventDatesSelect = document.getElementById('event-dates');
const eventDatesSelectContainer = document.getElementById('event-dates-container');
const eventPrice = document.getElementById('event-price');
const reservationForm = document.getElementById('reservation-form');
const reservationResult = document.getElementById('reservation-result');
const submitBtn = document.getElementById('make-reservation');
const selectsContainer = document.getElementById('selects');

// Listeners
eventsSelect.addEventListener('change', handleEventSelected);
eventDatesSelect.addEventListener('change', handleEventDateSelected);
reservationForm.addEventListener('submit', handleFormSubmit);


// TODO: free events show as $/seat on demo

/**
 * Configuration options.
 */
const config = {
  baseUrl: 'https://rs-reserve.herokuapp.com',
  userId: '60336fc517e228331c317a34',
  dateFormat: {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  },
  dateFormatWithTime: {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  },
};

/**
 * Global state.
 */
const state = {
  events: [],
  selectedEvent: {},
  selectedDate: '',
  reservationsMade: false,
};

// Main
(async function () {
  state.events = await getEvents();
  setEventsSelect(state.events);
})();

//======================
// UTILS
//======================

/**
 * Returns a single HTML element its name attribute.
 *
 * @param {*} elementName The name of the element to select.
 */
function fromInputName(elementName) {
  return document.querySelector('[name=' + elementName + ']').value;
}

/**
 * Takes a date and returns a formatted version of it.
 * Uses default format from the `config` object.
 *
 * @param {*} date The date to be formatted.
 * @param {Object} format The format to use.
 */
function formatDate(date, format = config.dateFormatWithTime) {
  return new Date(date).toLocaleString('en-US', format);
}

/**
 * Returns an option element.
 *
 * @param {*} value
 * @param {*} text What the user sees.
 */
function createOption(value, text) {
  const option = document.createElement('option');
  option.value = value;
  option.innerHTML = text;
  return option;
}

//======================
// UI
//======================

/**
 * Adds items to the events select.
 *
 * @param {Array} events
 */
function setEventsSelect(events) {
  // Add event options
  events.forEach(function (event) {
    const option = createOption(event._id, event.name);
    eventsSelect.appendChild(option);
  });

  // Select the placeholder by default
  eventsSelect.children.item(0).setAttribute('selected', true);
}

/**
 * Adds items to the event dates select.
 *
 * @param {Array} dates
 */
function setEventDatesSelect(dates) {
  // Clear options, add placeholder
  const placeholder = createOption('', 'Select Date');
  eventDatesSelect.innerHTML = '';
  eventDatesSelect.appendChild(placeholder);

  // Add date options
  dates.forEach(function (date) {
    const option = createOption(date, formatDate(date, config.dateFormat));
    eventDatesSelect.appendChild(option);
  });

  // Select the placeholder by default
  eventDatesSelect.children.item(0).setAttribute('selected', true);
}

/**
 * Sets the text of the reservation result element.
 *
 * @param {String} text The text to display to the user.
 */
function setReservationResultText(text) {
  reservationResult.innerHTML = text;
}

/**
 * Show or hide an element.
 *
 * @param {Boolean} show `true` to show, `false` to hide.
 */
function showElement(element, show) {
  element.style.display = show ? 'block' : 'none';
}

/**
 * Clears the form and resets the submit button and results text.
 */
function resetForm() {
  form.reset();
  submitBtn.removeAttribute('disabled');
  submitBtn.innerHTML = 'Place reservations';
  showElement(form, true);
  showElement(formContainer, true);
  showElement(submitBtn, true);
  setReservationResultText('');
}

//======================
// API
//======================

/**
 * GET request.
 *
 * @param {*} url
 */
async function get(url = '') {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Fetch request failed: ' + url);
  }
  return response.json();
}

/**
 * POST request.
 *
 * @param {*} url
 * @param {*} data
 */
async function post(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return {
    status: response.status,
    statusText: response.statusText,
    data: response.json(),
  };
}

/**
 * On success, returns an array of event objects.
 * On error, returns an empty array.
 */
async function getEvents() {
  try {
    const url = config.baseUrl + '/integration/events?userId=' + config.userId;
    const response = await get(url);
    return response;
  } catch (e) {
    console.error(e.response);
    return [];
  }
}

//======================
// EVENT HANDLERS
//======================

/**
 * Handler called when an event is selected.
 *
 * @param {*} e
 */
function handleEventSelected(e) {
  const event = state.events.filter(event => event._id === e.target.value)[0];
  if (!event) return;

  resetForm();

  state.selectedEvent = event;

  // Reset date select value
  state.selectedDate = '';

  // Event Name
  eventName.innerHTML = event.name;

  // Event Description
  eventDescription.innerHTML = event.description;

  // Event Image
  if (!event.imageUrl) {
    eventImage.style.visibility = 'hidden';
  } else {
    eventImage.style.visibility = 'visible';
    eventImage.setAttribute('src', event.imageUrl);
  }

  // Event Start|End Dates
  eventStart.innerHTML = formatDate(event.date.start);
  eventEnd.innerHTML = formatDate(event.date.end);

  // Event Recurrences
  if (event.recurrences) {
    // Show : has recurrences
    eventDatesSelectContainer.style.display = 'flex';
    setEventDatesSelect(event.recurrences);
  } else {
    // Hide : is one-off event
    eventDatesSelectContainer.style.display = 'none'; // Hide
  }

  // Event Price
  eventPrice.innerHTML = event.price.value;
}

/**
 * Handler called when an event date is selected.
 *
 * @param {*} e
 */
function handleEventDateSelected(e) {
  if (!e.target.value) return;

  state.selectedDate = new Date(e.target.value);

  // Get event start|end dates
  const event = state.selectedEvent;
  const startDate = new Date(event.date.start);
  const endDate = new Date(event.date.end);

  // Start date with selectedDate year|month|date and event hours|minutes
  const selectedStart = new Date(
    state.selectedDate.getFullYear(),
    state.selectedDate.getMonth(),
    state.selectedDate.getDate(),
    startDate.getHours(),
    startDate.getMinutes()
  );

  // End date with selectedDate year|month|date and event hours|minutes
  const selectedEnd = new Date(
    state.selectedDate.getFullYear(),
    state.selectedDate.getMonth(),
    state.selectedDate.getDate(),
    endDate.getHours(),
    endDate.getMinutes()
  );

  // Attach the start time to selectedDate
  state.selectedDate = selectedStart;

  // Update start|end text
  eventStart.innerHTML = formatDate(selectedStart);
  eventEnd.innerHTML = formatDate(selectedEnd);
}

/**
 * Handler called when the reservation form is submitted.
 *
 * @param {*} e
 */
async function handleFormSubmit(e) {
  e.preventDefault();

  submitBtn.innerHTML = 'Placing...';
  submitBtn.setAttribute('disabled', true);

  const event = state.selectedEvent;

  // Set the appropriate eventDate (recurring vs one-off):
  if (event.options.recurring.isRecurring) {
    // Recurring: use the event-dates select value
    eventDate = state.selectedDate;
  } else {
    // One-off: use the event start date
    eventDate = event.date.start;
  }

  // Build the reservation to insert
  const newReservation = {
    eventId: event._id,
    name: {
      first: fromInputName('firstname'),
      last: fromInputName('lastname'),
    },
    email: fromInputName('email'),
    phone: fromInputName('phone'),
    qty: parseInt(fromInputName('quantity')),
    purchasePrice: {
      value: event.price.value,
    },
    eventDate,
  };

  try {
    const url = config.baseUrl + '/reservations';
    const response = await post(url, newReservation);
    if (response.status === 201) {
      setReservationResultText('Reservations placed. Check your email for verification.');
      showElement(submitBtn, false);
      showElement(form, false);
    }
  } catch (e) {
    console.error(e);
    setReservationResultText(
      'Your reservations could not be placed right now. Please try again.'
    );
  }

  return;
}
