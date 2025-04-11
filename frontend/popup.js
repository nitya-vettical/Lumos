//uses chrome.scripting.executeScript API to inject JavaScript into the page.
//An event listener is a programming construct that allows you to execute a specific piece of code in response 
// to a particular event occurring in the browser.

document.getElementById("protanopia").addEventListener("click", () => { applyFilter("protanopia"); });
document.getElementById("deuteranopia").addEventListener("click", () => { applyFilter("deuteranopia"); });
document.getElementById("tritanopia").addEventListener("click", () => { applyFilter("tritanopia"); });
document.getElementById("reset").addEventListener("click", resetFilter);

function applyFilter(filter) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: (filter) => {
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
                    document.body.style.filter = `url(#${filter})`;
                },
                args: [filter]
            });
        }
    });
}

function resetFilter() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            let tab = tabs[0];
            if (tab.url.startsWith("chrome://") || tab.url.startsWith("https://chrome.google.com/webstore")) {
                console.error("Cannot modify a chrome:// URL or the Chrome Web Store.");
                return;
            }

            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: removeFilter
            }, () => {
                if (chrome.runtime.lastError) {
                    console.error("Error in resetFilter:", chrome.runtime.lastError.message);
                } else {
                    console.log("Filter reset successfully.");
                }
            });
        } else {
            console.error("No active tab found.");
        }
    });
}

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
    injectSVGFilters(); // Ensure SVG filters are added to the DOM
    document.body.style.filter = `url(#${filter})`; // Dynamically apply the filter
}

function removeFilter() {
    document.body.style.filter = ""; // Reset the filter
}





