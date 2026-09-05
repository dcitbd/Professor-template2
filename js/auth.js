/**
 * THE ACADEMIC ATLAS - BROWSER AUTHENTICATION & ACCESS CONTROL
 * Explicit static session manager. Clearly warns against production use for sensitive data.
 */
const SESSION_KEY = 'atlas_admin_session';

const Auth = {
    isAuthenticated() {
        const token = sessionStorage.getItem(SESSION_KEY);
        return token === 'authenticated_demo_token';
    },

    login(username, password) {
        // Explicitly hardcoded demo credentials
        if (username === 'admin' && password === 'ChangeMe123!') {
            sessionStorage.setItem(SESSION_KEY, 'authenticated_demo_token');
            if (window.Store) {
                window.Store.logActivity('LOGIN', 'AUTH', 'Administrator logged into Command Center.');
            }
            return { success: true };
        }
        return { success: false, message: 'Invalid credentials. Use admin / ChangeMe123!' };
    },

    logout() {
        sessionStorage.removeItem(SESSION_KEY);
        if (window.Store) {
            window.Store.logActivity('LOGOUT', 'AUTH', 'Administrator logged out.');
        }
        window.location.href = 'login.html';
    },

    protectRoute() {
        if (!this.isAuthenticated()) {
            window.location.href = 'login.html';
        }
    }
};

window.Auth = Auth;