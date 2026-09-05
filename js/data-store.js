/**
 * THE ACADEMIC ATLAS - HYBRID REACTIVE DATA STORE
 * Unified store delegating lightweight config to LocalStorage and media/inquiries to IndexedDB.
 */
const DB_NAME = 'AcademicAtlasDB';
const DB_VERSION = 1;

const INITIAL_DEMO_DATA = {
    profile: {
        name: "Professor Adrian Rowan",
        title: "Professor of Social Inquiry",
        department: "Department of Interdisciplinary Studies",
        institution: "Northbridge Institute",
        location: "Cambridge, MA",
        bio: "Investigating how sociotechnical infrastructures shape collective memory, public reasoning, and democratic institutional design in an automated era.",
        bio_bn: "প্রযুক্তি ও সমাজ কাঠামোর আন্তঃসম্পর্ক এবং গণমানুষের বুদ্ধিবৃত্তিক বিকাশ বিষয়ে গবেষণা ও অধ্যাপনা।",
        email: "adrian.rowan@northbridge.example.edu",
        office: "Tower Building, Room 408",
        experience: "18+ Years Active Research & Graduate Pedagogy"
    },
    hero: {
        eyebrow: "SAMPLE CONTENT - FICTIONAL DEMO PROFILE",
        statement: "I study questions that refuse simple answers.",
        stat1_val: "18+", stat1_lbl: "Years in Academia",
        stat2_val: "47",  stat2_lbl: "Scholarly Publications",
        stat3_val: "12",  stat3_lbl: "Books & Monographs",
        stat4_val: "09",  stat4_lbl: "Research Verticals"
    },
    researchAreas: [
        { id: "ra-1", title: "Public Knowledge & Epistemic Trust", title_bn: "গণজ্ঞান ও জ্ঞানতাত্ত্বিক বিশ্বাস", questions: "How do algorithmic curators impact institutional faith?", visible: true, displayOrder: 1 },
        { id: "ra-2", title: "Infrastructures of Memory", title_bn: "স্মৃতির অবকাঠামো", questions: "Examining digital preservation in unstable geopolitical zones.", visible: true, displayOrder: 2 },
        { id: "ra-3", title: "Technological Governance", title_bn: "প্রযুক্তিগত শাসন", questions: "Ethical boundaries in automated administrative adjudication.", visible: true, displayOrder: 3 },
        { id: "ra-4", title: "Critical Pedagogies", title_bn: "সমালোচনামূলক শিক্ষাতত্ত্ব", questions: "Restructuring inquiry-driven graduate curricula.", visible: true, displayOrder: 4 },
        { id: "ra-5", title: "Linguistic Anthropology", title_bn: "ভাষাতাত্ত্বিক নৃবিজ্ঞান", questions: "Dialect preservation and semantic shift under algorithmic models.", visible: true, displayOrder: 5 }
    ],
    publications: [
        { id: "pub-101", title: "Algorithmic Gatekeeping in Public Sphere Transitions", authors: "Rowan, A., & Vance, H.", year: "2026", type: "JOURNAL", publisher: "Journal of Democratic Horizons", doi: "", published: true, featured: true },
        { id: "pub-102", title: "The Architecture of Epistemic Resignation", authors: "Rowan, A.", year: "2025", type: "BOOK", publisher: "Northbridge Academic Press", doi: "", published: true, featured: true },
        { id: "pub-103", title: "Subterranean Cable Politics: Materiality and Statehood", authors: "Rowan, A., Miller, P., & Santos, L.", year: "2024", type: "JOURNAL", publisher: "Geopolitical Media Review", doi: "", published: true, featured: false },
        { id: "pub-104", title: "Pedagogical Dissent: Unlearning Institutional Inertia", authors: "Rowan, A.", year: "2023", type: "CHAPTER", publisher: "Critical Education Anthology", doi: "", published: true, featured: false }
    ],
    courses: [
        { id: "crs-1", code: "SOC-801", title: "Epistemology of Networked Knowledge", level: "Graduate Seminar", semester: "Fall 2026", published: true },
        { id: "crs-2", code: "SOC-410", title: "Critical Infrastructure Analysis", level: "Undergraduate Core", semester: "Spring 2026", published: true }
    ],
    books: [
        { id: "bk-1", title: "The Quiet Archive", year: "2024", publisher: "Northbridge Press", published: true, description: "A treatise on institutional forgetting and memory architecture." }
    ],
    career: [
        { id: "car-1", year: "2021 — Present", position: "Full Professor & Chair of Inquiry", institution: "Northbridge Institute", displayOrder: 1 },
        { id: "car-2", year: "2015 — 2021", position: "Associate Professor of Sociology", institution: "Atlantic University Center", displayOrder: 2 },
        { id: "car-3", year: "2008 — 2015", position: "Assistant Professor & Postdoctoral Fellow", institution: "Institute for Advanced Epistemics", displayOrder: 3 }
    ],
    fieldNotes: [
        { id: "fn-1", title: "On Methodological Hesitation", date: "05 SEP 2026", category: "RESEARCH NOTE", summary: "Why swift empirical deduction often occludes the fundamental ontology of cultural artifacts.", content: "Scholarly observation requires an intentional deceleration...", published: true }
    ],
    readingList: [
        { id: "rd-1", title: "The Structural Transformation of the Public Sphere", author: "Jürgen Habermas", year: "1962", category: "BOOK", note: "Essential baseline for communication nodes." }
    ],
    gallery: [],
    inquiries: [
        { id: "inq-1", name: "Alex Morgan", email: "sample.alex@example.edu", institution: "Geneva Forum", subject: "Symposium Keynote Invitation 2027", message: "Inquiring regarding Professor Rowan's availability for the annual Epistemics plenary session.", status: "NEW", createdAt: "2026-09-04T14:22:00Z" },
        { id: "inq-2", name: "Dr. Clara Sterling", email: "sterling@oxford-sample.ac.uk", institution: "Atlantic Faculty", subject: "Collaborative Grant Pre-proposal", message: "Following up on the shared archival digitization model notes from last month's seminar.", status: "READ", createdAt: "2026-09-02T10:15:00Z" },
        { id: "inq-3", name: "K. Bhattacharya", email: "kbhatta@calcutta-research.org", institution: "Bengal Institute", subject: "Translation Rights: Epistemic Resignation", message: "Requesting theoretical translation licensing for academic distribution in regional seminars.", status: "REPLIED", createdAt: "2026-08-28T09:00:00Z" }
    ],
    activityLog: [
        { id: "act-1", action: "INITIALIZE", entity: "SYSTEM", description: "Academic Atlas initialized with sample demonstration collections.", timestamp: "2026-09-05T08:00:00Z" }
    ],
    theme: {
        primary: "#174A5B",
        secondary: "#D66A3D",
        accent: "#D6B45B",
        mode: "light"
    }
};

class DataStoreEngine {
    constructor() {
        this.db = null;
        this.listeners = [];
        this.init();
    }

    async init() {
        if (!localStorage.getItem('academic_atlas_init')) {
            this.seedLocalStorage();
        }
        await this.initIndexedDB();
    }

    seedLocalStorage() {
        Object.keys(INITIAL_DEMO_DATA).forEach(key => {
            if (key !== 'gallery') {
                localStorage.setItem(`atlas_${key}`, JSON.stringify(INITIAL_DEMO_DATA[key]));
            }
        });
        localStorage.setItem('academic_atlas_init', 'true');
    }

    initIndexedDB() {
        return new Promise((resolve, reject) => {
            const req = indexedDB.open(DB_NAME, DB_VERSION);
            req.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains('media_store')) {
                    db.createObjectStore('media_store', { keyPath: 'id' });
                }
            };
            req.onsuccess = (e) => {
                this.db = e.target.result;
                resolve(this.db);
            };
            req.onerror = () => reject(req.error);
        });
    }

    get(collection) {
        const item = localStorage.getItem(`atlas_${collection}`);
        try {
            return item ? JSON.parse(item) : null;
        } catch {
            return null;
        }
    }

    getAll(collection) {
        const res = this.get(collection);
        return Array.isArray(res) ? res : [];
    }

    save(collection, data) {
        localStorage.setItem(`atlas_${collection}`, JSON.stringify(data));
        this.notify(collection, data);
    }

    addItem(collection, item) {
        const list = this.getAll(collection);
        if (!item.id) item.id = 'id-' + Date.now();
        item.createdAt = new Date().toISOString();
        item.updatedAt = item.createdAt;
        list.unshift(item);
        this.save(collection, list);
        this.logActivity('ADD', collection, `Added record ID: ${item.id}`);
        return item;
    }

    updateItem(collection, id, patch) {
        let list = this.getAll(collection);
        const idx = list.findIndex(x => x.id === id);
        if (idx !== -1) {
            list[idx] = { ...list[idx], ...patch, updatedAt: new Date().toISOString() };
            this.save(collection, list);
            this.logActivity('UPDATE', collection, `Updated record ID: ${id}`);
            return list[idx];
        }
        return null;
    }

    deleteItem(collection, id) {
        let list = this.getAll(collection);
        list = list.filter(x => x.id !== id);
        this.save(collection, list);
        this.logActivity('DELETE', collection, `Removed record ID: ${id}`);
    }

    logActivity(action, entity, description) {
        const logs = this.getAll('activityLog');
        const entry = {
            id: 'log-' + Date.now(),
            action,
            entity,
            description,
            timestamp: new Date().toISOString()
        };
        logs.unshift(entry);
        if (logs.length > 250) logs.pop();
        this.save('activityLog', logs);
    }

    subscribe(fn) {
        this.listeners.push(fn);
    }

    notify(collection, data) {
        this.listeners.forEach(fn => fn(collection, data));
    }

    resetDemoContent() {
        this.seedLocalStorage();
        this.logActivity('RESET', 'SYSTEM', 'Reset all content to original demo state.');
        return true;
    }
}

window.Store = new DataStoreEngine();

// Immutable Developer Protection Configuration
window.PROTECTED_CONFIG = Object.freeze({
    developerName: "Jainal Abedin",
    developerCompany: "Dream Career IT BD",
    developerProfile: "https://dcitbd.github.io/Jainal-Abedin/",
    services: "Web Design & Development | IT & Digital Services"
});