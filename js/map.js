import { isVerifiedContractor } from './filter.js';
import { createContractorsMapBaloons } from './contractors.js';

const DEFAULT_ZOOM = 10;
const DefaultCoordinate = {
  LAT: 59.92749,
  LNG: 30.31127,
};

const Url = {
  TILE_LAYER: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  ATTRIBUTION: 'https://www.openstreetmap.org/copyright',
  VERIFIED_ICON: './img/pin-verified.svg',
  DEFAULT_ICON: './img/pin.svg',
};

const IconSize = {
  SIZE: [36, 46],
  ANCHOR: [18, 46],
};

const map = L.map('contractor-map');
const markersGroup = L.layerGroup().addTo(map);

const setMap = () => {
  map.setView({
    lat: DefaultCoordinate.LAT,
    lng: DefaultCoordinate.LNG
  }, DEFAULT_ZOOM);

  L.tileLayer(
    Url.TILE_LAYER,
    {
      attribution: '&copy; <a href="Url.ATTRIBUTION">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

const standartPinMarker = L.icon({
  iconUrl: Url.DEFAULT_ICON,
  iconSize: IconSize.SIZE,
  iconAnchor: IconSize.ANCHOR,
});

const verifiedPinMarker = L.icon({
  iconUrl: Url.VERIFIED_ICON,
  iconSize: IconSize.SIZE,
  iconAnchor: IconSize.ANCHOR,
});

const setContractorMarker = (contractor) => {
  const { coords: { lat, lng } } = contractor;
  const getMarkerIcon = () => {
    if (!isVerifiedContractor(contractor)) {//проблема экспорта функции
      return verifiedPinMarker;
    }
    return standartPinMarker;
  };
  const contractorMarker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon: getMarkerIcon(),
    },
  );
  contractorMarker.addTo(markersGroup).bindPopup(() => createContractorsMapBaloons(contractor));
};

const resetMarkers = (contractors) => {
  markersGroup.closePopup();
  markersGroup.clearLayers();
  contractors.forEach((contractor) => setContractorMarker(contractor));

  // contractors.forEach((contractor) => {
  //   if (!contractor.coords || typeof contractor.coords !== 'object' || !contractor.coords.lat || !contractor.coords.lng) {
  //     console.error('Invalid contractor:', contractor);
  //   } else {
  //     setContractorMarker(contractor);
  //   }
  // });

};

const initMap = (contractors) => {
  setMap();
  resetMarkers(contractors);
};

export { initMap, resetMarkers };
