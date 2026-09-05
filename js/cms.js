/**
 * THE ACADEMIC ATLAS - UNIVERSAL CMS CONTROLLER ENGINE
 * Handles Table generation, Status updates, and Bulk mutations across models.
 */
const CMS = {
    toast(msg) {
        let hub = document.querySelector('.atlas-toast-hub');
        if (!hub) {
            hub = document.createElement('div');
            hub.className = 'atlas-toast-hub';
            document.body.appendChild(hub);
        }
        const toast = document.createElement('div');
        toast.className = 'atlas-toast';
        toast.textContent = msg;
        hub.appendChild(toast);
        setTimeout(() => toast.remove(), 4000);
    },

    renderTable({ containerId, collection, columns, actions }) {
        const container = document.getElementById(containerId);
        if (!container) return;
        const records = Store.getAll(collection);

        if (!records.length) {
            container.innerHTML = `
                <div style="text-align: center; padding: 4rem 2rem; color: #73787b;">
                    <div style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem;">NO ARCHIVED RECORDS</div>
                    <div style="font-size: 0.85rem;">Items created in this vertical will appear here.</div>
                </div>
            `;
            return;
        }

        let html = `
            <div class="admin-table-container">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th style="width: 40px;"><input type="checkbox" onchange="CMS.toggleSelectAll(this, '${collection}')"></th>
                            ${columns.map(c => `<th>${c.label}</th>`).join('')}
                            <th style="text-align: right;">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        records.forEach(row => {
            const statusClass = row.status ? `status-${row.status.toLowerCase()}` : '';
            html += `
                <tr class="${statusClass}">
                    <td><input type="checkbox" class="row-select-${collection}" data-id="${row.id}"></td>
                    ${columns.map(c => `<td>${c.formatter ? c.formatter(row[c.field], row) : (row[c.field] || '—')}</td>`).join('')}
                    <td style="text-align: right;">
                        <button style="background: none; border: 1px solid rgba(255,255,255,0.1); color: #e1e4e8; padding: 0.25rem 0.5rem; font-size: 0.7rem; cursor: pointer; border-radius: 2px;" onclick="CMS.handleEdit('${collection}', '${row.id}')">EDIT</button>
                        <button style="background: none; border: 1px solid rgba(218,54,51,0.3); color: #f85149; padding: 0.25rem 0.5rem; font-size: 0.7rem; cursor: pointer; border-radius: 2px; margin-left: 0.5rem;" onclick="CMS.handleDelete('${collection}', '${row.id}')">DELETE</button>
                    </td>
                </tr>
            `;
        });

        html += `</tbody></table></div>`;
        container.innerHTML = html;
    },

    toggleSelectAll(master, collection) {
        document.querySelectorAll(`.row-select-${collection}`).forEach(cb => cb.checked = master.checked);
    },

    handleDelete(collection, id) {
        if (confirm(`PERMANENT RECORD DELETION //\n\nAre you sure you want to permanently delete record ${id}?\nThis operation is immediate.`)) {
            Store.deleteItem(collection, id);
            this.toast(`Record ${id} removed successfully.`);
            if (window.AdminApp) window.AdminApp.refreshActiveTab();
        }
    },

    handleEdit(collection, id) {
        const item = Store.getAll(collection).find(x => x.id === id);
        if (!item) return;
        const newTitle = prompt("EDIT RECORD TITLE //", item.title || item.name || "");
        if (newTitle !== null) {
            Store.updateItem(collection, id, { title: newTitle, name: newTitle });
            this.toast("Record updated successfully.");
            if (window.AdminApp) window.AdminApp.refreshActiveTab();
        }
    }
};

window.CMS = CMS;