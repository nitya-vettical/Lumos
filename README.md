# Lumos - Intelligent Colorblindness Assistant & Vision Simulator

> A modern, GPU-accelerated Chrome Extension (Manifest V3) designed to assist colorblind individuals with real-time Daltonization contrast correction, while empowering web developers and UX designers to test WCAG accessibility.

---

## 🌟 Key Features

*   **✨ Dual Modes (Assistance vs. Simulation):**
    *   **Assistance Mode (Daltonization):** Uses mathematically derived linear matrix transformations (Fidaner/Anagnostopoulos model) to shift indistinguishable red/green color ranges into visible blue/yellow contrast dimensions.
    *   **Simulation Mode (Auditing):** Simulates how individuals with Color Vision Deficiency (CVD) perceive web pages, enabling designers to audit charts, UI components, and WCAG compliance.
*   **⚡ Zero-Overhead Content Script Injection:** Manifest V3 content scripts execute at `document_start` to apply GPU-accelerated SVG `<feColorMatrix>` definitions with zero layout jank or load-time delay.
*   **🔄 Automatic Cross-Tab Storage Sync:** Instant state synchronization across all open tabs via `chrome.storage.onChanged` without requiring page reloads.
*   **🎛️ 0% - 100% Intensity Control:** Fine-tune matrix weight parameters to match mild, moderate, or severe degrees of color deficiency.
*   **🏷️ Extension Toolbar Action Badges:** Real-time visual indicator (`PRO`, `DEU`, `TRIT`, `GRAY`) displayed on the extension icon.
*   **⌨️ Global Hotkeys:** Toggle Lumos filters on/off anywhere on the web using `Alt + Shift + L`.
*   **🖥️ Interactive Web Landing Page (`/landing`):** Features an in-browser sandbox demo allowing prospective users to test filters on a sample dashboard.
*   **🛡️ 100% Private & Open Source:** Operates entirely client-side. No tracking, telemetry, or user data ever leaves the browser.

---

## 🛠️ Project Structure

```
Lumos/
├── frontend/                 # Chrome Extension (Manifest V3) Source Code
│   ├── manifest.json         # MV3 manifest definition & shortcuts
│   ├── background.js         # Service worker handling storage sync & badges
│   ├── content.js            # Early DOM SVG filter injection & matrix engine
│   ├── popup.html            # Glassmorphic extension popup UI
│   ├── popup.js              # State manager & popup controls
│   ├── icon16.png            # Extension toolbar icons
│   ├── icon48.png
│   └── icon128.png
├── landing/                  # Web App & Live Interactive Demo
│   ├── index.html            # Landing page with hero & sandbox demo
│   ├── style.css             # Glassmorphic styling system
│   └── app.js                # Interactive sandbox filter controls
├── MARKETING_STRATEGY.md     # Go-To-Market blueprint, Store SEO & Launch playbook
└── README.md                 # Project documentation
```

---

## 🚀 Installation & Developer Setup

### 1. Chrome Extension (Developer Mode)

1. Clone or download this repository:
   ```bash
   git clone https://github.com/nitya-vettical/Lumos.git
   ```
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** via the toggle switch in the top right corner.
4. Click **Load unpacked** and select the `frontend` folder from this repository.
5. Pin **Lumos** to your Chrome toolbar and click the icon to open the controls!

### 2. Interactive Web Landing Page

To test the landing page and live interactive demo locally:
```bash
npx -y serve landing -p 3000
```
Then open `http://localhost:3000` in your web browser.

---

## 🎹 Keyboard Shortcuts

| Shortcut | Description |
| :--- | :--- |
| `Alt + Shift + L` | Toggle active color filter ON / OFF |
| `Ctrl + Shift + L` (`Cmd + Shift + L` on Mac) | Open Lumos Extension Popup |

---

## 📈 Marketing & User Acquisition Strategy

See [`MARKETING_STRATEGY.md`](MARKETING_STRATEGY.md) for a comprehensive guide on:
- Chrome Web Store SEO optimization (Keywords, metadata, screenshot guidelines).
- Reddit community launch templates (`r/colorblind`, `r/webdev`, `r/chromeextensions`).
- Product Hunt launch checklist & Hacker News (`Show HN`) submission blueprint.
- Outreach templates for web accessibility organizations and advocacy groups.

---

## 📚 Educational Resources & References

- [Colour Blind Awareness UK](https://www.colourblindawareness.org/education/)
- [We Are Colorblind - Design Resources](https://wearecolorblind.com/resources/)
- [W3C Web Accessibility Initiative (WAI) - WCAG 2.1 Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [Fidaner, Anagnostopoulos et al. - Color Contrast Enhancement for Dichromats](https://enchroma.com/blogs/beyond-color)

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.