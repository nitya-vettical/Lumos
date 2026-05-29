# Lumos

Lumos is a highly performant, modern Chrome Extension designed to assist users with color blindness by dynamically applying SVG color correction matrices to web pages. 

## Features

*   **Four Specialized Filters:** Includes filters for Protanopia, Deuteranopia, Tritanopia, and Achromatopsia (Grayscale).
*   **Premium Glassmorphic UI:** A sleek, modern dark-mode interface built for a superior user experience.
*   **Persistent Storage:** Remembers your active filter state across browsing sessions using `chrome.storage.local`.
*   **Zero-Overhead Injection:** Utilizes Manifest V3 `chrome.scripting` to dynamically inject highly optimized SVG filters into the DOM without slowing down page load times.

## Installation (Developer Mode)

1. Clone this repository or download the source code.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** in the top right corner.
4. Click **Load unpacked** and select the `frontend` folder from this repository.
5. Pin the extension to your toolbar and click the icon to start using it!

## Technology Stack

*   **JavaScript (ES6+)**
*   **CSS3** (Glassmorphism, Modern Layouts)
*   **HTML5**
*   **Chrome Extension API (Manifest V3)**

## Educational Resources
* [Colour Blind Awareness](https://www.colourblindawareness.org/education/)
* [EnChroma - Challenges in Education](https://enchroma.com/blogs/beyond-color/unveiling-the-hidden-challenges-of-color-blindness-in-education)
* [We Are Colorblind](https://wearecolorblind.com/resources/)