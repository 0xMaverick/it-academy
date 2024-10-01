document.querySelector('.burger img').onclick = function() {
    document.querySelector('nav ul').classList.add('mob-menu');
}

document.querySelector('#close').onclick = function() {
    document.querySelector('nav ul').classList.remove('mob-menu');
}