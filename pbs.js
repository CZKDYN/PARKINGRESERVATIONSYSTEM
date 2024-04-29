document.addEventListener('DOMContentLoaded', function() {
  const feedbackButton = document.getElementById('feedback-btn');

  if (feedbackButton) {
      feedbackButton.addEventListener('click', function() {
          window.location.href = 'pbs2.html'; 
      });
  }
});

const unavailableSlots = [2, 5, 7];

function getElementVal(id) {
  return document.getElementById(id).value;
}

function isSlotAvailable(slotNumber) {
  return !unavailableSlots.includes(slotNumber);
}

const slotButtons = document.querySelectorAll('.slot-btn');

slotButtons.forEach((button) => {
  const slotNumber = parseInt(button.innerText);
  const slotBooked = !isSlotAvailable(slotNumber);

  if (slotBooked) {
    button.style.backgroundColor = 'red';
    button.disabled = true;
    button.classList.add('unavailable'); // Add a class to indicate that the slot is unavailable
  } else {
    button.addEventListener('click', () => {
      if (!slotBooked) {
          if (button.style.backgroundColor === 'red') {
              button.style.backgroundColor = 'green';
              button.disabled = false;
          } else {
              button.style.backgroundColor = 'red';
              button.disabled = true;
          }

          const slotInput = document.querySelector('#selected-slot');
          slotInput.value = slotNumber;

          slotButtons.forEach((button) => {
              button.classList.remove('selected');
          });

          button.classList.add('selected');
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const bookingForm = document.getElementById('booking-form');

  bookingForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const formData = new FormData(bookingForm);

      const slotNumber = formData.get('selected-slot');

      if (unavailableSlots.includes(parseInt(slotNumber))) {
          alert(`Slot ${slotNumber} is unavailable! Please select another slot.`);
      } else {
          alert(`Booking successful! Slot ${slotNumber} has been reserved for you.`);

          // Reset the form
          bookingForm.reset();

          // Show the selected button again
          const selectedButton = document.querySelector(`.slot-btn:nth-child(${slotNumber})`);
          selectedButton.style.display = 'block';
      }
  });
});