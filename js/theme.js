/**
 * THE ACADEMIC ATLAS - DESIGN ENGINE
 * Real-time dynamic variable synchronization and theme persistence.
 */
const ThemeEngine = {
    init() {
        const savedTheme = Store.get('theme') || { mode: 'light' };
        this.applyMode(savedTheme.mode);
        this.applyVariables(savedTheme);
    },

    applyMode(mode) {
        document.documentElement.setAttribute('data-theme', mode);
    },

    applyVariables(theme) {
        const root = document.documentElement;
        if (theme.primary) root.style.setProperty('--primary', theme.primary);
        if (theme.secondary) root.style.setProperty('--secondary', theme.secondary);
        if (theme.accent) root.style.setProperty('--accent', theme.accent);
    },

    update(newTheme) {
        const current = Store.get('theme') || {};
        const merged = { ...current, ...newTheme };
        Store.save('theme', merged);
        this.applyVariables(merged);
        if (merged.mode) this.applyMode(merged.mode);
        Store.logActivity('THEME CHANGE', 'DESIGN', 'Design system visual tokens updated.');
    }
};

window.ThemeEngine = ThemeEngine;
document.addEventListener('DOMContentLoaded', () => ThemeEngine.init());