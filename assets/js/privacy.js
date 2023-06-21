function initPrivacy() {
    includeHTML();
    showActiveCategoriePrivacy();
}


function showActiveCategoriePrivacy() {
    setTimeout(function () {
        document.getElementById('nav-categories-5').classList.add('active-categorie');
        document.getElementById('nav-text-5').style.color = 'white';
        document.getElementById('nav-image-5').style.opacity = '1';
    }, 200);
}