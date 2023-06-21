function showActiveCategorie(i) {
    document.getElementById(`nav-categories-${i}`).classList.add('active-categorie');
    document.getElementById(`nav-text-${i}`).style.color = 'white';
    document.getElementById(`nav-image-${i}`).style.opacity = '1';
}


function removeActiveCategorie() {
    for (let i = 0; i < 6; i++) {
        document.getElementById(`nav-categories-${i}`).classList.remove('active-categorie');
        document.getElementById(`nav-text-${i}`).style.color = '#CDCDCD';
        document.getElementById(`nav-image-${i}`).style.opacity = '0.6';
    }
}