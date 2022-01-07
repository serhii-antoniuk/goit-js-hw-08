import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
};

const localStorageKey = 'feedback-form-state';
const storegeData = JSON.parse(localStorage.getItem(localStorageKey));
let formData = storegeData || {};

formUpdate();

refs.form.addEventListener('input', throttle(onForm, 500));
refs.form.addEventListener('submit', onSubmit);

function onForm(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(localStorageKey, JSON.stringify(formData));
}

function formUpdate() {
  if (formData.email) {
    refs.form.elements[0].value = formData.email;
  }
  if (formData.message) {
    refs.form.elements[1].value = formData.message;
  }
}

function onSubmit(evt) {
  evt.preventDefault();
  console.log(formData);
  evt.currentTarget.reset();
  localStorage.removeItem(localStorageKey);
  formData = {};
}
