document.addEventListener("DOMContentLoaded", () => {
    const schedule = document.getElementById("schedule");
    const modal = document.getElementById("modal");
    const closeModal = document.getElementsByClassName("close")[0];
    const bookingForm = document.getElementById("bookingForm");
    let selectedTimeSlot = null;

    const startDate = new Date(2024, 5, 16); // 16 de Junho de 2024
    const endDate = new Date(2024, 5, 22); // 22 de Junnho de 2024
    const hours = Array.from({ length: 10 }, (_, i) => i + 8); // Horas de 8h às 17h

    // Função para formatar a data
    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    // Função para criar uma coluna de horários para um dia específico
    function createDayColumn(date) {
        const dayColumn = document.createElement("div");
        dayColumn.className = "day-column";
        const formattedDate = formatDate(date);
        const dayHeader = document.createElement("h2");
        dayHeader.textContent = formattedDate;
        dayColumn.appendChild(dayHeader);

        hours.forEach(hour => {
            const timeSlot = document.createElement("div");
            timeSlot.className = "time-slot";
            timeSlot.textContent = `${hour}:00`;
            timeSlot.addEventListener("click", () => {
                if (!timeSlot.classList.contains("unavailable")) {
                    selectedTimeSlot = `${formattedDate} - ${hour}:00`;
                    modal.style.display = "block";
                }
            });
            dayColumn.appendChild(timeSlot);
        });

        return dayColumn;
    }

    // Gerar horários por dia
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        const dayColumn = createDayColumn(new Date(date));
        schedule.appendChild(dayColumn);
    }

    // Fechar modal
    closeModal.onclick = () => {
        modal.style.display = "none";
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Submeter formulário
    bookingForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        alert(`Horário marcado: ${selectedTimeSlot}\nNome: ${name}\nCelular: ${phone}`);

        // Encontrar e atualizar o horário marcado
        const slots = document.getElementsByClassName("time-slot");
        for (let slot of slots) {
            if (slot.textContent === selectedTimeSlot.split(" - ")[1] && slot.parentElement.firstChild.textContent === selectedTimeSlot.split(" - ")[0]) {
                slot.classList.add("unavailable");
                slot.textContent = "Reservado";
                break;
            }
        }

        modal.style.display = "none";
        bookingForm.reset();
    });
});
