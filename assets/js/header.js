function showLogout() {
    document.getElementById('logout').innerHTML = generateLogoutButton();
}


function generateLogoutButton() {
    return /*html*/ `
    <div class="popup-frame-logout" id="hide-logout" onclick="hideLogout()">
        <div onclick="doNotClose(event)">
            <div class="logout-btn">
                <div class="header-category-rs">
                    <a class="header-links-rs" href="help.html">Help</a>
                </div>
                <div class="header-category-rs">
                    <a class="header-links-rs" href="privacy.html">Privacy</a>
                </div>
                <div class="header-category-rs">
                    <a class="header-links-rs" href="legal-notice.html">Legal notice</a>
                </div>
                <div onclick="logout()">Log out</div>
            </div>
        </div>
    </div>
    `;
}


function doNotClose(event) {
    event.stopPropagation();
}


function hideLogout() {
    document.getElementById('hide-logout').classList.add('d-none');
}


async function logout() {
    activeUser = [];
    await backend.setItem('activeUser', JSON.stringify(activeUser));
    window.location.href = 'index.html';
}