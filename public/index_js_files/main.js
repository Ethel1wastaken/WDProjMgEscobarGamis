import { renderGrid } from '../renderGrid.js';
import state from './state.js';
import { initialize } from './init.js';
import { setMode, attachButtonHandlers, setupPatternInfo } from './buttons.js';
import { attachKeyboardHandlers } from './keyboard.js';
import { attachPasteHandlers } from './paste.js';
import { updateTime } from './display.js';

// Initialize app
const loaded = initialize();
setMode('draw');

// Attach event handlers
attachButtonHandlers();
attachKeyboardHandlers();
attachPasteHandlers();

// Setup pattern info
setupPatternInfo(loaded);
updateTime();
