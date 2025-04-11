function injectSVGFilters() {
    const svgFilters = `
        <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
            <filter id="protanopia">
                <feColorMatrix type="matrix" values="0.567 0.433 0 0 0 0.558 0.442 0 0 0 0 0.242 0.758 0 0 0 0 0 1 0" />
            </filter>
            <filter id="deuteranopia">
                <feColorMatrix type="matrix" values="0.625 0.375 0 0 0 0.7 0.3 0 0 0 0 0.3 0.7 0 0 0 0 0 1 0" />
            </filter>
            <filter id="tritanopia">
                <feColorMatrix type="matrix" values="0.967 0.033 0 0 0 0 0.733 0.267 0 0 0 0.183 0.817 0 0 0 0 0 1 0" />
            </filter>
        </svg>
    `;

    if (!document.getElementById('colorblind-filters')) {
        const div = document.createElement('div');
        div.id = 'colorblind-filters';
        div.innerHTML = svgFilters;
        document.body.appendChild(div);
    }
}

function setFilter(filter) {
    injectSVGFilters();
    document.body.style.filter = `url(#${filter})`;
}

