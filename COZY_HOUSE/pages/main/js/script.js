//JSON
import {pets8} from './pets8.js'                                         //объект со всеми 8 питомцами (полное описание)

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


//-------------------------бесконечная карусель--------------------------------------------------

let petsCarousel = document.querySelectorAll('.pets');                         //найти все фото петсов
let petsNameCarousel = document.querySelectorAll('.h3-our-friends');           //найти все имена петсов 
let divCarousel = document.querySelector('.div-our-friends-big-b');            //найти div карусель

//краткий массив петсов (пути и имя)
let imgCarousel = [
        {src: "../../assets/images/pets-katrine.png", name: 'Katrine'},
        {src: "../../assets/images/pets-jennifer.png", name: 'Jennifer'},
        {src: "../../assets/images/pets-woody.png", name: 'Woody'},
        {src: "../../assets/images/pets-freddie.png", name: 'Freddie'},
        {src: "../../assets/images/pets-charly.png", name: 'Charly'},
        {src: "../../assets/images/pets-sophia.png", name: 'Sophia'},
        {src: "../../assets/images/pets-timmy.png", name: 'Timmy'},
        {src: "../../assets/images/pets-scarlett.png", name: 'Scarlett'},
        ]

let arr = [0,1,2,3,4,5,6,7];
arr.sort(()=>Math.random()-0.5)
        
let matrix = [[arr[0], arr[1], arr[2]],
              [arr[3], arr[4], arr[5]],
              [arr[6], arr[7], arr[0]]];

let arrFromMatrix = [];
arrFromMatrix.push(matrix[0][0], matrix[0][1], matrix[0][2], matrix[1][0], matrix[1][1], matrix[1][2], matrix[2][0], matrix[2][1], matrix[2][2])                    
                        
    
//фото петса = массив петсов путь с тем же индексом
//имя петса = массив петсов имя с тем же индексом 
for (let i=0; i<petsCarousel.length; i++) {
    petsCarousel[i].src=imgCarousel[arrFromMatrix[i]].src;                               
    petsNameCarousel[i].textContent = `${imgCarousel[arrFromMatrix[i]].name}`;
}   
    
//для стhелки влево

const buttonArrowLeft = document.querySelector('.button-arrow-left');         //стрелка влево

const moveLeft = () => {                                                     
    divCarousel.classList.add('transition-left');                             //добавить карусели класс transition-left
    buttonArrowLeft.removeEventListener('click', moveLeft);                   //во время движения влево - запрет на клик по стрелке влево
    buttonArrowRight.removeEventListener('click', moveRight);                 //во время движения влево - запрет на клик по стрелке вправо
}           

buttonArrowLeft.addEventListener('click', moveLeft);

//для стрелки вправо

const buttonArrowRight = document.querySelector('.button-arrow-right');         //стрелка вправо

const moveRight = () => {                                                      
    divCarousel.classList.add('transition-right');                             //добавить карусели класс transition-right
    buttonArrowRight.removeEventListener('click', moveRight);                 //во время движения влево - запрет на клик по стрелке вправо
    buttonArrowLeft.removeEventListener('click', moveLeft);                   //во время движения влево - запрет на клик по стрелке влево
}           

buttonArrowRight.addEventListener('click', moveRight);

//для завершения анимации

divCarousel.addEventListener('animationend', (animationEvent) => {                        
    if (animationEvent.animationName === 'move-left') {                       //если имя анимации мув-левт , то:
        divCarousel.classList.remove('transition-left');                      //удалить класс транзишн-лефт
        divCarousel.classList.remove('transition-right');                     //удалить класс транзишн-райт  

    matrix[2] = matrix[1];                                                    //сдвигаем подмассивы в матрице              
    matrix[1] = matrix[0];                                                    //сдвигаем подмассивы в матрице   
    let arrNumers = [0, 1, 2, 3, 4, 5, 6, 7]                                  //массив чисел по порядку
        
    let pets5from8 = [];                                                      //получить числа != числам среднего массива (для нормального рандома, чтобы не повторялись петсы в двух строках подряд)
    for (let i=0; i<arrNumers.length; i++) {
        if(!matrix[1].includes(arrNumers[i])) {
           pets5from8.push(arrNumers[i]);
           pets5from8.sort(()=>Math.random()-0.5)                             //перемешать 5 цифр рандомно
    }
    }
        
    matrix[0]= [pets5from8[0], pets5from8[1], pets5from8[2]];                 //новый третий подмассив
  
    //новый массив в который пушим все цифры матрицы
    let arrFromMatrix = [];
    arrFromMatrix.push(matrix[0][0], matrix[0][1], matrix[0][2], matrix[1][0], matrix[1][1], matrix[1][2], matrix[2][0], matrix[2][1], matrix[2][2])                                      

    //для каждого i петса img и имя = imgCarousel[i]
    for (let i=0; i<petsCarousel.length; i++) {                
        petsCarousel[i].src=imgCarousel[arrFromMatrix[i]].src;                               
        petsNameCarousel[i].textContent = `${imgCarousel[arrFromMatrix[i]].name}`;
    }

    //Здесь для "права". Все как для "лево", только наоборот
    } else {
        divCarousel.classList.remove('transition-left');                      //удалить класс транзишн-лефт
        divCarousel.classList.remove('transition-right');                     //удалить класс транзишн-райт  

        matrix[0] = matrix[1];
        matrix[1] = matrix[2];
        let arrNumers = [0, 1, 2, 3, 4, 5, 6, 7]
        
        let pets5from8 = [];
        for (let i=0; i<arrNumers.length; i++) {
         if(!matrix[1].includes(arrNumers[i])) {
              pets5from8.push(arrNumers[i]);
              pets5from8.sort(()=>Math.random()-0.5)       
        }

        divCarousel.classList.remove('transition-right');                         //в конце анимации карусели убрать класс транзишн райт
        divCarousel.classList.remove('transition-left');                         //в конце анимации карусели убрать класс транзишн лефт
        buttonArrowLeft.addEventListener('click', moveLeft);                     //в конце анимации разрешить кликать стрелку влево         
        buttonArrowRight.addEventListener('click', moveRight);                   //в конце анимации разрешить кликать стрелку вправо
    }
        
    matrix[2]= [pets5from8[0], pets5from8[1], pets5from8[2]];
        
    let arrFromMatrix = [];
    arrFromMatrix.push(matrix[0][0], matrix[0][1], matrix[0][2], matrix[1][0], matrix[1][1], matrix[1][2], matrix[2][0], matrix[2][1], matrix[2][2])                    
 

    for (let i=0; i<petsCarousel.length; i++) {                
        petsCarousel[i].src=imgCarousel[arrFromMatrix[i]].src;                               
        petsNameCarousel[i].textContent = `${imgCarousel[arrFromMatrix[i]].name}`;
    }
    }
    buttonArrowLeft.addEventListener('click', moveLeft);                     //в конце анимации разрешить кликать стрелку влево     
    buttonArrowRight.addEventListener('click', moveRight);                   //в конце анимации разрешить кликать стрелку вправо

});