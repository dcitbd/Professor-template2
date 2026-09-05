Markdown# THE ACADEMIC ATLAS
> **An Intellectual Map of Research, Teaching, Ideas & Academic Life**  
> *A Bespoke Scholar Personal Environment, Research Observatory & Browser-Native CMS*

---

## 01. PROJECT OVERVIEW
**The Academic Atlas** is an architectural academic personal web platform, intellectual archive, research observatory, and browser-native frontend Content Management System (CMS). Tailored specifically for scholars, researchers, and professors, it rejects generic university directory templates, corporate portfolios, and static CV designs.

Instead, the Atlas models a scholar's intellectual sphere as an interconnected digital ecosystem. Research verticals, peer-reviewed publications, pedagogical frameworks, tenure appointments, field reflections, and community inquiries are treated not as disparate lists, but as a living topological knowledge graph.

---

## 02. PROTECTED DEVELOPER BRANDING
The engineering integrity and attribution configuration of this application are permanently sealed inside `window.PROTECTED_CONFIG`. This identity is strictly decoupled from editable CMS collections and is hardcoded to survive runtime data mutations, complete database resets, JSON backups, imports, and CSS design system overrides.

* **Development Firm:** Dream Career IT BD
* **Corporate Profile:** An IT & Digital Development Company
* **Lead Architect & Engineer:** Jainal Abedin
* **Developer Portfolio & Profile:** [https://dcitbd.github.io/Jainal-Abedin/](https://dcitbd.github.io/Jainal-Abedin/)
* **Core Competencies & Services:**
  * Web Design & Bespoke Frontend Architecture
  * Graphic Design & Editorial Typography
  * Digital Marketing & Search Strategy
  * Advanced Computer Training & Pedagogy
  * E-Commerce Support & Storefront Systems
  * IT & Digital Solutions

```javascript
// Immutable System Attribution Guard (Native JS Runtime)
const PROTECTED_CONFIG = Object.freeze({
    developerName: "Jainal Abedin",
    developerCompany: "Dream Career IT BD",
    developerProfile: "[https://dcitbd.github.io/Jainal-Abedin/](https://dcitbd.github.io/Jainal-Abedin/)",
    services: "Web Design & Development | IT & Digital Services"
});
03. HONEST ARCHITECTURE & STATIC LIMITATIONSThe Academic Atlas is a 100% static, client-side web application. It deliberately operates without server-side runtimes, Node.js compilation steps, build tools, or remote database services.+-------------------------------------------------------------------------+
|                            MODERN WEB BROWSER                           |
+------------------------------------+------------------------------------+
|            PUBLIC ATLAS            |           COMMAND CENTER           |
|            (index.html)            |            (admin.html)            |
+------------------------------------+------------------------------------+
                  |                                    |
     Reads Store & Hydrates UI                Direct Reactive Mutations
                  |                                    |
                  +-----------------+------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|                  CENTRAL DATA STORE (js/data-store.js)                  |
+------------------------------------+------------------------------------+
|        LOCALSTORAGE LAYER          |          INDEXEDDB LAYER           |
|  - Profile, Bio, & Hero Settings   |  - Dispatch Inquiry Transmissions  |
|  - Publications, Books, & Articles |  - High-Volume Field Journal Media |
|  - Curricula & Teaching Frameworks |  - Binary Media & Uploaded PDFs    |
|  - Custom CSS Token Configurations |  - Unabridged System Audit Trails  |
+------------------------------------+------------------------------------+
Critical Operational RealitiesBrowser-Native Persistence: All data operations write directly to the user's browser storage (LocalStorage and IndexedDB). Content updated in one browser profile will not automatically replicate to another device or browser session without performing an export/import via the Backup Center.Authentication Boundary: Administrative authentication (admin / ChangeMe123!) relies on client-side session tokens in sessionStorage. This gate is engineered for staging, demonstration, and personal static hosting. It is not designed to guard classified or private data against browser console manipulation.Dispatch & Mail Delivery: The public conversation form does not invoke an external SMTP relay or background mail daemon. Messages are logged locally to IndexedDB, routed directly to the internal Inquiry Center, and provide pre-formatted mailto: fallbacks for direct correspondence.04. ABSOLUTE TECHNOLOGY SPECIFICATIONSThe codebase uses only standard, browser-native platform technologies:Markup: Semantic HTML5 with complete ARIA role scaffoldingStyling: CSS3 Custom Properties (Variables), Flexbox, CSS Grid, and responsive viewports (320px to 1920px)Typography: Space Grotesk (sans-serif data/interface anchor) and Cormorant Garamond (editorial serif reading) via Google FontsIconography: Bootstrap Icons (v1.11.3)Scripting Runtime: Vanilla JavaScript (ES6+), zero compilation dependencies or external package managersStorage Engines: HTML5 LocalStorage API and IndexedDB transactional object storesGraphics: HTML5 Canvas API for topological network maps05. REPOSITORY DIRECTORY STRUCTUREPlaintextacademic-atlas/
│
├── index.html                  # Public Academic Atlas & Knowledge Observatory
├── login.html                  # Architectural Gate & Authentication Portal
├── admin.html                  # Academic Command Center & Universal CMS Engine
├── README.md                   # Operational, Architectural & System Manual
├── robots.txt                  # Search Engine Protocol File
├── sitemap.xml                 # Search Index XML Map
│
├── assets/
│   ├── images/                 # Scholar Portraits, Figures & Publication Media
│   ├── icons/                  # SVG Vectors & Identity Marks
│   └── documents/              # Sample Academic CV & Research Preprints (PDF)
│
├── css/
│   ├── style.css               # Core Variables, Layout, Typography, & Visual System
│   ├── responsive.css          # Device Breakpoints (320px to 1920px) & Print Styles
│   ├── components.css          # Visual Cards, Modals, Index Rows, Node Canvas & Readers
│   └── admin.css               # Command Center Layout, Data Tables, & Status Tints
│
└── js/
    ├── app.js                  # Global Application Bootstrapper & Lifecycle Initializer
    ├── data-store.js           # Reactive Storage Layer (LocalStorage + IndexedDB Engine)
    ├── auth.js                 # Session State, Timeout Guards & Access Control Logic
    ├── cms.js                  # Universal CrudManager, TableManager & Form Controllers
    ├── admin.js                # Command Center Module Handlers & Analytics
    ├── public-site.js          # Public Page Renderer, Dynamic Hydration & Readers
    ├── theme.js                # Atlas Design Engine, Live Variable Sync & Dark Mode
    ├── language.js             # Dual-Language Translation & Fallback Engine (EN / BN)
    ├── animations.js           # Interactive Canvas Graph, Node Visualizer & Counters
    ├── validation.js           # Input Guards, Sanitization & Safe Scheme Assertions
    ├── backup.js               # JSON Schema Validation, Export, Restore & Reset Engine
    ├── search.js               # Grouped Search Engine with Keyboard Shortcut (Ctrl+K / /)
    └── gallery.js              # Media Observatory Lightbox & Focus Trap System
06. COMPREHENSIVE DATA DICTIONARY & SCHEMA+------------------+     +-------------------+     +------------------+
|  researchAreas   |     |   publications    |     |     courses      |
+------------------+     +-------------------+     +------------------+
| id (PK)          |     | id (PK)           |     | id (PK)          |
| title            |     | title             |     | code             |
| title_bn         |     | authors           |     | title            |
| questions        |     | year              |     | level            |
| themes           |     | type (ENUM)       |     | semester         |
| visible (BOOL)   |     | publisher         |     | published (BOOL) |
+--------+---------+     | published (BOOL)  |     +--------+---------+
         |               +---------+---------+              |
         |                         |                        |
         +--------------------+    |    +-------------------+
                              |    |    |
                              v    v    v
                       +----------------------+
                       |     activityLog      |
                       +----------------------+
                       | id (PK)              |
                       | action (ENUM)        |
                       | entity (STRING)      |
                       | timestamp (ISO 8601) |
                       +----------------------+
Collection NameStorage EnginePrimary Keys & Key Field AttributesprofileLocalStoragename, title, department, institution, location, bio, bio_bn, email, office, experienceheroLocalStorageeyebrow, statement, stat1_val..stat4_val, stat1_lbl..stat4_lblresearchAreasLocalStorageid, title, title_bn, questions, themes (array), visible (bool), displayOrder (int)publicationsLocalStorageid, title, authors, year, type (JOURNAL|BOOK|CHAPTER|CONFERENCE), publisher, doi, abstract, published (bool), featured (bool)coursesLocalStorageid, code, title, title_bn, level, semester, overview, resources (array), published (bool)booksLocalStorageid, title, year, publisher, isbn, description, cover, published (bool)careerLocalStorageid, year, position, institution, department, description, displayOrder (int)fieldNotesLocalStorageid, title, title_bn, date, category, summary, content, readingTime, published (bool)readingListLocalStorageid, title, author, year, category (BOOK|PAPER|ESSAY), note, urlinquiriesIndexedDBid, name, email, institution, subject, message, status (NEW|READ|REPLIED|ARCHIVED|SPAM), createdAtactivityLogLocalStorageid, action, entity, description, timestamp07. STATUS COLOR ARCHITECTURE (INQUIRY & MESSAGE CENTER)In keeping with an editorial and museum aesthetic, status updates avoid bright or aggressive neon tones. The system uses low-opacity, accessible tints across data rows, badges, summary cards, and off-canvas detail drawers:NEW (.status-new): Attention gold/amber tint (rgba(214, 180, 91, 0.12)). Highlights unread incoming transmissions requiring scholar review.READ (.status-read): Neutral architectural slate tint (rgba(115, 120, 123, 0.12)). Signifies an opened inquiry under review.REPLIED (.status-replied): Positive sage/forest tint (rgba(46, 164, 79, 0.12)). Confirms completion of academic communication via the mail client.ARCHIVED (.status-archived): Low-contrast steel tint (rgba(84, 91, 100, 0.08)). Historical records kept for long-term reference.SPAM (.status-spam): Warning crimson tint (rgba(218, 54, 51, 0.12)). Flags automated or irrelevant submissions.08. STEP-BY-STEP OPERATIONAL RUNBOOKLocal Development & ReviewClone or extract the repository files:Bashgit clone [https://github.com/dcitbd/academic-atlas.git](https://github.com/dcitbd/academic-atlas.git)
cd academic-atlas
Start a lightweight static server (recommended for IndexedDB and modern browser security settings):Bash# Python 3
python3 -m http.server 8000

# Alternatively, Node's npx (no install required)
npx serve .
Open http://localhost:8000 in any modern web browser.(The application can also be launched by double-clicking index.html directly).Command Center AuthenticationClick the security lock icon in the main navigation or visit /login.html.Enter the demonstration credentials:Username: adminPassword: ChangeMe123!Once authenticated, a session token is generated in sessionStorage, unlocking access to /admin.html.Global Search & Command BarPress Ctrl + K or / on any screen to open the global search modal.The search index queries across publications, research verticals, field notes, and courses in real time without refreshing the page.09. STATIC HOSTING & DEPLOYMENT GUIDEGitHub Pages DeploymentPush the code to a repository on GitHub.In your repository, go to Settings → Pages.Under Build and deployment → Source, choose Deploy from a branch.Select your branch (e.g., main or master) and folder /(root), then click Save.Your Academic Atlas will be live at https://<username>.github.io/<repo>/.Netlify DeploymentLog in to your Netlify dashboard and click Add new site → Deploy manually.Drag and drop the academic-atlas project directory into the deployment target.Your site will deploy instantly with HTTPS enabled.Vercel DeploymentImport the repository into the Vercel dashboard.Select Other as the Framework Preset.Keep the default root directory and deploy.10. BACKUP, SCHEMA VALIDATION & SYSTEM RESETExporting JSON ArchivesFrom the Command Center, select Design & Settings → Backup & Restore and click Export JSON Backup. The system creates an archival JSON export stamped with validation metadata:JSON{
  "metadata": {
    "version": "1.0",
    "schema": "AcademicAtlasBackup",
    "exportedAt": "2026-09-05T08:00:00.000Z"
  },
  "data": {
    "profile": { },
    "hero": { },
    "researchAreas": [ ],
    "publications": [ ],
    "courses": [ ]
  }
}
Import & Schema VerificationWhen restoring from an uploaded JSON file, js/backup.js enforces strict integrity checks:Confirms the file contains valid JSON syntax.Ensures both metadata and data root keys are present.Matches the "AcademicAtlasBackup" schema signature.Verifies critical data collections (profile, hero, researchAreas, publications).Malformed or tampered backup files are rejected with a descriptive on-screen notification, protecting local storage from corruption.Reverting to Baseline Demo ContentClicking Reset Demo Content restores the default sample data for Professor Adrian Rowan. This resets modified research, teaching, and publication entries without affecting or removing the hardcoded Dream Career IT BD developer attribution.11. PRODUCTION SECURITY NOTICEPlaintext================================================================================
IMPORTANT SECURITY DISCLOSURE & BEST PRACTICES
================================================================================
The Academic Atlas uses browser-based authentication and client-side storage
engines (LocalStorage & IndexedDB). It is intended for static portfolios, live
demonstrations, personal research archives, and local usage.

Frontend-only session tokens are NOT suitable for protecting confidential,
proprietary, or legally sensitive records against browser-level inspection.

To adapt this architecture for enterprise or multi-user production environments:
1. Replace js/auth.js with secure, server-side authentication (e.g., JWT over HTTPS
   with HttpOnly cookies).
2. Direct CRUD calls in js/data-store.js to a REST or GraphQL API backed by a
   relational database (e.g., PostgreSQL).
3. Connect the contact form to a server-side mail transport agent (SMTP) with
   rate limiting and CAPTCHA validation.
================================================================================
