document.addEventListener('DOMContentLoaded', () => {
    const modeBtns = document.querySelectorAll('.mode-btn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const previewArea = document.getElementById('sandbox-preview');
    const activeLabel = document.getElementById('active-filter-label');

    let activeMode = 'assist';       // 'assist' | 'simulate'
    let activeFilter = 'protanopia'; // 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia' | 'none'

    // Mode Selection
    modeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeMode = btn.getAttribute('data-mode');
            updateSandboxFilter();
        });
    });

    // Filter Selection
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilter = btn.getAttribute('data-filter');
            updateSandboxFilter();
        });
    });

    function updateSandboxFilter() {
        if (activeFilter === 'none') {
            previewArea.style.filter = 'none';
            activeLabel.textContent = 'Active Filter: None (Original Unfiltered Colors)';
            activeLabel.style.color = '#94a3b8';
            return;
        }

        let filterId = '';
        let modeName = activeMode === 'assist' ? 'Assistance (Daltonized)' : 'Simulation (Audit)';
        let filterName = activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1);

        if (activeFilter === 'achromatopsia') {
            filterId = 'sandbox-achromatopsia';
            filterName = 'Grayscale';
        } else {
            filterId = `sandbox-${activeMode}-${activeFilter}`;
        }

        previewArea.style.filter = `url(#${filterId})`;
        activeLabel.textContent = `Active Filter: ${filterName} ${modeName}`;
        activeLabel.style.color = activeMode === 'assist' ? '#4facfe' : '#ff9f43';
    }

    // Initial Filter Activation
    updateSandboxFilter();
});
