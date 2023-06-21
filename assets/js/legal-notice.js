function initLegalNotice() {
    includeHTML();
    showActiveCategorieLegalNotice();
}


function showActiveCategorieLegalNotice() {
    setTimeout(function () {
        document.getElementById('nav-categories-4').classList.add('active-categorie');
        document.getElementById('nav-text-4').style.color = 'white';
        document.getElementById('nav-image-4').style.opacity = '1';
    }, 200);
}