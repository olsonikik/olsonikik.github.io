const locationOptions = [
    "Istar 110 decibels on Monday",
    "Fitz 115 decibels on Saturday",
    "Construction site calle de Alonso Cano 115 decibels on Tuesday",
    "HOME cooking 115 decibels on Thursday",
    "Liberty 120 decibels on Thursday"
];

function login() {
    var username = document.getElementById('username').value;
    if (!username.includes('@')) {
        document.getElementById('email-error').style.display = 'block';
        return;
    }
    document.getElementById('email-error').style.display = 'none';
    document.getElementById('login-container').style.display = 'none';

    // Hide all tab contents
    var tabs = document.getElementsByClassName('tab');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].style.display = 'none';
    }

    // Show all main menu buttons
    var buttons = document.getElementById('app-container').getElementsByTagName('button');
    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].parentNode.id === 'app-container') {
            buttons[i].style.display = 'block';
        }
    }

    document.getElementById('app-container').style.display = 'block';
    updateProfileGreeting(username);
}


function showTab(tabId) {
    var tabs = document.getElementsByClassName('tab');
    var buttons = document.getElementById('app-container').getElementsByTagName('button');
    
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].style.display = 'none';
    }

    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].parentNode.id === 'app-container') {
            buttons[i].style.display = 'none';
        }
    }

    document.getElementById(tabId).style.display = 'block';

    if (tabId === 'locations') {
        displayRandomLocations();
    }
}

function goBack() {
    var tabs = document.getElementsByClassName('tab');
    var buttons = document.getElementById('app-container').getElementsByTagName('button');
    
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].style.display = 'none';
    }

    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].parentNode.id === 'app-container') {
            buttons[i].style.display = 'block';
        }
    }
}

function displayRandomLocations() {
    let locations = getRandomLocations();
    let locationsHtml = locations.map(location => `<p>${location}</p>`).join('');
    document.getElementById('locations').innerHTML = `<p>These were the locations where you encountered above the sound level of:</p>${locationsHtml}<button onclick="goBack()">Back</button>`;
}

function getRandomLocations() {
    let selectedLocations = [];
    while (selectedLocations.length < 3) {
        let randomIndex = Math.floor(Math.random() * locationOptions.length);
        let location = locationOptions[randomIndex];
        if (!selectedLocations.includes(location)) {
            selectedLocations.push(location);
        }
    }
    return selectedLocations;
}

function updateDecibelValue(value) {
    document.getElementById('decibel-value').innerText = value;
}

function confirmDecibelLevel() {
    var decibelLevel = document.getElementById('decibel-value').innerText;
    document.getElementById('decibel-level').innerText = decibelLevel;
    document.getElementById('confirmed-decibel').style.display = 'block';
    document.getElementById('decibel-range').style.display = 'none';
    document.getElementById('confirm-decibel').style.display = 'none';
    document.getElementById('change-decibel-container').style.display = 'block';
    localStorage.setItem('decibelLevel', decibelLevel);
}

function changeDecibelLevel() {
    document.getElementById('decibel-range').style.display = 'block';
    document.getElementById('change-decibel-container').style.display = 'none';
    document.getElementById('confirmed-decibel').style.display = 'none';
    document.getElementById('confirm-decibel').style.display = 'block';
}

function updateDecibelScheduleValue(value) {
    document.getElementById('decibel-schedule-value').innerText = value;
}

function updateTimeScheduleValue(minutes) {
    let hours = Math.floor(minutes / 60);
    let mins = minutes % 60;
    document.getElementById('time-schedule-value').innerText = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

function confirmDecibelSchedule() {
    document.getElementById('decibel-schedule-range').style.display = 'none';
    document.getElementById('confirm-decibel-schedule').style.display = 'none';
    document.getElementById('revert-schedule').style.display = 'block';
    localStorage.setItem('scheduledDecibelLevel', document.getElementById('decibel-schedule-value').innerText);
    updateScheduledChangeInProfile();
}

function confirmTimeSchedule() {
    document.getElementById('time-schedule-range').style.display = 'none';
    document.getElementById('confirm-time-schedule').style.display = 'none';
    localStorage.setItem('scheduledTime', document.getElementById('time-schedule-value').innerText);
    updateScheduledChangeInProfile();
}

function revertSchedule() {
    document.getElementById('decibel-schedule-range').style.display = 'block';
    document.getElementById('time-schedule-range').style.display = 'block';
    document.getElementById('confirm-decibel-schedule').style.display = 'block';
    document.getElementById('confirm-time-schedule').style.display = 'block';
    document.getElementById('revert-schedule').style.display = 'none';
}

function updateScheduledChangeInProfile() {
    let scheduledTime = localStorage.getItem('scheduledTime') || 'Not set';
    let scheduledDecibelLevel = localStorage.getItem('scheduledDecibelLevel') || 'Not set';
    document.getElementById('scheduled-change').innerText = `Your decibel level will change at ${scheduledTime} at a level of ${scheduledDecibelLevel}`;
    document.getElementById('scheduled-change').style.display = 'block';
}

function updateProfileGreeting(username) {
    var namePart = username.split('@')[0];
    document.getElementById('profile-greeting').innerText = 'Hi ' + namePart;
}

function logout() {
    var tabs = document.getElementsByClassName('tab');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].style.display = 'none';
    }

    document.getElementById('app-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}
