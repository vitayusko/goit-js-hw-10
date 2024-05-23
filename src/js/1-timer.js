import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.getElementById('btn-start');
const timerFields = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let countdownInterval;
let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  enableSeconds: true,
  dateFormat: 'Y-m-d H:i:S',
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startButton.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      startButton.disabled = false;
    }
  },
};

flatpickr(datetimePicker, options);

startButton.addEventListener('click', () => {
  if (!userSelectedDate) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a valid date',
    });
    return;
  }
  startButton.disabled = true;
  datetimePicker.disabled = true;
  startCountdown();
});

function startCountdown() {
  countdownInterval = setInterval(() => {
    const now = new Date();
    const timeRemaining = userSelectedDate - now;

    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      updateTimer(0);
      datetimePicker.disabled = false;
      return;
    }

    updateTimer(timeRemaining);
  }, 1000);
}

function updateTimer(ms) {
  const time = convertMs(ms);
  timerFields.days.textContent = addLeadingZero(time.days);
  timerFields.hours.textContent = addLeadingZero(time.hours);
  timerFields.minutes.textContent = addLeadingZero(time.minutes);
  timerFields.seconds.textContent = addLeadingZero(time.seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

