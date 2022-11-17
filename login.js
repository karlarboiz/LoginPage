"use strict";

const account1 = {
    name: 'Dickie',
    email: 'dickensallinone@gmail.com',
    password: 'allinone',
    notification: 4,
    new: 3
}

const account2 = {
    name: 'Kickie',
    email: 'parkers@gmail.com',
    password: 'nonetheless',
    notification: 7,
    new: 2
}

const allSlides = document.querySelectorAll('.st');
let currentVal = 0;
let timer;
let countForTime = 10800;
let countOfTries = 3;
let warningDur;

const slideShow = function(){
    allSlides.forEach(val => {
        val.classList.add('nonvisible');
        val.classList.remove('visible');
    })
    currentVal++;
    let account = document.querySelector('.nonvisible-'+currentVal+'');
    
    if(currentVal === allSlides.length) {
        currentVal = 0;
    }

    account.classList.remove('nonvisible');
    account.classList.add('visible');

    timer = setTimeout(slideShow, 3000);
    
}

const hideWarning = () => {
    errorMsgs.forEach(val => val.classList.add('warning-inactive'));
}

const loginMain = document.querySelector('.login-page');
const contentLogin = document.querySelector('.content-login');
const profileLogin = document.querySelector('.profile');
const iconProfile = document.querySelector('.icon');
const reminderProfile = document.querySelector('.reminder');
const welcome = document.querySelector('.welcome-note');
const noteVal = document.querySelector('.note-value');
const newVal = document.querySelector('.new-value');
const slideshowVer = document.querySelector('.slide');
const errorMsgs = document.querySelectorAll('.pop-up');
const accounts = [account1, account2];
let valEmail = document.querySelector('#email-input');
let valPass = document.querySelector('#password-input');
const submit = document.querySelector('.login__btn');
let accountReq;

const showLogin = () => {  
    reminderProfile.classList.remove('reminder-hide');
    reminderProfile.classList.add('reminder-show');
    welcome.classList.remove('hidden');
    welcome.textContent = 'Welcome back, '+accountReq.name+'!';
    iconProfile.classList.add('icon-final');
    slideshowVer.classList.remove('slideshow');
    slideshowVer.classList.add('hidden');
    clearTimeout(timer);
}

const showLoginPage = () => {
    loginMain.className = 'login-page__visible';
    contentLogin.classList.add('hidden');
    profileLogin.classList.remove('profile-initial');
    profileLogin.classList.add('profile-show');
}

submit.addEventListener('click', function(){
    accountReq = accounts.find(function(val,i, array){
        if(valEmail.value === val.email){
            return val;
        }

    })

    if(!accountReq) {
        countOfTries--;
        countForTime += 7200;
        errorMsgs[2].classList.remove('warning-inactive');
        setTimeout(hideWarning, 3000);
    }

    if(valPass.value !== accountReq.password) {
        countOfTries--;
        countForTime += 7200;
        if(countOfTries > 0) {
            errorMsgs[0].classList.remove('warning-inactive');
            setTimeout(hideWarning, 3000);
        }

        else if(countOfTries === 0) {
            errorMsgs[3].classList.remove('warning-inactive');
            setTimeout(hideWarning, 3000);
            loginMain.style.opacity = "0";
            loginMain.style.transition = "opacity 1s ease-out";
        }
    }

    if(valPass.value === '' && valEmail.value === '') {
        errorMsgs[1].classList.remove('warning-inactive');
        setTimeout(hideWarning, 3000);
    }


    if(valPass.value === accountReq.password) {
        welcome.classList.add('hidden');
        slideshowVer.classList.remove('hidden');
        slideshowVer.classList.add('slideshow');

        setTimeout(slideShow, 500);
        showLoginPage();
        setTimeout(showLogin, countForTime);
    }

})




