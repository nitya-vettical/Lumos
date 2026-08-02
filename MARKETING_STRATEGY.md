# Lumos User Acquisition & Marketing Strategy

An actionable, step-by-step blueprint to take **Lumos** from launch to its first 1,000+ active users across colorblind communities, web developers, and accessibility advocates.

---

## 1. Chrome Web Store Optimization (Store SEO)

The Chrome Web Store search engine indexes titles, short descriptions, long descriptions, and tags. Optimizing these fields is essential for organic discovery.

### A. Listing Metadata
* **Title**: `Lumos - Colorblindness Assistant & Vision Simulator`
* **Short Description (Max 132 chars)**: `Real-time Daltonization color contrast assistance for colorblind users and WCAG accessibility simulation for web developers.`
* **Category**: `Accessibility` or `Developer Tools`

### B. High-Volume Search Keywords to Target
* `colorblind Chrome extension`
* `daltonization filter`
* `protanopia color correction`
* `deuteranopia assistant`
* `WCAG color vision simulator`
* `accessibility contrast tool`

### C. Recommended Store Long Description Template
```markdown
Lumos is a fast, modern, GPU-accelerated Chrome Extension designed to assist colorblind individuals with real-time Daltonization contrast correction, while empowering web developers and designers to test WCAG accessibility.

🌟 KEY FEATURES

✨ ASSISTANCE MODE (FOR COLORBLIND USERS)
Uses mathematical linear Daltonization algorithms (Fidaner/Anagnostopoulos models) to shift indistinguishable red/green color ranges into distinguishable blue/yellow contrast dimensions.
• Protanopia (Red-Cone Deficiency)
• Deuteranopia (Green-Cone Deficiency)
• Tritanopia (Blue-Cone Deficiency)
• Achromatopsia (Grayscale Contrast)

👁️ SIMULATION MODE (FOR DESIGNERS & DEVELOPERS)
Accurately simulates Color Vision Deficiencies (CVD) directly in your browser tab so you can audit contrast compliance, status badges, charts, and maps.

⚡ LIGHTWEIGHT & INSTANT SYNC
• Zero page load overhead using Manifest V3 document_start SVG matrix injection.
• Automatic cross-tab synchronization: settings apply across all tabs instantly.
• 0% to 100% intensity slider to customize contrast enhancement.
• Global keyboard shortcut: Alt + Shift + L to toggle on/off.

🔒 100% PRIVATE & OPEN SOURCE
Lumos operates strictly inside your browser. No web traffic, data, or history is ever collected or transmitted.
```

### D. Screenshot Guidelines (1280x800 px)
Create 4 sleek marketing screenshots:
1. **Slide 1**: Extension popup showing **Assist Mode** active with vibrant glowing badges.
2. **Slide 2**: Split-screen showing an unassisted webpage vs. Lumos Daltonized contrast enhancement.
3. **Slide 3**: **Simulation Mode** demonstrating how developers can audit charts and UI badges.
4. **Slide 4**: Key features highlight (0ms overhead, instant cross-tab sync, keyboard hotkeys).

---

## 2. Community Launch Playbook

### Phase 1: Reddit Launch (Targeted Communities)
Reddit is the single highest-converting platform for early Chrome extension users.

#### Community 1: `r/colorblind` (~35,000 members)
* **Goal**: Get direct feedback from colorblind individuals.
* **Post Title**: `I built a free, open-source Chrome extension (Lumos) that uses SVG Daltonization matrices to boost web color contrast. Would love your feedback!`
* **Post Angle**: Frame as a passion project built to solve real web contrast issues. Ask users to test it on complex websites (like subway maps or financial charts) and share feedback.

#### Community 2: `r/webdev` & `r/frontend` (~2.5M members)
* **Goal**: Acquire web developer users testing WCAG compliance.
* **Post Title**: `Showcase: Lumos — An open-source Chrome MV3 extension for instant colorblindness simulation & Daltonization`
* **Post Angle**: Focus on the technical implementation (MV3 content script injection at `document_start`, linear matrix transformations, `chrome.storage.onChanged` zero-reload sync).

#### Community 3: `r/chromeextensions` & `r/SideProject`
* **Goal**: Gain initial upvotes, reviews, and star count on GitHub.

---

### Phase 2: Product Hunt & Show HN Launch

#### A. Product Hunt Checklist
* **Tagline**: `Real-time colorblindness assistance & vision simulator for the web`
* **Maker Comment**: Explain why you created Lumos, the mathematics behind Daltonization, and how it serves both colorblind users and web developers.
* **Launch Timing**: Schedule for Tuesday at 00:01 AM PST for maximum visibility.

#### B. Hacker News (`Show HN`)
* **Title**: `Show HN: Lumos – Open-Source MV3 Chrome extension for real-time SVG color Daltonization`
* **Content**: Keep it technical. Discuss linear RGB vs sRGB color interpolation, SVG `<feColorMatrix>` performance, and cross-tab service worker sync.

---

## 3. Outreach & Directory Submissions

### A. Accessibility Organizations & Directories
Submit Lumos to featured accessibility resource indexes:
1. **We Are Colorblind** ([wearecolorblind.com](https://wearecolorblind.com/resources/))
2. **Colour Blind Awareness UK** ([colourblindawareness.org](https://www.colourblindawareness.org/))
3. **W3C Web Accessibility Initiative (WAI)**
4. **A11y Project Resources**

### B. Tech Bloggers & Accessibility Advocates Outreach
Send concise outreach messages to accessibility writers, UX design bloggers, and developer newsletters (e.g., *JavaScript Weekly*, *CSS-Tricks*, *Smashing Magazine*):

> **Subject**: Lumos – Free Open-Source Chrome Extension for Colorblindness & WCAG Testing
>
> Hi [Name],
>
> I noticed your articles on web accessibility and wanted to share a tool I recently released called **Lumos**.
>
> It’s a free, open-source Chrome extension that does two things:
> 1. Uses mathematical Daltonization matrices to shift problem colors into visible contrast ranges for colorblind users.
> 2. Provides real-time CVD simulation for web developers testing WCAG compliance.
>
> You can try the interactive demo live without installing at [Landing Page URL] or view the code on GitHub: https://github.com/nitya-vettical/Lumos
>
> Would love to hear your thoughts!

---

## 4. Growth Roadmap & Action Checklist

- [ ] **Week 1**: Publish updated Lumos v1.1 package to Chrome Web Store developer dashboard.
- [ ] **Week 1**: Deploy the interactive landing page (`/landing`) to GitHub Pages or Vercel.
- [ ] **Week 2**: Post launch threads on `r/colorblind`, `r/webdev`, and `r/chromeextensions`.
- [ ] **Week 3**: Launch on Product Hunt and Show HN.
- [ ] **Week 4**: Reach out to 10+ web accessibility advocates & colorblindness resource directories.
