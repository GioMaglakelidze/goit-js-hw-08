import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
// Знаходимо блок з тегом iframe по id
const iframe = document.querySelector('#vimeo-player');
//  Ініціалізуємо доступ до плеєра Vimeo
const VimeoPlayer = new Player(iframe);
// відстежуємо подію timeupdate під час відтворення відео в методі on
VimeoPlayer.on(
  'timeupdate',
  throttle(e => {
    // Зберігаємо час відтворення (число перетворюємо в рядок) у локальне сховище, не частіше ніж раз в секунду через частину бібліотеки lodash.throttle
    localStorage.setItem('videoplayer-current-time', JSON.stringify(e.seconds));
  }, 1000)
);

// Під час перезавантаження сторінки метод setCurrentTime візьме для плеєра час з локального сховища або почне з нуля (щоб не виникало помилки)
VimeoPlayer.setCurrentTime(
  localStorage.getItem('videoplayer-current-time') || 0
);
