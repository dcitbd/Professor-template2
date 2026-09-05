/**
 * THE ACADEMIC ATLAS - MULTILINGUAL ENGINE
 * Supports English (en) and Bengali (bn) with immediate fallback.
 */
const LanguageEngine = {
    current: 'en',

    init() {
        this.current = localStorage.getItem('atlas_lang') || 'en';
        this.renderToggleUI();
    },

    setLanguage(lang) {
        this.current = lang;
        localStorage.setItem('atlas_lang', lang);
        document.documentElement.setAttribute('lang', lang);
        if (window.PublicSite) window.PublicSite.hydrateAll();
        this.renderToggleUI();
    },

    t(enText, bnText) {
        if (this.current === 'bn' && bnText && bnText.trim().length > 0) {
            return bnText;
        }
        return enText || '';
    },

    renderToggleUI() {
        const btn = document.getElementById('lang-toggle-btn');
        if (btn) {
            btn.textContent = this.current === 'en' ? 'EN' : 'বাং';
        }
    }
};

window.LanguageEngine = LanguageEngine;
document.addEventListener('DOMContentLoaded', () => LanguageEngine.init());