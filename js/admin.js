/**
 * THE ACADEMIC ATLAS - COMMAND CENTER CONTROLLER
 * Coordinates Inquiries, Analytics, Settings, and Modular Views.
 */
const AdminApp = {
    activeTab: 'dashboard',

    init() {
        Auth.protectRoute();
        this.bindNavigation();
        this.renderActiveTab();
        this.updateInboxCount();
    },

    updateInboxCount() {
        const inqs = Store.getAll('inquiries').filter(i => i.status === 'NEW');
        const badge = document.getElementById('admin-inbox-counter');
        if (badge) badge.textContent = `INBOX ${inqs.length.toString().padStart(2, '0')}`;
    },

    bindNavigation() {
        document.querySelectorAll('[data-admin-view]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('[data-admin-view]').forEach(el => el.classList.remove('active'));
                link.classList.add('active');
                this.activeTab = link.getAttribute('data-admin-view');
                this.renderActiveTab();
            });
        });
    },

    refreshActiveTab() {
        this.renderActiveTab();
        this.updateInboxCount();
    },

    renderActiveTab() {
        const container = document.getElementById('admin-dynamic-content');
        if (!container) return;

        switch (this.activeTab) {
            case 'dashboard':
                this.renderDashboard(container);
                break;
            case 'inquiries':
                this.renderInquiries(container);
                break;
            case 'publications':
                this.renderPublications(container);
                break;
            case 'research':
                this.renderResearch(container);
                break;
            case 'settings':
                this.renderSettings(container);
                break;
            case 'activity':
                this.renderActivity(container);
                break;
            default:
                container.innerHTML = `<div style="padding: 2rem; color: #73787b;">MODULE // ${this.activeTab.toUpperCase()} ACTIVE</div>`;
        }
    },

    renderDashboard(container) {
        const pubs = Store.getAll('publications');
        const inqs = Store.getAll('inquiries');
        const areas = Store.getAll('researchAreas');
        const notes = Store.getAll('fieldNotes');

        container.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-bottom: 2.5rem;">
                <div style="background: #14171a; border: 1px solid rgba(255,255,255,0.08); padding: 1.5rem;">
                    <div style="font-size: 0.75rem; color: #73787b; text-transform: uppercase;">Publications</div>
                    <div style="font-size: 2.5rem; font-weight: 700; margin-top: 0.5rem; color: #ffffff;">${pubs.length}</div>
                </div>
                <div style="background: #14171a; border: 1px solid rgba(255,255,255,0.08); padding: 1.5rem;">
                    <div style="font-size: 0.75rem; color: #73787b; text-transform: uppercase;">Research Nodes</div>
                    <div style="font-size: 2.5rem; font-weight: 700; margin-top: 0.5rem; color: #ffffff;">${areas.length}</div>
                </div>
                <div style="background: #14171a; border: 1px solid rgba(255,255,255,0.08); padding: 1.5rem;">
                    <div style="font-size: 0.75rem; color: #73787b; text-transform: uppercase;">Field Notes</div>
                    <div style="font-size: 2.5rem; font-weight: 700; margin-top: 0.5rem; color: #ffffff;">${notes.length}</div>
                </div>
                <div style="background: #14171a; border: 1px solid rgba(255,255,255,0.08); padding: 1.5rem;">
                    <div style="font-size: 0.75rem; color: #73787b; text-transform: uppercase;">New Inquiries</div>
                    <div style="font-size: 2.5rem; font-weight: 700; margin-top: 0.5rem; color: var(--secondary);">${inqs.filter(i=>i.status==='NEW').length}</div>
                </div>
            </div>
            <div style="background: #14171a; border: 1px solid rgba(255,255,255,0.08); padding: 2rem;">
                <h3 style="font-size: 1.1rem; margin-bottom: 1.5rem; font-family: var(--font-sans);">RAPID ATLAS ACTIONS</h3>
                <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                    <button class="btn-atlas-primary" onclick="AdminApp.quickAddPub()">+ ADD PUBLICATION</button>
                    <button class="btn-atlas-secondary" style="border-color: rgba(255,255,255,0.2); color: #ffffff;" onclick="BackupEngine.exportData()"><i class="bi bi-download"></i> BACKUP JSON</button>
                    <button class="btn-atlas-secondary" style="border-color: rgba(218,54,51,0.4); color: #f85149;" onclick="AdminApp.handleResetDemo()">RESET DEMO DATA</button>
                </div>
            </div>
        `;
    },

    renderInquiries(container) {
        container.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                <h2 style="font-family: var(--font-sans); font-size: 1.5rem;">INQUIRY OBSERVATORY &amp; DISPATCH</h2>
            </div>
            <div id="inquiry-table-target"></div>
        `;

        CMS.renderTable({
            containerId: 'inquiry-table-target',
            collection: 'inquiries',
            columns: [
                { label: 'STATUS', field: 'status', formatter: (val, row) => `<span class="status-badge status-${val.toLowerCase()}" style="cursor: pointer;" onclick="AdminApp.cycleInquiryStatus('${row.id}', '${val}')">${val}</span>` },
                { label: 'SENDER', field: 'name', formatter: (val, row) => `<strong>${val}</strong><br><span style="font-size: 0.75rem; color: #73787b;">${row.institution || 'Independent'}</span>` },
                { label: 'SUBJECT / DISPATCH', field: 'subject', formatter: (val, row) => `<div>${val}</div><div style="font-size: 0.75rem; color: #a0a6ad; margin-top: 0.25rem;">${row.message.slice(0, 80)}...</div>` },
                { label: 'RECEIVED', field: 'createdAt', formatter: (val) => new Date(val).toLocaleDateString() }
            ]
        });
    },

    cycleInquiryStatus(id, current) {
        const map = { 'NEW': 'READ', 'READ': 'REPLIED', 'REPLIED': 'ARCHIVED', 'ARCHIVED': 'SPAM', 'SPAM': 'NEW' };
        const next = map[current] || 'READ';
        Store.updateItem('inquiries', id, { status: next });
        CMS.toast(`Inquiry status modified to ${next}`);
        this.refreshActiveTab();
    },

    renderPublications(container) {
        container.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                <h2 style="font-family: var(--font-sans); font-size: 1.5rem;">SCHOLARLY PUBLICATIONS INDEX</h2>
                <button class="btn-atlas-primary" onclick="AdminApp.quickAddPub()">+ NEW ENTRY</button>
            </div>
            <div id="publications-table-target"></div>
        `;

        CMS.renderTable({
            containerId: 'publications-table-target',
            collection: 'publications',
            columns: [
                { label: 'YEAR', field: 'year' },
                { label: 'TYPE', field: 'type' },
                { label: 'TITLE', field: 'title', formatter: (val, row) => `<strong>${val}</strong><br><span style="font-size: 0.75rem; color: #73787b;">${row.authors}</span>` },
                { label: 'PUBLISHER', field: 'publisher' }
            ]
        });
    },

    renderResearch(container) {
        container.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                <h2 style="font-family: var(--font-sans); font-size: 1.5rem;">RESEARCH VERTICALS</h2>
            </div>
            <div id="research-table-target"></div>
        `;

        CMS.renderTable({
            containerId: 'research-table-target',
            collection: 'researchAreas',
            columns: [
                { label: 'VERTICAL / TITLE', field: 'title' },
                { label: 'GUIDING QUESTIONS', field: 'questions' }
            ]
        });
    },

    renderSettings(container) {
        container.innerHTML = `
            <div style="max-width: 600px;">
                <h2 style="font-family: var(--font-sans); font-size: 1.5rem; margin-bottom: 1.5rem;">SYSTEM SETTINGS</h2>
                <div style="background: #14171a; border: 1px solid rgba(255,255,255,0.08); padding: 2rem; margin-bottom: 2rem;">
                    <h4 style="margin-bottom: 1rem; font-size: 0.9rem;">ATLAS DESIGN ENGINE</h4>
                    <label style="font-size: 0.75rem; color: #73787b; display: block; margin-bottom: 0.5rem;">PRIMARY PALETTE</label>
                    <input type="color" id="theme-primary-input" value="${Store.get('theme')?.primary || '#174A5B'}" style="width: 100%; height: 40px; border: none; background: none; cursor: pointer; margin-bottom: 1.5rem;">
                    <button class="btn-atlas-primary" onclick="AdminApp.saveThemeSettings()">APPLY PALETTE</button>
                </div>
            </div>
        `;
    },

    renderActivity(container) {
        const logs = Store.getAll('activityLog');
        container.innerHTML = `
            <h2 style="font-family: var(--font-sans); font-size: 1.5rem; margin-bottom: 1.5rem;">AUDIT ACTIVITY LOG</h2>
            <div style="background: #14171a; border: 1px solid rgba(255,255,255,0.08); padding: 1.5rem; max-height: 600px; overflow-y: auto;">
                ${logs.map(l => `
                    <div style="padding: 0.75rem 0; border-bottom: 1px solid rgba(255,255,255,0.04); font-size: 0.8rem; display: flex; justify-content: space-between;">
                        <div>
                            <span style="color: var(--secondary); font-weight: 700; margin-right: 0.5rem;">[${l.action}]</span>
                            <span>${l.description}</span>
                        </div>
                        <div style="color: #73787b;">${new Date(l.timestamp).toLocaleString()}</div>
                    </div>
                `).join('')}
            </div>
        `;
    },

    quickAddPub() {
        const title = prompt("PUBLICATION TITLE //");
        if (!title) return;
        const authors = prompt("AUTHORS //", "Rowan, A.");
        const year = prompt("PUBLICATION YEAR //", "2026");
        const publisher = prompt("JOURNAL / PUBLISHER //", "Sample Journal");

        Store.addItem('publications', {
            title: Validator.sanitize(title),
            authors: Validator.sanitize(authors),
            year: Validator.sanitize(year),
            publisher: Validator.sanitize(publisher),
            type: "JOURNAL",
            published: true
        });
        CMS.toast("Scholarly publication cataloged.");
        this.refreshActiveTab();
    },

    saveThemeSettings() {
        const color = document.getElementById('theme-primary-input').value;
        ThemeEngine.update({ primary: color });
        CMS.toast("Theme palette updated.");
    },

    handleResetDemo() {
        if (confirm("RESET SYSTEM DATABASE //\n\nAll modifications will be replaced with original fictional demo records.\nProtected Developer Branding will remain active.\n\nProceed?")) {
            Store.resetDemoContent();
            CMS.toast("Demo content fully restored.");
            this.refreshActiveTab();
        }
    }
};

window.AdminApp = AdminApp;
document.addEventListener('DOMContentLoaded', () => AdminApp.init());