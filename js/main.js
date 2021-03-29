/* global _:readonly */
'use strict';

import './form.js';
import './map.js';
import { renderMarkers, renderMainMarker } from './map.js';
import { setFilterChange } from './filter.js';
import { setUserFormSubmit, onFormSuccess, addFile } from './form.js';
import { getData } from './api.js';

const RERENDER_DELAY = 500;

getData((declarations) => {
  renderMarkers(declarations);
  setFilterChange(_.debounce(
    () => renderMarkers(declarations),
    RERENDER_DELAY,
  ));
});

const updateMarkersMap = () =>{
  getData((declarations) => {
    renderMarkers(declarations);
    renderMainMarker()
  });
}

addFile();
setUserFormSubmit(onFormSuccess);

export { updateMarkersMap };
