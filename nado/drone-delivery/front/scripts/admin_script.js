document.getElementById('addDroneForm').onsubmit = async function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    data.status_id = 3
    data.battery_level = 100
    console.log('Данные для добавления дрона:', data);

    try {
        // Отправляем данные на сервер
        const response = await fetch('http://localhost:3001/droneapi/createdrone', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if(response.ok){
            const result = await response.json();
            console.log("Сервер ответил", result);
            loadDrones(); // Перезагружаем список дронов после добавления
            this.reset(); // Очищаем форму
        } else {
            console.error("Ошибка сервера", response.statusText);
            alert('Ошибка при добавлении дрона.');
        }
    } catch (error) {
        console.error("Ошибка", error);
        alert('Произошла ошибка при отправке данных.');
    }
}

async function loadDrones() {
    try {
        const response = await fetch('http://localhost:3001/droneapi/alldrones');
        if(response.ok){
            const drones = await response.json();
            console.log("Полученные дроны:", drones);
            renderDrones(drones);
        } else {
            console.error("Ошибка сервера", response.statusText);
        }
    } catch (error) {
        console.error("Ошибка", error);
    }
}

function renderDrones(drones) {
    const droneList = document.getElementById('droneList');
    droneList.innerHTML = ''; // Очищаем предыдущие элементы

    drones.forEach(drone => {
        const droneItem = document.createElement('div');
        droneItem.className = 'drone-item';
        droneItem.innerHTML = `
            <p>Модель: ${drone.model}</p>
            <p>Статус: ${drone.status}</p>
            <p>Заряд батареи: ${drone.battery_level}</p>
        `;
        droneList.appendChild(droneItem);
    });
}

// Загрузка списка дронов при загрузке страницы
window.onload = loadDrones;