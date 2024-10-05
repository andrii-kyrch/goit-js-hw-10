import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('[data-start]'),
  timerDays: document.querySelector('[data-days]'),
  timerHours: document.querySelector('[data-hours]'),
  timerMinutes: document.querySelector('[data-minutes]'),
  timerSeconds: document.querySelector('[data-seconds]'),
};

refs.startButton.disabled = true;

let userSelectedDate;

flatpickr('#datetime-picker', {
  defaultDate: new Date(),
  enableTime: true,
  time_24hr: true,
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
        closeOnEscape: true,
        closeOnClick: true,
      });
      refs.startButton.disabled = true;
    } else {
      userSelectedDate = selectedDates[0];
      refs.startButton.disabled = false;
    }
  },
});

refs.startButton.addEventListener('click', () => {
  refs.startButton.disabled = true;
  refs.inputDate.disabled = true;
  const timerId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = userSelectedDate - currentTime;

    if (deltaTime < 1000) {
      refs.inputDate.disabled = false;
      clearInterval(timerId);
    }

    const time = convertMs(deltaTime);
    updateTimerFace(time);
  }, 1000);
});

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

function updateTimerFace({ days, hours, minutes, seconds }) {
  refs.timerDays.textContent = addLeadingZero(days);
  refs.timerHours.textContent = addLeadingZero(hours);
  refs.timerMinutes.textContent = addLeadingZero(minutes);
  refs.timerSeconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
