document.addEventListener('DOMContentLoaded', () => {
    const powerSwitch = document.getElementById('power-switch');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const filterCards = document.querySelectorAll('.filter-card');
    const intensitySlider = document.getElementById('intensity-slider');
    const intensityVal = document.getElementById('intensity-val');
    const subheadingText = document.getElementById('subheading-text');
    const gridLabel = document.getElementById('grid-label');
    const body = document.body;

    // Load state from chrome.storage.local
    chrome.storage.local.get(['mode', 'filterType', 'intensity', 'enabled'], (res) => {
        const mode = res.mode || 'assist';
        const filterType = res.filterType || 'protanopia';
        const intensity = res.intensity !== undefined ? res.intensity : 100;
        const enabled = res.enabled !== undefined ? res.enabled : false;

        updateUI({ mode, filterType, intensity, enabled });
    });

    // Listen for storage changes from background or shortcuts
    chrome.storage.onChanged.addListener((changes, area) => {
        if (area === 'local') {
            chrome.storage.local.get(['mode', 'filterType', 'intensity', 'enabled'], (res) => {
                updateUI(res);
            });
        }
    });

    // Power switch toggle
    powerSwitch.addEventListener('change', (e) => {
        const enabled = e.target.checked;
        chrome.storage.local.set({ enabled });
    });

    // Mode tab click
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const mode = btn.getAttribute('data-mode');
            chrome.storage.local.set({ mode, enabled: true });
        });
    });

    // Filter card select
    filterCards.forEach(card => {
        card.addEventListener('click', () => {
            const filterType = card.getAttribute('data-type');
            chrome.storage.local.set({ filterType, enabled: true });
        });
    });

    // Intensity slider input
    intensitySlider.addEventListener('input', (e) => {
        const intensity = parseInt(e.target.value, 10);
        intensityVal.textContent = `${intensity}%`;
    });

    intensitySlider.addEventListener('change', (e) => {
        const intensity = parseInt(e.target.value, 10);
        chrome.storage.local.set({ intensity });
    });

    // Update Popup UI representation
    function updateUI(state) {
        const { mode, filterType, intensity, enabled } = state;

        // Set Power Switch
        powerSwitch.checked = enabled;

        // Set Body Mode attribute
        body.setAttribute('data-active-mode', mode);

        // Update Subheading & Grid label
        if (mode === 'assist') {
            subheadingText.textContent = 'Color Vision Assistant';
            gridLabel.textContent = 'Select Assistance Filter';
        } else {
            subheadingText.textContent = 'CVD Vision Simulator';
            gridLabel.textContent = 'Select Simulation Filter';
        }

        // Active Tab Button
        tabBtns.forEach(btn => {
            if (btn.getAttribute('data-mode') === mode) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Active Filter Card
        filterCards.forEach(card => {
            if (card.getAttribute('data-type') === filterType) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });

        // Intensity slider
        intensitySlider.value = intensity;
        intensityVal.textContent = `${intensity}%`;
    }
});
