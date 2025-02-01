document.getElementById("createOrderForm").onsubmit = async function (event) {
    event.preventDefault();
    
    const userId = localStorage.getItem("user_id"); // Берём user_id из localStorage
    if (!userId) {
        alert("Ошибка: пользователь не авторизован");
        return;
    }

    const formData = new FormData(this);
    const orderData = Object.fromEntries(formData.entries());

    // Добавляем user_id и status_id перед отправкой
    orderData.user_id = userId;
    orderData.status_id = 1;

    try {
        const response = await fetch("http://localhost:3001/orderapi/createorder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
        });

        if (!response.ok) {
            throw new Error("Ошибка при создании заказа");
        }

        const result = await response.json();
        alert("Заказ успешно создан!");
        console.log("Ответ сервера:", result);
    } catch (error) {
        console.error("Ошибка создания заказа:", error);
        alert("Не удалось создать заказ.");
    }
};


async function fetchUserOrders() {
    const userId = localStorage.getItem("user_id"); // Получаем user_id из localStorage

    if (!userId) {
        console.error("Ошибка: user_id не найден");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3001/orderapi/order-user-id`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "user-id": userId // Передаем user_id в заголовках
            }
        });

        if (!response.ok) {
            throw new Error("Ошибка при загрузке заказов");
        }

        const orders = await response.json();
        displayOrders(orders);
    } catch (error) {
        console.error("Ошибка загрузки заказов:", error);
    }
}

function displayOrders(orders) {
    const orderList = document.getElementById("orderList");
    orderList.innerHTML = ""; // Очищаем список перед добавлением новых элементов

    if (orders.length === 0) {
        orderList.innerHTML = "<p>У вас нет заказов</p>";
        return;
    }

    orders.forEach(order => {
        const orderItem = document.createElement("div");
        orderItem.classList.add("order-item");
        orderItem.innerHTML = `
            <p><strong>Адрес доставки:</strong> ${order.delivery_address}</p>
            <p><strong>Вес:</strong> ${order.weigth} кг</p>
            <p><strong>Габариты:</strong> ${order.dimensions}</p>
        `;
        orderList.appendChild(orderItem);
    });
}

// Вызываем функцию загрузки заказов
fetchUserOrders();