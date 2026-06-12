const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Impede o recarregamento natural da página
        
        const userVal = document.getElementById('username').value.trim();
        const passVal = document.getElementById('password').value.trim();
        const alertBox = document.getElementById('login-alert');

        // REQUISITO ESTRITO: Credenciais fixas (ADM / 123)
        if (userVal === "ADM" && passVal === "123") {
            sessionStorage.setItem("logado", "true");
            window.location.href = "index.html"; // Redirecionamento bem sucedido
        } else {
            alertBox.classList.remove('d-none'); // Exibe mensagem de erro
        }
    });
}

// Mecanismo funcional para o botão Logout (Sair)
const btnLogout = document.getElementById('btnLogout');
if (btnLogout) {
    btnLogout.addEventListener('click', function() {
        sessionStorage.removeItem("logado");
        window.location.href = "login.html";
    });
}

const darkModeToggle = document.getElementById('darkModeToggle');
if (darkModeToggle) {
    // Verifica se já existia preferência guardada na cache do computador
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
        darkModeToggle.checked = true;
    }

    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
        }
    });
}

function loadEpisode(title, description, fanUser, fanOpinion) {
    document.getElementById('view-title').innerText = title;
    document.getElementById('view-desc').innerText = `"${description}"`;
    
    const commentsBox = document.getElementById('comments-box');
    commentsBox.innerHTML = `
        <div class="p-2 mb-2 bg-dark-custom rounded border-start border-white border-3 animate-fade">
            <strong class="small d-block text-white">${fanUser}</strong>
            <span class="text-secondary small">${fanOpinion}</span>
        </div>
    `;

    const items = document.querySelectorAll('.list-group-custom button');
    items.forEach(item => item.classList.remove('active'));
    
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
}

const btnSendOpinion = document.getElementById('btnSendOpinion');
if (btnSendOpinion) {
    btnSendOpinion.addEventListener('click', function() {
        const inputOpinion = document.getElementById('user-opinion');
        const commentsBox = document.getElementById('comments-box');
        
        if (inputOpinion.value.trim() !== "") {
            // Criação do bloco HTML de forma dinâmica
            const wrapper = document.createElement('div');
            wrapper.className = "p-2 mb-2 bg-dark-custom rounded border-start border-white border-3 animate-fade";
            wrapper.innerHTML = `<strong class="small d-block text-white">@Utilizador_Logado</strong>
                                 <span class="text-secondary small">${inputOpinion.value}</span>`;
            
            commentsBox.appendChild(wrapper);
            inputOpinion.value = ""; // Limpa a barra de digitação
            commentsBox.scrollTop = commentsBox.scrollHeight; // Scroll automático para baixo
        }
    });
}

const regForm = document.getElementById('register-form');
if (regForm) {
    const inputEmail = document.getElementById('reg-email');
    const inputPass = document.getElementById('reg-password');
    const inputName = document.getElementById('reg-name');
    const selectProfile = document.getElementById('reg-profile');

    // Validador auxiliar em tempo real
    function validateField(input, condition) {
        if (condition) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
            return true;
        } else {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
            return false;
        }
    }

    inputEmail.addEventListener('input', () => {
        validateField(inputEmail, inputEmail.value.includes('@') && inputEmail.value.trim().length > 3);
    });

    inputPass.addEventListener('input', () => {
        validateField(inputPass, inputPass.value.length >= 6);
    });

    inputName.addEventListener('input', () => {
        validateField(inputName, inputName.value.trim() !== "");
    });

    regForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateField(inputName, inputName.value.trim() !== "");
        const isEmailValid = validateField(inputEmail, inputEmail.value.includes('@'));
        const isPassValid = validateField(inputPass, inputPass.value.length >= 6);
        const isProfileValid = validateField(selectProfile, selectProfile.value !== "");

        if (isNameValid && isEmailValid && isPassValid && isProfileValid) {
            alert("Membro registado com sucesso para a base do projeto!");
            regForm.reset();
            // Remove os indicadores visuais verdes de sucesso após a limpeza
            const inputs = regForm.querySelectorAll('.form-control, .form-select');
            inputs.forEach(item => item.classList.remove('is-valid'));
        }
    });
}