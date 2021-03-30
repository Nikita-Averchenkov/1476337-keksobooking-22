import './form.js';
import './map.js';
import { renderMarkers, renderMainMarker } from './map.js';
import { setFilterChanger } from './filter.js';
import { setFormSubmit, onFormLuck, addFile } from './form.js';
import { obtainData } from './api.js';

const RERENDER_DELAY = 500;

obtainData((declarations) => {
  renderMarkers(declarations);
  setFilterChanger(_.debounce(
    () => renderMarkers(declarations),
    RERENDER_DELAY,
  ));
});

const updateMarkersMap = () =>{
  obtainData((declarations) => {
    renderMarkers(declarations);
    renderMainMarker()
  });
}

addFile();
setFormSubmit(onFormLuck);

export { updateMarkersMap };
