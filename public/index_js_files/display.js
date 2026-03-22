import state from './state.js';
import { pop } from './utils.js';

// Update display
export const updateUI = () => {
    const genEl = document.getElementById('generation');
    const popEl = document.getElementById('population');
    if (genEl) genEl.innerText = `Gen: ${state.gen}`;
    if (popEl) popEl.innerText = `Pop: ${pop(state.grid)}`;
    
    const atStart = state.gen === 0;
    const prev = document.getElementById('prevGen');
    const restart = document.getElementById('restartGen');
    if (prev) prev.disabled = atStart;
    if (restart) restart.disabled = atStart;
};

// Update time
export const updateTime = () => {
    const now = new Date();
    const t = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const el = document.getElementById('lastEdit');
    if (el) el.textContent = t;
};
