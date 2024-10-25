// Анимация загрузки сигнала
var animation = lottie.loadAnimation({
    container: document.getElementById('animation-load'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: './images/animations/animation.json'
});

function moveHeader() {
    const header = document.querySelector('.header')
    header.classList.add('header--moved');

    const headling = document.querySelector('.header__headling');
    headling.classList.add('header__headling--moved');
}

function receiveSignal() {
    // Селектор текста отображения коэффициента
    const prediction = document.querySelector('.prediction');

    // Показать анимацию
    document.getElementById('animation-load').classList.remove('animation-hidden');

    // Генерация случайного коэффициента и его отображение
    let randomNumber = Math.random();
    if (randomNumber < 0.85) {
        randomNumber = (Math.random() * 0.5) + 1; // от 1 до 1.5
    } else if (randomNumber > 0.85 && randomNumber < 0.95) {
        randomNumber = (Math.random() * 2) + 1; // от 1 до 3
    }
    else if (randomNumber > 0.95 && randomNumber < 0.99) {
        randomNumber = (Math.random() * 1) + 4; // от 4 до 5
    }
    else if (randomNumber > 0.99) {
        randomNumber = (Math.random() * 6) + 6 // от 6 до 12
    }
    let predictionNum = Math.round(randomNumber * 100) / 100 + 'x';

    setTimeout(() => {
        // Скрыть анимацию
        document.getElementById('animation-load').classList.add('animation-hidden');

        prediction
            .innerText = predictionNum;
        prediction
            .classList.remove('prediction-hidden');
    }, 5000)
    prediction.innerText = '';

    return predictionNum;
}

// Создание первого previous__item
function controlPreviousContainer(lastCoefficient) {
    let container = document.querySelector('.previous');

    // Удалить последний previous__item
    if (container.children.length === 3) {
        container.removeChild(container.firstElementChild);
    }

    // Создание самого элемента
    let newItem = document.createElement('div')
    container.appendChild(newItem);
    newItem.classList.add('previous__item');
    newItem.innerText = lastCoefficient;

    // Добавить цвет элементу previous__item
    if (parseFloat(lastCoefficient) > 5) {
        newItem.classList.add('item--high');
    } else if (parseFloat(lastCoefficient) > 1.5) {
        newItem.classList.add('item--mid');
    }

    // Добавить обводку элементам
    container.children[1].classList.remove('item--first');
    container.lastElementChild.classList.add('item--first');

}

function moveLastItem() {
    let container = document.querySelector('.previous');
    if (container.children.length === 3) {
        container.firstElementChild.classList.add('item--last');
    }
}

function clickOnStart() {
    // Сдвинуть последний элемент
    moveLastItem();

    // Сдвинуть header
    moveHeader();

    // Записать результат случайного коэффициента
    const signalReceived = receiveSignal();

    // Создать новый previous__item
    setTimeout(() => {
        controlPreviousContainer(signalReceived);
    }, 5000)
}








// Движение и удаление последнего элемента
// let lastItem = previousContainer.lastElementChild;
// lastItem.classList.add('item--last');
// setTimeout(() => {
//     lastItem.remove()
// }, 1000)