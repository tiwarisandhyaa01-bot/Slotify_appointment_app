let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
// Role System
let role = "user"; // change to "admin" to test

const adminPanel = document.querySelector("#admin-panel");

if (role === "user" && adminPanel) {
  adminPanel.style.display = "none";
}

// Booking Success Message
const bookingBtn = document.querySelector("#confirm-booking");
const successMessage = document.querySelector("#success-message");
const errorMessage = document.querySelector("#error-message");
const doctorSelect = document.querySelector("#doctor-select");
const dateInput = document.querySelector("#appointment-date");

if (bookingBtn) {
  bookingBtn.addEventListener("click", function () {

    if (
      doctorSelect.value === "Select Doctor" ||
      dateInput.value === ""
    ) {
      errorMessage.classList.remove("hidden");
      successMessage.classList.add("hidden");
    } else {
      errorMessage.classList.add("hidden");
      successMessage.classList.remove("hidden");

      setTimeout(function () {
        successMessage.classList.add("hidden");
      }, 3000);

      const tableBody = document.querySelector("tbody");

appointments.push({
  doctor: doctorSelect.value,
  date: dateInput.value,
  time: selectedTime
});

localStorage.setItem("appointments", JSON.stringify(appointments));

renderAppointments();
    }

  });
}

let selectedTime = "";

const timeSlots = document.querySelectorAll(".time-slot");

timeSlots.forEach(slot => {
  slot.addEventListener("click", function () {

    // reset all buttons
    timeSlots.forEach(btn => {
      btn.classList.remove("bg-yellow-400");
      btn.classList.add("bg-blue-500");
    });

    // highlight selected
    this.classList.remove("bg-blue-500");
    this.classList.add("bg-yellow-400");

    selectedTime = this.innerText;
  });
});


// Cancel Buttons
document.querySelector("tbody").addEventListener("click", function(e) {

  if (e.target.classList.contains("cancel-btn")) {

    const index = e.target.getAttribute("data-index");

    appointments.splice(index, 1);

    localStorage.setItem("appointments", JSON.stringify(appointments));

    renderAppointments();
  }

});

function renderAppointments() {
  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";

  appointments.forEach((appt, index) => {
    const row = `
      <tr class="border-b">
        <td class="py-2">${appt.doctor}</td>
        <td>${appt.date}</td>
        <td>${appt.time}</td>
        <td class="text-green-600 font-semibold">Confirmed</td>
        <td>
          <button data-index="${index}" class="text-red-500 hover:underline cancel-btn">Cancel</button>
        </td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}
renderAppointments();