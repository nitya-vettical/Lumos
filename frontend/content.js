(function () {
  'use strict';

  const SVG_CONTAINER_ID = '__lumos_svg_filter_root__';
  const FILTER_ID = '__lumos_color_filter__';
  const MATRIX_ID = '__lumos_color_matrix__';

  // SVG Color Matrices Definition
  // Note: Values formatted for SVG feColorMatrix 4x5 space
  const MATRICES = {
    // ASSISTANCE (DALTONIZATION) MODES - Enhances contrast for colorblind vision
    assist: {
      protanopia: [
         1.00000,  0.00000,  0.00000, 0, 0,
        -0.25500,  1.25500,  0.00000, 0, 0,
         0.30300, -0.54500,  1.24200, 0, 0,
         0.00000,  0.00000,  0.00000, 1, 0
      ],
      deuteranopia: [
         1.00000,  0.00000,  0.00000, 0, 0,
        -0.43750,  1.43750,  0.00000, 0, 0,
         0.26250, -0.56250,  1.30000, 0, 0,
         0.00000,  0.00000,  0.00000, 1, 0
      ],
      tritanopia: [
         1.00000,  0.00000,  0.39700, 0, 0,
         0.00000,  1.00000,  0.36700, 0, 0,
         0.00000,  0.00000,  0.47500, 0, 0,
         0.00000,  0.00000,  0.00000, 1, 0
      ],
      achromatopsia: [
        0.2126, 0.7152, 0.0722, 0, 0,
        0.2126, 0.7152, 0.0722, 0, 0,
        0.2126, 0.7152, 0.0722, 0, 0,
        0,      0,      0,      1, 0
      ]
    },
    // SIMULATION MODES - Shows how colorblind people see web pages
    simulate: {
      protanopia: [
        0.56667, 0.43333, 0.00000, 0, 0,
        0.55833, 0.44167, 0.00000, 0, 0,
        0.00000, 0.24167, 0.75833, 0, 0,
        0.00000, 0.00000, 0.00000, 1, 0
      ],
      deuteranopia: [
        0.62500, 0.37500, 0.00000, 0, 0,
        0.70000, 0.30000, 0.00000, 0, 0,
        0.00000, 0.30000, 0.70000, 0, 0,
        0.00000, 0.00000, 0.00000, 1, 0
      ],
      tritanopia: [
        0.95000, 0.05000, 0.00000, 0, 0,
        0.00000, 0.43333, 0.56667, 0, 0,
        0.00000, 0.47500, 0.52500, 0, 0,
        0.00000, 0.00000, 0.00000, 1, 0
      ],
      achromatopsia: [
        0.29900, 0.58700, 0.11400, 0, 0,
        0.29900, 0.58700, 0.11400, 0, 0,
        0.29900, 0.58700, 0.11400, 0, 0,
        0.00000, 0.00000, 0.00000, 1, 0
      ]
    }
  };

  const IDENTITY = [
    1, 0, 0, 0, 0,
    0, 1, 0, 0, 0,
    0, 0, 1, 0, 0,
    0, 0, 0, 1, 0
  ];

  function isContextValid() {
    return typeof chrome !== 'undefined' && !!chrome.runtime?.id;
  }

  // Linear interpolation for intensity adjustment
  function interpolateMatrix(targetMatrix, intensityPercent) {
    const factor = Math.max(0, Math.min(100, intensityPercent)) / 100;
    return targetMatrix.map((val, idx) => IDENTITY[idx] + (val - IDENTITY[idx]) * factor);
  }

  function ensureFilterElement() {
    if (document.getElementById(SVG_CONTAINER_ID)) return;

    const svgNs = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNs, 'svg');
    svg.id = SVG_CONTAINER_ID;
    svg.setAttribute('style', 'position: absolute; width: 0; height: 0; overflow: hidden; pointer-events: none;');

    const filter = document.createElementNS(svgNs, 'filter');
    filter.id = FILTER_ID;
    filter.setAttribute('color-interpolation-filters', 'linearRGB');

    const feColorMatrix = document.createElementNS(svgNs, 'feColorMatrix');
    feColorMatrix.id = MATRIX_ID;
    feColorMatrix.setAttribute('type', 'matrix');

    filter.appendChild(feColorMatrix);
    svg.appendChild(filter);

    const target = document.documentElement || document.head;
    if (target) {
      target.appendChild(svg);
    }
  }

  function applyFilterState(state) {
    const { enabled, mode = 'assist', filterType = 'protanopia', intensity = 100 } = state || {};

    if (!enabled || filterType === 'none') {
      document.documentElement.style.removeProperty('filter');
      return;
    }

    ensureFilterElement();
    const matrixElem = document.getElementById(MATRIX_ID);
    if (!matrixElem) return;

    const modeMatrices = MATRICES[mode] || MATRICES.assist;
    const targetMatrix = modeMatrices[filterType] || modeMatrices.protanopia;
    const finalMatrix = interpolateMatrix(targetMatrix, intensity);

    matrixElem.setAttribute('values', finalMatrix.join(' '));
    document.documentElement.style.setProperty('filter', `url(#${FILTER_ID})`, 'important');
  }

  function syncState() {
    if (!isContextValid()) return;
    try {
      chrome.storage.local.get(['mode', 'filterType', 'intensity', 'enabled'], (res) => {
        if (!isContextValid() || chrome.runtime.lastError) return;
        applyFilterState(res);
      });
    } catch (e) {
      // Handled gracefully
    }
  }

  if (isContextValid()) {
    try {
      chrome.storage.onChanged.addListener((changes, areaName) => {
        if (areaName === 'local') {
          syncState();
        }
      });
    } catch (e) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncState, { once: true });
  }
  syncState();
})();
