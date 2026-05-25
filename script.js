function checkPassword() {
    const passwordInput = document.getElementById('password').value;
    const correctPassword = "01/05"; // Tu fecha especial
    const loginScreen = document.getElementById('login-screen');
    const mainContent = document.getElementById('main-content');
    const errorMsg = document.getElementById('error-msg');

    if (passwordInput === correctPassword) {
        // Efecto de desvanecimiento
        loginScreen.style.opacity = '0';
        setTimeout(() => {
            loginScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
        }, 500);
    } else {
        errorMsg.style.display = 'block';
        document.getElementById('password').value = "";
    }
}

// Permitir entrar con la tecla "Enter"
document.getElementById('password').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        checkPassword();
    }
});