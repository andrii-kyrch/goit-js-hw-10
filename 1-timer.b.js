import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('[data-start]'),
  timerDays: document.querySelector('[data-days]'),
  timerHours: document.querySelector('[data-hours]'),
  timerMinutes: document.querySelector('[data-minutes]'),
  timerSeconds: document.querySelector('[data-seconds]'),
};

let userSelectedDate;
let timerId;
refs.startButton.disabled = true;

flatpickr(refs.inputDate, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      refs.startButton.disabled = true;
      window.alert('Please choose a date in the future');
    } else {
      refs.startButton.disabled = false;
      userSelectedDate = selectedDates[0];
    }
  },
});

refs.startButton.addEventListener('click', startTimer);

function startTimer() {
  refs.startButton.disabled = true;
  refs.inputDate.disabled = true;

  timerId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = userSelectedDate - currentTime - 1000;

    if (deltaTime <= 0) {
      clearInterval(timerId);
      updateClockface({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      refs.inputDate.disabled = false;
    }

    const time = convertMs(deltaTime);
    updateClockface(time);
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateClockface({ days, hours, minutes, seconds }) {
  refs.timerDays.textContent = addLeadingZero(days);
  refs.timerHours.textContent = addLeadingZero(hours);
  refs.timerMinutes.textContent = addLeadingZero(minutes);
  refs.timerSeconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
