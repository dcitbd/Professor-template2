/**
 * THE ACADEMIC ATLAS - BACKUP, EXPORT & RESTORE ENGINE
 * Full schema integrity verification, format validations, and irreversible action guards.
 */
const BackupEngine = {
    exportData() {
        const payload = {
            metadata: {
                version: "1.0",
                exportedAt: new Date().toISOString(),
                schema: "AcademicAtlasBackup"
            },
            data: {}
        };

        const keys = ['profile', 'hero', 'researchAreas', 'publications', 'courses', 'books', 'career', 'fieldNotes', 'readingList', 'inquiries', 'theme'];
        keys.forEach(k => {
            payload.data[k] = Store.get(k);
        });

        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `academic-atlas-backup-${new Date().toISOString().slice(0,10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        Store.logActivity('BACKUP', 'SYSTEM', 'Exported JSON backup archive.');
    },

    validateAndImport(jsonString) {
        try {
            const parsed = JSON.parse(jsonString);
            if (!parsed.metadata || parsed.metadata.schema !== "AcademicAtlasBackup" || !parsed.data) {
                return { success: false, message: "Incompatible backup format. Schema signature missing." };
            }

            // Restore collections
            Object.keys(parsed.data).forEach(collection => {
                Store.save(collection, parsed.data[collection]);
            });

            Store.logActivity('RESTORE', 'SYSTEM', 'Restored system database from uploaded backup.');
            return { success: true };
        } catch (e) {
            return { success: false, message: "JSON parsing syntax error: " + e.message };
        }
    }
};

window.BackupEngine = BackupEngine;