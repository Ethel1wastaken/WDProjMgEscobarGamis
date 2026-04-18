let currentAccount = JSON.parse(localStorage.getItem("activeAccount"));
let createdAccounts = JSON.parse(localStorage.getItem("accounts"));

//SIDEBAR
let appearance = document.getElementById("design");
let account = document.getElementById("account");

function settingsAppearance() {
    console.log("clicked");
    appearance.classList.add("active");
    account.classList.remove("active");
}

function settingsAccount() {
    console.log("clicked");
    account.classList.add("active");
    appearance.classList.remove("active");
}

function closeNav() {
    document.getElementById("settingsSidebar").classList.remove("open");
    document.getElementById("settingsMain").classList.remove("open");
}

function openNav() {
    document.getElementById("settingsSidebar").classList.add("open");
    document.getElementById("settingsMain").classList.add("open");
}

//DETAILS DISPLAY
let userDisplay = document.getElementById("username");
let mailDisplay = document.getElementById("email");
let passDisplay = document.getElementById("password");

userDisplay.innerHTML += currentAccount.username; 
mailDisplay.innerHTML += currentAccount.email;
passDisplay.innerHTML += currentAccount.password;

//OPEN EDIT BUTTONS
function userEdit() {
    document.getElementById("newUser").showModal();
}

function mailEdit() {
    document.getElementById("newMail").showModal();
}

function passEdit() {
    document.getElementById("newPass").showModal();
}

//DIALOGS DISPLAY
let dialogUserDisplay = document.getElementById("currentUsername");
let dialogMailDisplay = document.getElementById("currentEmail");
let dialogPassDisplay = document.getElementById("currentPassword");

dialogUserDisplay.innerHTML += currentAccount.username; 
dialogMailDisplay.innerHTML += currentAccount.email;
dialogPassDisplay.innerHTML += currentAccount.password;

//DIALOG CANCEL
function userCancel() {
    newUser.close();
}

function mailCancel() {
    newMail.close();
}

function passCancel() {
    newPass.close();
}

//DIALOGS SUBMISSION
let userForm = document.getElementById("userName");
let mailForm = document.getElementById("eMail");
let passForm = document.getElementById("passWord");

userForm.addEventListener("submit", changeUser);
mailForm.addEventListener("submit", changeMail);
passForm.addEventListener("submit", changePass);

function changeUser(e) {
    e.preventDefault();

    if(confirm("Change username?")) {
        let newUsername = document.getElementById("newUsername").value;

        console.log(`New username: ${newUsername}`);

        //save in the list of accounts in local storage
        for(let i in createdAccounts) {
            if(createdAccounts[i].username == currentAccount.username) {
                createdAccounts[i].username = newUsername; 
                currentAccount.username = newUsername;
            }
        }

        localStorage.setItem("accounts", JSON.stringify(createdAccounts));

        //save in current account
        currentAccount.username = newUsername;

        console.log(currentAccount);

        localStorage.setItem("activeAccount", JSON.stringify(currentAccount));

        document.getElementById("newUser").close();
    }
}

function changeMail(e) {
    e.preventDefault();

    if(confirm("Change email?")) {
        let newEmail = document.getElementById("newEmail").value;

        console.log(`New email: ${newEmail}`);

        //save in the list of accounts in local storage
        for(let i in createdAccounts) {
            if(createdAccounts[i].email == currentAccount.email) {
                createdAccounts[i].email = newEmail; 
                currentAccount.email = newEmail;
            }
        }

        localStorage.setItem("accounts", JSON.stringify(createdAccounts));

        //save in current account
        console.log(currentAccount);

        localStorage.setItem("activeAccount", JSON.stringify(currentAccount));

        document.getElementById("newMail").close();
    }      
}

function changePass(e) {
    e.preventDefault();

    if(confirm("Change password?")) {
        let newPassword = document.getElementById("newPassword").value;

        console.log(`New password: ${newPassword}`)

        //save in the list of accounts in local storage
        for(let i in createdAccounts) {
            if(createdAccounts[i].password == currentAccount.password) {
                createdAccounts[i].password = newPassword; 
                currentAccount.password = newPassword;
            }
        }

        localStorage.setItem("accounts", JSON.stringify(createdAccounts));

        console.log(currentAccount);

        localStorage.setItem("activeAccount", JSON.stringify(currentAccount));

        document.getElementById("newPass").close();
    }
}

//DISABLE ACCOUNT
function deleteAccount() {
    if(confirm("Disable this account?")) {
        let listOfAccounts = createdAccounts;
        let activePassword = currentAccount.password;
        
        createdAccounts = listOfAccounts.filter(accountSearch);

        function accountSearch(obj) {
            return obj.password != activePassword;
        }

        currentAccount = undefined;

        localStorage.setItem("accounts", JSON.stringify(createdAccounts));
        localStorage.setItem("activeAccount", JSON.stringify(currentAccount));

        window.location.assign("../home.html");
    }
}