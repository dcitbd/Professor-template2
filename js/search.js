/**
 * THE ACADEMIC ATLAS - UNIVERSAL SEARCH ENGINE
 * Keyboard-driven shortcut (Ctrl+K or /) with grouped categorical highlighting.
 */
const SearchEngine = {
    init() {
        this.createSearchModal();
        this.bindShortcuts();
    },

    bindShortcuts() {
        window.addEventListener('keydown', (e) => {
            if ((e.ctrlKey && e.key.toLowerCase() === 'k') || (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA')) {
                e.preventDefault();
                this.open();
            }
            if (e.key === 'Escape') {
                this.close();
            }
        });
    },

    createSearchModal() {
        const el = document.createElement('div');
        el.id = 'atlas-search-overlay';
        el.className = 'atlas-panel-overlay';
        el.innerHTML = `
            <div style="max-width: 640px; margin: 10vh auto; background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius-sm); overflow: hidden; box-shadow: 0 16px 32px rgba(0,0,0,0.12);">
                <div style="padding: 1.25rem; border-bottom: 1px solid var(--line); display: flex; align-items: center; gap: 1rem;">
                    <i class="bi bi-search" style="color: var(--muted);"></i>
                    <input type="text" id="atlas-global-search-input" placeholder="Search publications, research areas, courses, notes... (ESC to close)" style="width: 100%; border: none; outline: none; background: transparent; font-family: var(--font-sans); font-size: 0.95rem; color: var(--ink);">
                </div>
                <div id="atlas-search-results" style="max-height: 400px; overflow-y: auto; padding: 1rem;">
                    <div style="font-size: 0.8rem; color: var(--muted); text-align: center; padding: 2rem 0;">Type at least 2 characters to search across the atlas...</div>
                </div>
            </div>
        `;
        document.body.appendChild(el);

        const input = document.getElementById('atlas-global-search-input');
        input.addEventListener('input', (e) => this.query(e.target.value));
        el.addEventListener('click', (e) => {
            if (e.target === el) this.close();
        });
    },

    open() {
        const el = document.getElementById('atlas-search-overlay');
        el.classList.add('panel-active');
        const input = document.getElementById('atlas-global-search-input');
        input.value = '';
        input.focus();
    },

    close() {
        const el = document.getElementById('atlas-search-overlay');
        if (el) el.classList.remove('panel-active');
    },

    query(q) {
        const container = document.getElementById('atlas-search-results');
        if (!q || q.trim().length < 2) {
            container.innerHTML = `<div style="font-size: 0.8rem; color: var(--muted); text-align: center; padding: 2rem 0;">Type at least 2 characters to query the intellectual index...</div>`;
            return;
        }

        const term = q.toLowerCase();
        const pubs = Store.getAll('publications').filter(p => (p.title || '').toLowerCase().includes(term));
        const areas = Store.getAll('researchAreas').filter(a => (a.title || '').toLowerCase().includes(term));
        const courses = Store.getAll('courses').filter(c => (c.title || '').toLowerCase().includes(term));

        let html = '';

        if (pubs.length > 0) {
            html += `<div style="font-size: 0.7rem; letter-spacing: 0.15em; color: var(--secondary); text-transform: uppercase; margin-bottom: 0.5rem; font-weight: 700;">PUBLICATIONS (${pubs.length})</div>`;
            pubs.forEach(p => {
                html += `<div style="padding: 0.5rem 0; border-bottom: 1px solid var(--line); font-size: 0.85rem;"><a href="#publications" onclick="SearchEngine.close()">${p.title}</a> <span style="font-size: 0.7rem; color: var(--muted);">${p.year}</span></div>`;
            });
        }

        if (areas.length > 0) {
            html += `<div style="font-size: 0.7rem; letter-spacing: 0.15em; color: var(--secondary); text-transform: uppercase; margin: 1rem 0 0.5rem; font-weight: 700;">RESEARCH VERTICALS (${areas.length})</div>`;
            areas.forEach(a => {
                html += `<div style="padding: 0.5rem 0; border-bottom: 1px solid var(--line); font-size: 0.85rem;"><a href="#research" onclick="SearchEngine.close()">${a.title}</a></div>`;
            });
        }

        if (courses.length > 0) {
            html += `<div style="font-size: 0.7rem; letter-spacing: 0.15em; color: var(--secondary); text-transform: uppercase; margin: 1rem 0 0.5rem; font-weight: 700;">COURSES (${courses.length})</div>`;
            courses.forEach(c => {
                html += `<div style="padding: 0.5rem 0; border-bottom: 1px solid var(--line); font-size: 0.85rem;"><a href="#teaching" onclick="SearchEngine.close()">${c.code}: ${c.title}</a></div>`;
            });
        }

        if (!pubs.length && !areas.length && !courses.length) {
            html = `<div style="font-size: 0.8rem; color: var(--muted); text-align: center; padding: 2rem 0;">No matching intellectual records found for "${q}".</div>`;
        }

        container.innerHTML = html;
    }
};

window.SearchEngine = SearchEngine;
document.addEventListener('DOMContentLoaded', () => SearchEngine.init());