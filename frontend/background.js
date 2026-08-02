// Lumos Extension Service Worker (MV3)

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(['mode', 'filterType', 'intensity', 'enabled'], (result) => {
    const defaults = {
      mode: result.mode || 'assist',       // 'assist' | 'simulate'
      filterType: result.filterType || 'protanopia', // 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia'
      intensity: result.intensity !== undefined ? result.intensity : 100,
      enabled: result.enabled !== undefined ? result.enabled : false
    };
    chrome.storage.local.set(defaults, () => {
      updateBadge(defaults.enabled, defaults.mode, defaults.filterType);
    });
  });
});

// Sync badge on storage changes
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local') {
    chrome.storage.local.get(['mode', 'filterType', 'enabled'], (data) => {
      updateBadge(data.enabled, data.mode, data.filterType);
    });
  }
});

// Update Extension Icon Badge
function updateBadge(enabled, mode, filterType) {
  if (!enabled || filterType === 'none') {
    chrome.action.setBadgeText({ text: '' });
    return;
  }

  const badgeMap = {
    protanopia: 'PRO',
    deuteranopia: 'DEU',
    tritanopia: 'TRIT',
    achromatopsia: 'GRAY'
  };

  const text = badgeMap[filterType] || 'ON';
  chrome.action.setBadgeText({ text });

  // Assist = Blue accent, Simulate = Orange accent
  const color = mode === 'assist' ? '#4facfe' : '#ff9f43';
  chrome.action.setBadgeBackgroundColor({ color });
}

// Handle hotkeys (e.g. Alt+Shift+L)
chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-filter') {
    chrome.storage.local.get(['enabled'], (res) => {
      const newState = !res.enabled;
      chrome.storage.local.set({ enabled: newState });
    });
  }
});
