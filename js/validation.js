/**
 * THE ACADEMIC ATLAS - DEFENSIVE VALIDATION ENGINE
 * String sanitization, safe URL scheme assertions, and character threshold enforcement.
 */
const Validator = {
    sanitize(str) {
        if (!str) return '';
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    },

    isEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
    },

    isSafeUrl(url) {
        if (!url) return true;
        try {
            const parsed = new URL(url, window.location.origin);
            return ['http:', 'https:', 'mailto:'].includes(parsed.protocol);
        } catch {
            return false;
        }
    }
};

window.Validator = Validator;