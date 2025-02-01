// Получаем все элементы модальных окон
const registerModal = document.getElementById('registerModal');
const loginModal = document.getElementById('loginModal');

// Получаем кнопки для открытия модальных окон
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

// Получаем кнопки закрытия модальных окон
const closeButtons = document.querySelectorAll('.close');

// Функция для открытия модального окна
function openModal(modal) {
    modal.style.display = 'block';
}

// Функция для закрытия модального окна
function closeModal(modal) {
    modal.style.display = 'none';
}

// Открываем модальное окно при нажатии на кнопку "Регистрация"
registerBtn.onclick = function() {
    openModal(registerModal);
}

// Открываем модальное окно при нажатии на кнопку "Вход"
loginBtn.onclick = function() {
    openModal(loginModal);
}

// Закрываем модальное окно при нажатии на кнопку закрытия
closeButtons.forEach(button => {
    button.onclick = function() {
        const modal = button.closest('.modal');
        closeModal(modal);
    }
});

// Закрываем модальное окно при клике вне его области
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        closeModal(event.target);
    }
}

// Обрабатываем отправку формы регистрации
document.getElementById('registerForm').onsubmit = async function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    const passwordHash = CryptoJS.SHA256(data.regPassword).toString(CryptoJS.enc.Hex);
    data.regPassword = passwordHash;

    if (data.regRole === 'client') {
        data.regRole = 2;
    } else if (data.regRole === 'operator') {
        data.regRole = 3;
    }


    console.log('Данные для регистрации:', data);

    try {
        const response = await fetch('http://localhost:3001/userapi/reg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }) 
        
        if(response.ok){
            const result = await response.json()
            console.log("Сервер ответил", result)
        } else {
            console.error("Ошибка сервера", response.statusText)
        }
    } catch (error) {
        console.error("Ошибка", error)
    }

    closeModal(registerModal);
}

// Обрабатываем отправку формы входа
document.getElementById('loginForm').onsubmit = async function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    let data = Object.fromEntries(formData.entries());

    // Шифруем пароль с использованием SHA-256
    const passwordHash = CryptoJS.SHA256(data.LoginPassword).toString(CryptoJS.enc.Hex);
    data.LoginPassword = passwordHash;

    console.log('Данные для входа:', data);

    try {
        const response = await fetch('http://localhost:3001/userapi/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if(response.ok){
            const result = await response.json();
            console.log("Сервер ответил", result);
            if(result.message === 'Вход успешно выполнен') {
                if (result.user_id) {
                    localStorage.setItem('user_id', result.user_id);
                }
                
                if(result.role === 'admin'){
                    window.location.href = 'htmls/admin.html';
                } else if (result.role === 'client'){
                    window.location.href ='htmls/client.html'
                } else if (result.role === 'operator'){
                    window.location.href ='htmls/operator.html'
                }
            }
        } else {
            console.error("Ошибка сервера", response.statusText);
        }
    } catch (error) {
        console.error("Ошибка", error);
        alert('Произошла ошибка при отправке данных.');
    }

    closeModal(loginModal);
}