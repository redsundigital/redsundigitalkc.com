const CONFIG = {
  url: 'http://127.0.0.1:3001',
  api: '/api/v1',
  organizationId: '60064ef9778cfb0d9c8bc5e5',
  eventId: '60069a6d16e2125b78dce923',
};

const STATE = {
  organization: {},
  setOrganization(newOrganization) {
    STATE.organization = newOrganization;
    STATE.onOrganizationChange();
  },
  onOrganizationChange() {
    // nothing yet
  },
  event: {},
  setEvent(newEvent) {
    STATE.event = newEvent;
    STATE.onEventChange();
  },
  onEventChange() {
    const { name, startDate, endDate, reservationOptions } = STATE.event;
    UI.setEventName(name);
    UI.setEventDateRange(startDate, endDate);
    UI.setEventPrice(reservationOptions.price.value, '$');
  },
  getEventPrice() {
    if (!STATE.event) return null;

    const price = STATE.event.reservationOptions.price.value;
    return price;
  },
  reservations: [],
  setReservations(reservations) {
    STATE.reservations = reservations;
    STATE.onReservationsChange();
  },
  onReservationsChange() {
    // nothing yet
    console.log(STATE.reservations);
  },
};

const UI = {
  setEventName(name) {
    document.getElementById('event-name').innerHTML = name;
  },
  setEventDateRange(startDate, endDate) {
    document.getElementById('event-start').innerHTML = new Date(startDate).toUTCString();
    document.getElementById('event-end').innerHTML = new Date(endDate).toUTCString();
  },
  setEventPrice(price) {
    document.getElementById('event-price').innerHTML = price;
  },
  setReservationResult(result) {
    document.getElementById('reservation-result').innerHTML = result;
  },
};

const API = {
  getEvent() {
    const url = `${CONFIG.url}${CONFIG.api}/events/${CONFIG.eventId}`;
    utils.get(url).then(STATE.setEvent).catch(utils.handleFetchError);
  },
  getOrganization() {
    const url = `${CONFIG.url}${CONFIG.api}/organizations/${CONFIG.organizationId}`;
    utils.get(url).then(STATE.setOrganization).catch(utils.handleFetchError);
  },
  async makeReservation(reservation) {
    const url = `${CONFIG.url}/reserve`;
    const response = await utils.post(url, reservation);
    return response;
  },
  async getEventAvailability() {
    const url = `${CONFIG.url}/reserve/availability/${CONFIG.eventId}`;
    return utils.get(url);
  },
};

const utils = {
  async get(url = '') {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Fetch request failed: ' + url);
    }
    return response.json();
  },
  async post(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify(data),
    });

    return response.json();
  },
  handleFetchError(error) {
    return console.error('Fetch error:', error);
    // TODO: better error handling...
  },
  fromInputName(name) {
    return document.querySelector('[name=' + name + ']').value;
  },
};

// =====================================================================

// Reservation Form: onSubmit
const reservationForm = document.getElementById('reservation-form');
reservationForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  const { fromInputName } = utils;

  const reservation = {
    organization_id: CONFIG.organizationId,
    event_id: CONFIG.eventId,
    reservee: {
      name: fromInputName('name'),
      email: fromInputName('email'),
      phone: fromInputName('phone'),
    },
    quantity: parseInt(fromInputName('quantity')),
    purchasePrice: {
      value: STATE.getEventPrice(),
    },
  };

  API.makeReservation(reservation)
    .then((response) => {
      console.log(response);
      if (response.event_id) {
        UI.setReservationResult('Thank you, your reservations have been made.');
      } else {
        UI.setReservationResult(response.message);
      }
    })
    .catch(console.error);
});

// =====================================================================

(async function main() {
  await API.getEvent();
  const reservations = await API.getEventAvailability();
  console.log(reservations);
  if (!reservations.available) {
    document.getElementById('event-price').parentNode.style.display = 'none';
    document.getElementById('make-reservation').style.display = 'none';
    UI.setReservationResult('Sorry, there are no available reservations.');
  }
})();
