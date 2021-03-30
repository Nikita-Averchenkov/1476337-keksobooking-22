import {unplugPage, includePage} from './form.js';
import {provideCardElement} from './card.js';
import {filterDeclarations} from './filter.js';

const ICON_SIZE_WIDTH = 52;
const ICON_SIZE_HEIGHT = 52;
const ICON_ANCHOR_WIDTH = 26;
const ICON_ANCHOR_HEIGHT = 52;
const LAT = 35.6895000;
const LNG = 139.6917100;
const DECLARATION_COUNT = 10;

unplugPage();
let L = window.L;
const map = L.map('map-canvas')
  .on('load', () => {
    includePage();
  })
  .setView({
    lat: LAT,
    lng: LNG,
  }, DECLARATION_COUNT);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


const mainMarkerIcon = L.icon({
  iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg',
  iconSize: [ICON_SIZE_WIDTH, ICON_SIZE_HEIGHT],
  iconAnchor: [ICON_ANCHOR_WIDTH, ICON_ANCHOR_HEIGHT],
});

let mainMarker = L.marker(
  {
    lat: LAT,
    lng: LNG,
  },
  {
    draggable: true,
    icon: mainMarkerIcon,
  },
);

mainMarker.addTo(map);
mainMarker.on('moveend', (evt) => {
  const coordinates = evt.target.getLatLng();
  const lat = coordinates.lat.toFixed(7);
  const lng = coordinates.lng.toFixed(7);
  const address = document.querySelector('#address');
  address.value = `${lat}, ${lng}`;
  address.setAttribute('readonly', 'true');
});

const renderMainMarker = () => {
  map.removeLayer(mainMarker);
  mainMarker = L.marker(
    {
      lat: LAT,
      lng: LNG,
    },
    {
      draggable: true,
      icon: mainMarkerIcon,
    },
  );
  mainMarker.addTo(map);
}


const markerIcon = L.icon({
  iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
  iconSize: [ICON_SIZE_WIDTH, ICON_SIZE_HEIGHT],
  iconAnchor: [ICON_ANCHOR_WIDTH, ICON_ANCHOR_HEIGHT],
});

const markerLayer = L.layerGroup().addTo(map);

const renderMarkers = (declarations) => {
  markerLayer.clearLayers();
  const filteredData = filterDeclarations(declarations).slice(0, DECLARATION_COUNT);
  filteredData.forEach(({author, offer, location}) => {
    const declarationsLat = location.lat;
    const declarationsLng = location.lng;

    const marker = L.marker(
      {
        lat: declarationsLat,
        lng: declarationsLng,
      },
      {
        icon: markerIcon,
      },
    )
    marker
      .addTo(markerLayer)
      .bindPopup(
        provideCardElement(author, offer),
      );
  })
}

export {renderMarkers, renderMainMarker};
