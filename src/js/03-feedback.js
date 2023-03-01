// Імпорт пакету throttle з lodash
import throttle from 'lodash.throttle';
// Визначення єлементів DOM форми, для доступу до їх значень
const refs = {
  form: document.querySelector('.feedback-form'),
  textareaMessage: document.querySelector('textarea[name="message"]'),
  inputEmail: document.querySelector('input[name="email"]'),
};
// Ключ для зберігання в Local Storage
const LOCALSTORAGE_KEY = 'feedback-form-state';
// Викликаємо функцію для заповнення значень які ще не були відправлені і зберігаються в локальному сховищі
populateInputs();
// Додавання прослуховувача на кожну зміну елементів форми кожні 500мс
refs.form.addEventListener('input', throttle(onInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

// Callback-функція для прослуховувача (при зміні значення елементів інпута)
function onInput(e) {
  // Створення об'єкту для зберігання невідправлених даних в Local Storage
  const objectToLocal = {
    email: refs.inputEmail.value,
    message: refs.textareaMessage.value,
  };
  // Запис невідправлених даних обєктом в Local Storage
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(objectToLocal));
}
// Callback-функція для прослуховувача на кнопці (при відправці форми)
function onFormSubmit(e) {
  // відміняємо дію за замовчуванням
  e.preventDefault();
  // Напрошується валідація форми перед відправленням, але її нема в ТЗ
  // видаляємо значення з локального сховища
  localStorage.removeItem(LOCALSTORAGE_KEY);
  // Очищаємо поля форми
  e.currentTarget.reset();
}
// Функція для заповнення значень інпутів, які ще не були відправлені і зберігаються в локальному сховищі
function populateInputs() {
  // Використовуємо конструкцію try...catch щоб скрипт не падав
  try {
    // дістаємо значення з локального сховища
    const savedState = localStorage.getItem(LOCALSTORAGE_KEY);
    // Якщо локальне сховище зберігало значення, то заповненюємо ними інпути форми
    if (savedState) {
      refs.inputEmail.value = JSON.parse(savedState).email;
      refs.textareaMessage.value = JSON.parse(savedState).message;
    }
  } catch (err) {
    console.error('Проблеми з доступом до локальних даних:', err);
  }
}
