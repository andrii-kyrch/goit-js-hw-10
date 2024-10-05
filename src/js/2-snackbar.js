import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();
  const delay = Number(event.target.delay.value);
  const selectedState = event.target.elements.state.value;
  console.log(selectedState);

  const promise = createPromise(delay, selectedState);
  promise
    .then(message => {
      iziToast.success({
        message: message,
        icon: false,
        position: 'topRight',
        closeOnEscape: true,
        closeOnClick: true,
      });
    })
    .catch(error => {
      iziToast.error({
        message: error,
        icon: false,
        position: 'topRight',
        closeOnEscape: true,
        closeOnClick: true,
      });
    });
});

function createPromise(delay, state) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      state === 'fulfilled'
        ? resolve(`✅ Fulfilled promise in ${delay}ms`)
        : reject(`❌ Rejected promise in ${delay}ms`);
    }, delay);
  });
  return promise;
}
