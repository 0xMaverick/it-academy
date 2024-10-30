//JSON
import {pets8} from '../../main/js/pets8.js'                                         //объект со всеми 8 питомцами (полное описание)

//----------------БУРГЕР-МЕНЮ----------------------------------------------------------------------------
const burgerMenu = document.querySelector('.burger-menu');              //кнопка бургер-меню
const burgerMenuBig = document.querySelector('.burger-menu-big');       //всплывающее меню
const darkBurger = document.querySelector('.dark-burger');              //фоновое затенение

const openBurgerMenu = () => {
    burgerMenu.classList.toggle('rotate');                             //вкл класс rotate (поворот на 90)
    burgerMenuBig.classList.toggle('burger-menu-big-onclick');         //вкл/выкл burgerMenuBig (меняет позицию вылезая справа из-за окна) 
    darkBurger.classList.toggle('hidden');                             //вкл затенение фона
    document.body.classList.toggle('modal-open');                      //вкл класс для боди на запрет скролла
};


const closeBurgerMenu = () => {
    burgerMenu.classList.toggle('rotate');                             //вкл класс rotate (поворот на 90)
    burgerMenuBig.classList.remove('burger-menu-big-onclick');         //вкл/выкл burgerMenuBig (меняет позицию вылезая справа из-за окна) 
    darkBurger.classList.add('hidden');                                //выкл затенение фона
    document.body.classList.remove('modal-open');                      //убрать класс для боди на запрет скролла
};

//при клике на кнопку бургер-меню
burgerMenu.addEventListener('click', () => {openBurgerMenu()});

//закрытие бургер-меню при клике на ссылки  
const burgerMenuLinks = document.querySelectorAll('.burger-menu-link');        //ссылки в меню

for (let link of burgerMenuLinks) {
    //для каждой ссылки в меню добавить событие
    link.addEventListener('click', () => {closeBurgerMenu()})
};

//закрытие бургер-меню при клике на затененную область
darkBurger.addEventListener('click', () => {closeBurgerMenu()});


//-----------------ПОП-АП---------------------------------------------------------------------------------
//клик на карточки животных для открытия попапа
//клик на крест или затененную область - закрытие попапа
const ourFriendsAnimals = document.querySelectorAll('.our-friends-animals'); 
const popUp = document.querySelector('.pop-up');
const close = document.querySelector('.close');
const darkPopUp = document.querySelector('.dark-pop-up');

const openClosePets = () => {
    popUp.classList.toggle('hidden');                              //вкл-выкл попап с тенью         
    darkPopUp.classList.toggle('hidden');                          //вкл-выкл дарк с тенью
    document.body.classList.toggle('modal-open');                  //вкл-выкл скролл
};


//при клике на карточку питомца openClosePets
for (let animal of ourFriendsAnimals) {
    animal.addEventListener('click', () => {
        openClosePets();

        let parentDivPets = (animal.closest('.our-friends-animals'));     //получить нужного родителя по селектору (именно .our-friends-animals) при клике. Так как нужен его третий child.
        let namePets = (parentDivPets.childNodes[3].innerHTML);           //третий child innerHTML  -  имя питомца
        let popUpCard = document.querySelector('.pop-img');               //найти pop-img
        popUpCard.outerHTML = `<img class="pop-img" src="../../assets/images/pets-${namePets}.png"></img>`     //outerHTML подтянет картинку pets-ИМЯ ПИТОМЦА (из переменной)


        //для каждого пета в импортированном объекте pets8
        for (let pet of pets8) {
            let popName = document.querySelector('.pop-name');
            let popDogCat = document.querySelector('.pop-dog-cat');
            let popText = document.querySelector('.pop-text');
            let popUl = document.querySelector('.pop-ul');
            
            //если pet.name   ==    третий child в .our-friends-animals (напр. Jennifer == Jennifer), то заполнить данные по петсу
            if (pet.name == namePets) {                                          
            popName.textContent = `${pet.name}`;
            popDogCat.textContent = `${pet.type} - ${pet.breed}`;
            popText.textContent = `${pet.description}`;
            popUl.innerHTML = `\n <li class=\"pop-age\"><b class=\"pop-b\">Age:</b> ${pet.age}</li>\n <li class=\"pop-inoculations\"><b class=\"pop-b\">Inoculations:</b> ${pet.inoculations}</li>\n <li class=\"pop-diseases\"><b class=\"pop-b\">Diseases:</b> ${pet.diseases}</li>\n <li class=\"pop-inoculations\"><b class=\"pop-b\">Parasites:</b> ${pet.parasites}</li>\n`


            }
        }
    })};

//при клике на попап (но мимо карточки, только на затененную область) openClosePets
popUp.addEventListener('click', (curent) => {
    if(curent.target.classList.contains('pop-up')) {
        openClosePets()
    }
});

//при клике на крестик попапа openClosePets
close.addEventListener('click', () => {openClosePets()});


//---------------------пагинация-----------------------------------------------------------//

let number48 = [];                             //пустой массив для петсов

let number8 = [0,1,2,3,4,5,6,7];               //Числа 0-7 
number8.sort(()=>Math.random()-0.5);           //Рандом чисел 0-7


//из чисел создать массив массивов   [[Три][Три][Два]] и так шесть раз.
//Так не будет повторов каждые 6 петсов. Дальше будут мешаться подмассивы.
for (let i=0; i<6; i++) {
    let slice1 = number8.slice(0,3);
    let slice2 = number8.slice(3,6);
    let slice3 = number8.slice(6);
    number48.push(slice1.sort(()=>Math.random()-0.5), slice2.sort(()=>Math.random()-0.5), slice3.sort(()=>Math.random()-0.5));
}

//создать один массив из массива массивов (здесь просто рандом цифр 0-7 и так 6 раз)
const array48 = number48.flat();

//массив объектов с именем и url изображения
let imgPagination = [
    {src: "../../assets/images/pets-Katrine.png", name: 'Katrine'},
    {src: "../../assets/images/pets-Jennifer.png", name: 'Jennifer'},
    {src: "../../assets/images/pets-Woody.png", name: 'Woody'},
    {src: "../../assets/images/pets-Freddie.png", name: 'Freddie'},
    {src: "../../assets/images/pets-Charly.png", name: 'Charly'},
    {src: "../../assets/images/pets-Sophia.png", name: 'Sophia'},
    {src: "../../assets/images/pets-Timmy.png", name: 'Timmy'},
    {src: "../../assets/images/pets-Scarlett.png", name: 'Scarlett'},
    ]

//пустой массив
let array48SrcAndNames = [];

//создаем массив 48 штук с src и name петсов. 
//Пуш из переменной imgPagination (src и name) и индекс из массива 48 array48
for (let i=0; i<array48.length; i++) {
    array48SrcAndNames.push(imgPagination[array48[i]])
}



//функция бьет массив на размеры. Дальще в нее передадуться размеры, на которые бить
//в зависимости от размера экрана
function sliceArray(arr, size) {
    const pagination = [];
    for (let i=0; i<arr.length; i+=size) {
        const page = arr.slice(i, i + size);
        pagination.push(page);
    }
    return pagination;
}

//пустой массив, в который поместим массив массивов в зависимости от экрана
//6*8 или 8*6 или 12*4
let arrForPagination = [];

//функия вовращает результат функции выше (sliceArray(arr, size))
//получаем массив массивов в зависимсоти от экрана
function createArrPagination () {if (document.documentElement.clientWidth > 1279) {
    arrForPagination = sliceArray(array48SrcAndNames, 8);    
} else if (document.documentElement.clientWidth > 767){ 
    arrForPagination = sliceArray(array48SrcAndNames, 6);    
} else {
    arrForPagination = sliceArray(array48SrcAndNames, 3);   
    }
}



let tr = createArrPagination()

//при каждом ресайзе вызвать createArrPagination (массив массивов в зависимости от экрана)
//updateCards обновление карт петсов. Без этотго вызова при возврате экрана с 6 петсов на 8 петсов
//слетала последовательность. А именно 8 пестов, при включении на 6 петсов, 6 и 7 петсы переносились
//на вторую страницу, но при включении обратно на 8 - начинались не 0,1, а с 6,7.
window.addEventListener('resize', () => {
    createArrPagination();
    updateCards();
    toggleClassButton();
 })



//----------------------кнопки пагинации-------------------------------------

let petsPagination = document.querySelectorAll('.pets');                         //найти все фото петсов
let petsNamePagination = document.querySelectorAll('.h3-our-friends');           //найти все имена петсов     


const firstPage = document.querySelector('#firstPage');                             //кнопка <<
const previousPage = document.querySelector('#previousPage');                       //кнопка <
let numberPage = document.querySelector('#numberPage');                             //кнопка номер страницы
const nextPage = document.querySelector('#nextPage');                               //кнопка >
const lastPage = document.querySelector('#lastPage');                               //кнопка >>


//Присваевает элементам в petsPagination адрес для img и Имя.
//Например при 1280px, для каждого i петса src =
//= в массиве 8по6 [номер текущей страницы минус 1] и [i].
let updateCards = function() {

    //при переходе с одного расрешения на другое, например с 6 петсов на 8.
    //если номер страницы больше чем длинна массива с петсами (8 > 6), то 
    //текущая страница = длинна массива (8 стр станет 6)
    if (numberPage.innerText > arrForPagination.length) {
        numberPage.innerText = arrForPagination.length
    }
    for (let i=0; i<arrForPagination[0].length; i++) {
    petsPagination[i].src=arrForPagination[+numberPage.innerText-1][i].src;                               
    petsNamePagination[i].textContent = `${arrForPagination[+numberPage.innerText-1][i].name}`;
    }   
}


//выполнить функцию присваивания адреса img и имен
//выполняется при перезагрузке и при ресайзе
updateCards();


//замена классов на кнопках в зависимости от текущей старницы
let toggleClassButton = function () {
    if (+numberPage.innerText > 1 && +numberPage.innerText < arrForPagination.length) {
        firstPage.classList.remove('button-gray');
        firstPage.classList.add('button-black');
        previousPage.classList.remove('button-gray');
        previousPage.classList.add('button-black');
        nextPage.classList.remove('button-gray');
        nextPage.classList.add('button-black');
        lastPage.classList.remove('button-gray');
        lastPage.classList.add('button-black');
    } else if (+numberPage.innerText === 1) {
        firstPage.classList.add('button-gray');
        firstPage.classList.remove('button-black');
        previousPage.classList.add('button-gray');
        previousPage.classList.remove('button-black');
        nextPage.classList.remove('button-gray');
        nextPage.classList.add('button-black');
        lastPage.classList.remove('button-gray');
        lastPage.classList.add('button-black');
    } else if (+numberPage.innerText === arrForPagination.length) {
        firstPage.classList.remove('button-gray');
        firstPage.classList.add('button-black');
        previousPage.classList.remove('button-gray');
        previousPage.classList.add('button-black');
        nextPage.classList.add('button-gray');
        nextPage.classList.remove('button-black');
        lastPage.classList.add('button-gray');
        lastPage.classList.remove('button-black');
    }
}

//вызов замены классов кнопок при перезагрузке
toggleClassButton();


//при клике кнопок: изменить номер страницы (от него пляшет все остальное),
//обновить карты петсов, сменить классы на баттонах
previousPage.addEventListener('click', () => {
    numberPage.innerText--;
    updateCards();
    toggleClassButton();
});

nextPage.addEventListener('click', () => {
    numberPage.innerText++;
    updateCards();
    toggleClassButton();
});

firstPage.addEventListener('click', () => {  
    numberPage.innerText = '1';
    updateCards();
    toggleClassButton();
});

lastPage.addEventListener('click', () => {  
    numberPage.innerText = arrForPagination.length;
    updateCards();
    toggleClassButton();
});

