# PROJECT DETAILS AND INFO REALIZATION
--------------------------------------
## Павлюченко:

## Проєкт:
Робота з системою постингу.
### User interface (` ./frontend/src/components/ `):
- ` PostDisplayBlog` та ` PostCard` використовуються для відображення постів у вигляді плиток на сторінці Blog. ` PostCard ` також містить у собі функціонал для розкриття поста на весь екран (для всіх юзерів) та видалення/редагування (тільки для адміна)
- ` PostShowModal ` відповідає за відображення поста на весь екран у вигляді модалу з фотографією, заголовком та текстом поста.
- ` PostEditModal ` відповідає за інтерфейс редагування заголовку та тексту поста.
- ` PostCreate ` використовується для створення нового поста. Повертається кнопка (відображається тільки для адміна), яка дозволяє занести заголовок, текст і додати картинку до поста.
- ` PostDisplayMain ` відповідає за відображення у вигляді карток трьох останніх доданих постів на головній сторінці.
- ` ImageCarousel ` відображає карусель з фотографій на головній сторінці.
### Backend (` ./backend/posts.js `):
- RESTful API для роботи з постами: додавання, видалення, оновлення. Отримання всіх постів, або ж конкретного по його ` id `.
- Усі дані, які надсилаються на сервер (і з нього також) підв'язані до MySQL бази даних.
### Frontend-Backend зв'язок (` ./frontend/src/services/posts.js`):
- Надсилання запитів до сервера та отримання відповідей від нього. Реалізовані всі можливості, описані в backend.

## Підрахунок елементів для лабораторної роботи №2:
- 3 модали, які використовуються для відображення форм, постів.
- 13 елементів керування.
- 15 обробників подій.

  
## Оніщенко:

## Проєкт:
Робота із системою оплати & user administration.
### User Interface (` ./frontend/src/components `):
- зведення початкового шаблону застосунку через react vite та підключення react-router
- ` LoginForm ` та ` RegisterForm ` - форми для збору даних користувачів та їх передача на сервер, використовуючи відповідні ` axios hooks `, для обробки та маніпуляцій з базою даних, та згідно з результатом обробки запиту: оповіщення про помилку або перенаправлення до ` account-page `
- ` Payment ` - згідно з обраною користувачем опцією, формує запит на сервер, де відбуваються шифрування ` data ` & ` signature ` з поверненням на цих змінних для подальшого їх надсилання на сервер ` liqpay ` через інтегроване ` checkout API `
- ` PaymentTable ` - індивідуальна таблиця для кожного користувача з даними про історію оплат ` (price-email-time) `, поки оновлення даних таблиці мануальне
- ` SessionCheck ` - містить у собі 2 кнопки, які взаємодіють із сервером та надсилають інформацію про поточну сесію та можливість закінчити її, кнопка перевірки сесій активно використовувалась під час тестування, у кінцевому варіанті застосунку компонент експортує лише кнопку завершення сесії
### Backend (` ./backend/register.js `)
- Реалізація ` User administration ` на основі ` express-session ` з підтримкою 2 видів ролей: admin & user з хешуванням паролів користувачів через ` bcrypt ` & ` saltRounds `
- Цикл оплати з інтегруванням ` liqpay client-server ` модель: шифрування ` data ` & ` signature ` параметрів через комбінацію ` base64 ` & ` sha1 ` для формування запиту оплати та, використовуючи ` ngrok ` тунель, прийом та обробка відповіді із серверу ` liqpay `
- Трекінг проплат та користувачів, використовуючи ` mysql database `
### Frontend-Backend зв'язок (` ./frontend/src/services/registerForm.js `)
Надсилання запитів до сервера та їх обробка із , оповіщення користувачів та підтримка функціоналу ` backend `

## Підрахунок елементів для лабораторної роботи №2
4 окремі сторінки з 1 чи більше інтегрованими компонентами (log in - register - account page - payment)
14 елементів керування власного створення + інтегроване checkout API
контейнер-таблиця
12 event handlers + server axios hooks окремо


## Климова:

- frontend/src/components/BlogList.jsx - Використовується для відображення спискоу блогів/постів
- frontend/src/components/Navbar.jsx - Панель з кнопкою меню
- frontend/src/components/OrderButton.jsx - Кнопка "Замовити"
- frontend/src/styles/HomeFooter.css - Нижня панель на головній сторінці
- frontend/src/components/HomeHeader.jsx - Верхня панель на головній сторінці
- frontend/src/components/BlogList.jsx - Список постів на головній сторінці
- frontend/src/components/PhotographerExperience.jsx - Інформація про фотографа
- frontend/src/pages/Home.jsx - Головний компонент головної сторінки, яка збирається з інших компонентів
- frontend/src/styles/BlogList.css - Стилі постів
- frontend/src/styles/PhotographerExperience.css - Стилі інформації про фотографа
## Також була зроблена взаємодія з бекендом для відображення та додавання списку постів
