document.addEventListener("DOMContentLoaded", async () => {
    await fetchOrders();
    await fetchDrones();
});

async function fetchOrders() {
    try {
        const response = await fetch("http://localhost:3001/orderapi/allorder");
        const orders = await response.json();
        const orderTable = document.querySelector("#orderTable tbody");
        const orderSelect = document.querySelector("#orderId");

        orderTable.innerHTML = "";
        orderSelect.innerHTML = '<option value="">--Выберите заказ--</option>';

        orders.forEach(order => {
            // Заполняем таблицу заказов
            orderTable.innerHTML += `
                <tr>
                    <td>${order.id}</td>
                    <td>${order.delivery_address}</td>
                    <td>${order.weigth}</td>
                    <td>${order.dimensions}</td>
                </tr>
            `;

            // Заполняем выпадающий список заказов
            orderSelect.innerHTML += `<option value="${order.id}">Заказ #${order.id}</option>`;
        });
    } catch (error) {
        console.error("Ошибка загрузки заказов:", error);
    }
}

async function fetchDrones() {
    try {
        const response = await fetch("http://localhost:3001/droneapi/alldrones");
        const drones = await response.json();
        const droneTable = document.querySelector("#droneTable tbody");
        const droneSelect = document.querySelector("#droneId");

        droneTable.innerHTML = "";
        droneSelect.innerHTML = '<option value="">--Выберите дрон--</option>';

        drones.forEach(drone => {
            // Заполняем таблицу дронов
            droneTable.innerHTML += `
                <tr>
                    <td>${drone.id}</td>
                    <td>${drone.model}</td>
                    <td>${drone.status}</td>
                </tr>
            `;

            // Заполняем выпадающий список дронов
            droneSelect.innerHTML += `<option value="${drone.id}">Дрон #${drone.id}</option>`;
        });
    } catch (error) {
        console.error("Ошибка загрузки дронов:", error);
    }
}

document.getElementById("createRouteForm").onsubmit = async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const routeData = Object.fromEntries(formData.entries());

    try {
        const response = await fetch("http://localhost:3001/routeapi/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(routeData),
        });

        if (!response.ok) {
            throw new Error("Ошибка при создании маршрута");
        }

        alert("Маршрут успешно создан!");
        this.reset();
    } catch (error) {
        console.error("Ошибка создания маршрута:", error);
        alert("Не удалось создать маршрут.");
    }
};
