document.addEventListener('DOMContentLoaded', () => {
    // Load saved state
    chrome.storage.local.get(['activeFilter'], (result) => {
        if (result.activeFilter) {
            setActiveButton(result.activeFilter);
        }
    });
});

const filters = ["protanopia", "deuteranopia", "tritanopia", "achromatopsia"];

filters.forEach(filter => {
    const btn = document.getElementById(filter);
    if (btn) {
        btn.addEventListener("click", () => {
            applyFilter(filter);
        });
    }
});

document.getElementById("reset").addEventListener("click", resetFilter);

function setActiveButton(activeId) {
    // Remove active class from all
    filters.forEach(f => {
        const btn = document.getElementById(f);
        if (btn) btn.classList.remove("active");
    });
    // Add to active
    if (activeId && document.getElementById(activeId)) {
        document.getElementById(activeId).classList.add("active");
    }
}

function applyFilter(filter) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) return;
        let tab = tabs[0];
        
        // Cannot inject into special pages
        if (tab.url.startsWith("chrome://") || tab.url.startsWith("https://chrome.google.com/webstore")) {
            console.error("Cannot modify this URL.");
            return;
        }

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: (selectedFilter) => {
                const svgId = 'lumos-colorblind-filters';
                if (!document.getElementById(svgId)) {
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
                            <filter id="achromatopsia">
                                <feColorMatrix type="matrix" values="0.299 0.587 0.114 0 0 0.299 0.587 0.114 0 0 0.299 0.587 0.114 0 0 0 0 0 1 0" />
                            </filter>
                        </svg>
                    `;
                    const div = document.createElement('div');
                    div.id = svgId;
                    div.innerHTML = svgFilters;
                    document.body.appendChild(div);
                }
                document.documentElement.style.filter = `url(#${selectedFilter})`;
            },
            args: [filter]
        }, () => {
            if (!chrome.runtime.lastError) {
                chrome.storage.local.set({ activeFilter: filter });
                setActiveButton(filter);
            }
        });
    });
}

function resetFilter() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) return;
        let tab = tabs[0];
        
        if (tab.url.startsWith("chrome://") || tab.url.startsWith("https://chrome.google.com/webstore")) {
            return;
        }

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                document.documentElement.style.filter = "";
            }
        }, () => {
            if (!chrome.runtime.lastError) {
                chrome.storage.local.remove('activeFilter');
                setActiveButton(null);
            }
        });
    });
}
