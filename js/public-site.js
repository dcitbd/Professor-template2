/**
 * THE ACADEMIC ATLAS - PUBLIC PRESENTATION CONTROLLER
 * Hydrates architectural layers, handles contact forms, and powers reader modals.
 */
const PublicSite = {
    init() {
        this.hydrateAll();
        this.initContactForm();
        this.removeLoader();
    },

    removeLoader() {
        const loader = document.getElementById('atlas-loader');
        if (loader) {
            setTimeout(() => {
                loader.classList.add('loader-hidden');
            }, 550);
        }
    },

    hydrateAll() {
        this.hydrateHero();
        this.hydrateDataStrip();
        this.hydrateScholar();
        this.hydrateResearchAreas();
        this.hydratePublications();
        this.hydrateTeaching();
        this.hydrateCareer();
        this.hydrateFieldNotes();
        this.hydrateProtectedBrand();
        if (window.CanvasGraph) CanvasGraph.init('hero-canvas');
    },

    hydrateHero() {
        const h = Store.get('hero') || {};
        const p = Store.get('profile') || {};
        const eyebrowEl = document.getElementById('hero-eyebrow-target');
        const nameEl = document.getElementById('hero-name-target');
        const stmtEl = document.getElementById('hero-statement-target');

        if (eyebrowEl) eyebrowEl.textContent = h.eyebrow || 'ACADEMIC RESEARCH OBSERVATORY';
        if (nameEl) nameEl.textContent = p.name || 'Professor Adrian Rowan';
        if (stmtEl) stmtEl.textContent = `"${h.statement || 'I study questions that refuse simple answers.'}"`;
    },

    hydrateDataStrip() {
        const h = Store.get('hero') || {};
        const strip = document.getElementById('hero-data-strip');
        if (!strip) return;
        strip.innerHTML = `
            <div class="data-strip-cell"><div class="data-strip-value">${h.stat1_val || '18+'}</div><div class="data-strip-label">${h.stat1_lbl || 'Years in Academia'}</div></div>
            <div class="data-strip-cell"><div class="data-strip-value">${h.stat2_val || '47'}</div><div class="data-strip-label">${h.stat2_lbl || 'Publications'}</div></div>
            <div class="data-strip-cell"><div class="data-strip-value">${h.stat3_val || '12'}</div><div class="data-strip-label">${h.stat3_lbl || 'Books & Chapters'}</div></div>
            <div class="data-strip-cell"><div class="data-strip-value">${h.stat4_val || '09'}</div><div class="data-strip-label">${h.stat4_lbl || 'Research Verticals'}</div></div>
        `;
    },

    hydrateScholar() {
        const p = Store.get('profile') || {};
        const target = document.getElementById('scholar-bio-target');
        if (target) {
            target.innerHTML = `
                <div class="demo-watermark">SAMPLE CONTENT - DEMO SCHOLAR</div>
                <p style="font-size: 1.15rem; line-height: 1.7; margin-bottom: 1.5rem;">${LanguageEngine.t(p.bio, p.bio_bn)}</p>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; font-size: 0.85rem; border-top: 1px solid var(--line); padding-top: 1.5rem;">
                    <div><span style="color: var(--muted); display: block; text-transform: uppercase; font-size: 0.7rem; letter-spacing: 0.1em;">Institution</span>${p.institution}</div>
                    <div><span style="color: var(--muted); display: block; text-transform: uppercase; font-size: 0.7rem; letter-spacing: 0.1em;">Department</span>${p.department}</div>
                    <div><span style="color: var(--muted); display: block; text-transform: uppercase; font-size: 0.7rem; letter-spacing: 0.1em;">Office Location</span>${p.office}</div>
                    <div><span style="color: var(--muted); display: block; text-transform: uppercase; font-size: 0.7rem; letter-spacing: 0.1em;">Direct Dispatch</span>${p.email}</div>
                </div>
            `;
        }
    },

    hydrateResearchAreas() {
        const areas = Store.getAll('researchAreas').filter(a => a.visible !== false);
        const container = document.getElementById('research-nodes-container');
        if (!container) return;
        if (!areas.length) {
            container.innerHTML = '<div style="color: var(--muted); padding: 2rem 0;">NO RESEARCH AREAS DEFINED.</div>';
            return;
        }
        container.innerHTML = areas.map((a, idx) => `
            <div style="padding: 1.5rem; border: 1px solid var(--line); background: var(--surface); border-radius: var(--radius-sm);">
                <div style="font-size: 0.75rem; color: var(--secondary); font-weight: 700; margin-bottom: 0.5rem;">NODE // 0${idx + 1}</div>
                <h4 style="font-size: 1.25rem; margin-bottom: 0.75rem;">${LanguageEngine.t(a.title, a.title_bn)}</h4>
                <p style="font-size: 0.85rem; color: var(--muted);">${a.questions}</p>
            </div>
        `).join('');
    },

    hydratePublications() {
        const pubs = Store.getAll('publications').filter(p => p.published !== false);
        const container = document.getElementById('publications-list-target');
        if (!container) return;
        if (!pubs.length) {
            container.innerHTML = '<div style="color: var(--muted); padding: 2rem 0;">NO PUBLICATIONS ARCHIVED.</div>';
            return;
        }
        container.innerHTML = pubs.map((p, idx) => `
            <div class="pub-item" onclick="PublicSite.showPublicationDetail('${p.id}')">
                <div class="pub-num">00${idx + 1}</div>
                <div class="pub-type">${p.type || 'SCHOLARLY'}</div>
                <div class="pub-details">
                    <h4>${p.title}</h4>
                    <div class="pub-authors">${p.authors} &mdash; <em>${p.publisher}</em></div>
                </div>
                <div class="pub-meta-col">${p.year} &rarr;</div>
            </div>
        `).join('');
    },

    hydrateTeaching() {
        const courses = Store.getAll('courses').filter(c => c.published !== false);
        const target = document.getElementById('courses-list-target');
        if (!target) return;
        target.innerHTML = courses.map(c => `
            <div style="padding: 1.5rem; border-bottom: 1px solid var(--line); display: flex; justify-content: space-between; align-items: baseline;">
                <div>
                    <span style="font-size: 0.75rem; letter-spacing: 0.15em; color: var(--secondary); font-weight: 700;">${c.code}</span>
                    <h4 style="font-size: 1.2rem; margin-top: 0.25rem;">${c.title}</h4>
                </div>
                <div style="font-size: 0.8rem; color: var(--muted);">${c.semester} &bull; ${c.level}</div>
            </div>
        `).join('');
    },

    hydrateCareer() {
        const career = Store.getAll('career');
        const target = document.getElementById('career-path-target');
        if (!target) return;
        target.innerHTML = career.map(c => `
            <div style="display: grid; grid-template-columns: 180px 1fr; gap: 2rem; padding: 1.25rem 0; border-bottom: 1px solid var(--line);">
                <div style="font-weight: 700; font-size: 0.85rem; color: var(--secondary);">${c.year}</div>
                <div>
                    <div style="font-weight: 600;">${c.position}</div>
                    <div style="font-size: 0.85rem; color: var(--muted);">${c.institution}</div>
                </div>
            </div>
        `).join('');
    },

    hydrateFieldNotes() {
        const notes = Store.getAll('fieldNotes').filter(n => n.published !== false);
        const target = document.getElementById('field-notes-target');
        if (!target) return;
        target.innerHTML = notes.map(n => `
            <div style="padding: 2rem; border: 1px solid var(--line); background: var(--surface);">
                <div style="font-size: 0.75rem; color: var(--muted); margin-bottom: 0.5rem;">${n.date} &bull; ${n.category}</div>
                <h4 style="font-size: 1.4rem; margin-bottom: 1rem;">${n.title}</h4>
                <p style="font-size: 0.9rem; color: var(--muted); line-height: 1.6;">${n.summary}</p>
            </div>
        `).join('');
    },

    hydrateProtectedBrand() {
        const containers = document.querySelectorAll('.protected-branding-target');
        containers.forEach(el => {
            el.innerHTML = `
                <div>
                    <strong>Developed by <a href="${PROTECTED_CONFIG.developerProfile}" target="_blank" rel="noopener noreferrer">${PROTECTED_CONFIG.developerCompany}</a></strong>
                    <div style="font-size: 0.75rem; color: var(--muted); margin-top: 0.2rem;">Architect &amp; Engineer: ${PROTECTED_CONFIG.developerName} &bull; ${PROTECTED_CONFIG.services}</div>
                </div>
                <div style="font-size: 0.75rem; color: var(--muted);">
                    Frontend-Native Academic Engine &bull; Non-Server Static Execution
                </div>
            `;
        });
    },

    initContactForm() {
        const form = document.getElementById('atlas-contact-form');
        if (!form) return;
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const inst = document.getElementById('contact-institution').value.trim();
            const subj = document.getElementById('contact-subject').value.trim();
            const msg = document.getElementById('contact-message').value.trim();

            if (!name || !Validator.isEmail(email) || !subj || !msg) {
                alert("Please ensure all fields are properly completed with a valid dispatch email.");
                return;
            }

            const item = {
                id: 'inq-' + Date.now(),
                name: Validator.sanitize(name),
                email: Validator.sanitize(email),
                institution: Validator.sanitize(inst),
                subject: Validator.sanitize(subj),
                message: Validator.sanitize(msg),
                status: 'NEW',
                createdAt: new Date().toISOString()
            };

            Store.addItem('inquiries', item);
            form.reset();
            const successNotice = document.getElementById('contact-success-notice');
            if (successNotice) {
                successNotice.style.display = 'block';
                setTimeout(() => { successNotice.style.display = 'none'; }, 6000);
            }
        });
    },

    showPublicationDetail(id) {
        const pub = Store.getAll('publications').find(p => p.id === id);
        if (!pub) return;
        alert(`PUBLICATION ARCHIVE // ${pub.title}\n\nAuthors: ${pub.authors}\nPublisher: ${pub.publisher} (${pub.year})\n\n[Full metadata archived in Command Center]`);
    }
};

window.PublicSite = PublicSite;
document.addEventListener('DOMContentLoaded', () => PublicSite.init());