import { renderGrid } from '../renderGrid.js';
import state from './state.js';
import { run } from './game.js';
import { updateUI, updateTime } from './display.js';
import { copy, saveUndo } from './utils.js';

// Set mode
export const setMode = m => {
    state.mode = m;
    state.pasting = false;
    state.pastePos = null;
    const view = document.getElementById('viewMode');
    const select = document.getElementById('selectMode');
    const draw = document.getElementById('drawMode');
    [view, select, draw].forEach(b => b.classList.remove('active'));
    
    if (state.mode === 'view') view.classList.add('active');
    else if (state.mode === 'select') select.classList.add('active');
    else draw.classList.add('active');
    
    const canvas = document.getElementById('gridCanvas');
    if (canvas) {
        canvas.style.cursor = state.mode === 'view' ? 'grab' : state.mode === 'select' ? 'crosshair' : 'default';
    }
};

// Button handlers
export const attachButtonHandlers = () => {
    document.getElementById('viewMode').onclick = () => setMode('view');
    document.getElementById('selectMode').onclick = () => setMode('select');
    document.getElementById('drawMode').onclick = () => setMode('draw');

    document.getElementById('playPause').onclick = () => {
        const btn = document.getElementById('playPause');
        if (state.playing) {
            clearInterval(state.interval);
            state.playing = false;
            btn.classList.remove('playing');
            btn.textContent = '▶';
        } else {
            run();
            state.interval = setInterval(run, 100);
            state.playing = true;
            btn.classList.add('playing');
            btn.textContent = '⏸';
        }
    };

    document.getElementById('nextGen').onclick = () => {
        if (state.playing) {
            clearInterval(state.interval);
            state.playing = false;
            document.getElementById('playPause').classList.remove('playing');
            document.getElementById('playPause').textContent = '▶';
        }
        run();
    };

    document.getElementById('prevGen').onclick = () => {
        if (state.gen > 0) {
            state.gen--;
            updateUI();
        }
    };

    document.getElementById('restartGen').onclick = () => {
        if (state.playing) {
            clearInterval(state.interval);
            state.playing = false;
            document.getElementById('playPause').classList.remove('playing');
            document.getElementById('playPause').textContent = '▶';
        }
        state.grid = copy(state.orig);
        state.gen = 0;
        renderGrid({ pattern: state.grid });
        updateUI();
    };

    document.getElementById('clearGrid').onclick = () => {
        if (!confirm('Clear grid?')) return;
        if (!confirm('Are you sure?')) return;
        
        saveUndo();
        for (let r = 0; r < state.grid.length; r++) state.grid[r].fill(0);
        state.gen = 0;
        renderGrid({ pattern: state.grid });
        updateUI();
        updateTime();
        state.orig = copy(state.grid);
    };

    document.getElementById('togglePatternInfo').onclick = () => {
        const panel = document.getElementById('patternPanel');
        const btn = document.getElementById('togglePatternInfo');
        panel.classList.toggle('collapsed');
        btn.textContent = panel.classList.contains('collapsed') ? '▶' : '▼';
    };

    document.getElementById('newPattern').onclick = () => {
        saveUndo();
        for (let r = 0; r < state.grid.length; r++) state.grid[r].fill(0);
        state.gen = 0;
        renderGrid({ pattern: state.grid });
        updateUI();
        updateTime();
        state.orig = copy(state.grid);
        
        document.getElementById('patternName').value = 'Pattern';
        document.getElementById('patternDesc').value = '';
        document.getElementById('patternTags').value = '';
    };

    document.getElementById('saveBackpack').onclick = () => {
        const patternData = {
            pattern: copy(state.orig),
            title: document.getElementById('patternName').value || 'Pattern',
            description: document.getElementById('patternDesc').value || '',
            tags: document.getElementById('patternTags').value.split(',').map(t => t.trim()).filter(t => t) || [],
            timestamp: new Date().toISOString()
        };
        const key = `pattern_${Date.now()}`;
        localStorage.setItem(key, JSON.stringify(patternData));
        alert('Pattern saved to Backpack!');
    };
};

// Setup pattern info
export const setupPatternInfo = (loaded) => {
    const name = document.getElementById('patternName');
    const desc = document.getElementById('patternDesc');
    const tags = document.getElementById('patternTags');

    if (loaded.title) name.value = loaded.title;
    if (loaded.description) desc.value = loaded.description;
    if (loaded.tags) tags.value = loaded.tags.join(', ');
};

// Grid edit callback
window.onGridEdited = () => {
    state.orig = copy(state.grid);
    updateTime();
};
