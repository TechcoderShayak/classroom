const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const participantsList = document.getElementById('participantsList');
const joinButton = document.getElementById('joinButton');
const leaveButton = document.getElementById('leaveButton');
const toggleAudioButton = document.getElementById('toggleAudio');
const toggleVideoButton = document.getElementById('toggleVideo');

let localStream;
let remoteStream;

// Function to start video streaming
async function startVideo() {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideo.srcObject = localStream;
    } catch (error) {
        console.error('Error accessing camera and microphone:', error);
    }
}

// Function to toggle audio
function toggleAudio() {
    localStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
    });
}

// Function to toggle video
function toggleVideo() {
    localStream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
    });
}

// Function to join the classroom
function joinClassroom() {
    const studentName = document.getElementById('studentName').value;
    
    if (studentName.trim() === "") {
        alert("Please enter your name.");
        return;
    }

    const participantItem = document.createElement('li');
    participantItem.textContent = studentName;
    participantsList.appendChild(participantItem);

    // Simulate joining the classroom
    joinButton.disabled = true;
    leaveButton.disabled = false;
    toggleAudioButton.disabled = false;
    toggleVideoButton.disabled = false;
    startVideo();
}
const shareScreenButton = document.getElementById('shareScreen');
let sharingScreen = false;
let currentStream = null;

async function startScreenSharing() {
    try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia();
        localVideo.srcObject = screenStream;
        currentStream = screenStream;
        sharingScreen = true;
    } catch (error) {
        console.error('Error starting screen sharing:', error);
    }
}


function toggleScreenSharing() {
    if (sharingScreen) {
        localVideo.srcObject = localStream;
        currentStream = localStream;
        sharingScreen = false;
    } else {
        startScreenSharing();
    }
}
const chatHistory = document.getElementById('chatHistory');
const messageInput = document.getElementById('messageInput');
const sendMessageButton = document.getElementById('sendMessage');
let messages = []; // Store messages here

sendMessageButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message.trim() === "") return;

    // Send the message over the WebSocket connection or Socket.io
    // ... (send the message to the server)

    // Store the message locally
    messages.push({ sender: 'You', message });
    updateChatHistory();

    // Clear the input field
    messageInput.value = "";
});

function updateChatHistory() {
    chatHistory.innerHTML = ""; // Clear existing content

    for (const messageData of messages) {
        appendMessage(messageData.sender, messageData.message);
    }
}
// ... (existing JavaScript code) ...


// ... (existing JavaScript code) ...


const durationElement = document.getElementById('duration');

let classStartTime;
let intervalId;

joinButton.addEventListener('click', () => {
    classStartTime = new Date();
    joinButton.disabled = true;
    leaveButton.disabled = false;
    intervalId = setInterval(updateDuration, 1000); // Update every second
});

leaveButton.addEventListener('click', () => {
    clearInterval(intervalId); // Stop the interval
   joinButton.disabled = false;
    leaveButton.disabled = true;
});

function updateDuration() {
    const currentTime = new Date();
    const classDuration = calculateDuration(classStartTime, currentTime);
    durationElement.textContent = formatDuration(classDuration);
}

function calculateDuration(startTime, endTime) {
    return endTime - startTime; // Time difference in milliseconds
}

function formatDuration(duration) {
    const seconds = Math.floor(duration / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${formatTimeComponent(hours)}:${formatTimeComponent(minutes)}:${formatTimeComponent(remainingSeconds)}`;
}

function formatTimeComponent(value) {
    return value < 10 ? `0${value}` : value;
}
// ... (existing JavaScript code) ...



toggleVideoButton.addEventListener('click', toggleVideo);



function displayInitialsIcon(name) {
    const initials = name.split(' ').map(part => part[0].toUpperCase()).join('');
    initialsIcon.textContent = initials;
    initialsIcon.style.display = 'block';
}

// ... (rest of JavaScript code) ...

// ... (rest of JavaScript code) ...

// ... (rest of JavaScript code) ...

function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message');
    messageElement.innerHTML = `<span class="sender">${sender}</span>: ${message}`;
    chatHistory.appendChild(messageElement);
}

// Establish WebSocket connection

shareScreenButton.addEventListener('click', toggleScreenSharing);

// Function to leave the classroom
function leaveClassroom() {
    // Simulate leaving the classroom
    joinButton.disabled = false;
    leaveButton.disabled = true;
    toggleAudioButton.disabled = true;
    toggleVideoButton.disabled = true;
    localStream.getTracks().forEach(track => track.stop());
    localVideo.srcObject = null;
}

joinButton.addEventListener('click', joinClassroom);
leaveButton.addEventListener('click', leaveClassroom);
toggleAudioButton.addEventListener('click', toggleAudio);
toggleVideoButton.addEventListener('click', toggleVideo);
// ... (existing JavaScript code) ...

const shareSubjectSelect = document.getElementById('shareSubjectSelect');
const generateLinkButton = document.getElementById('generateLinkButton');
const linkOutput = document.getElementById('linkOutput');

// Populate the subjects in the select dropdown
subjects.forEach(subject => {
    const option = document.createElement('option');
    option.value = subject;
    option.textContent = subject;
    shareSubjectSelect.appendChild(option);
});

// Handle generate link button click
generateLinkButton.addEventListener('click', () => {
    const selectedSubject = shareSubjectSelect.value;
    
    if (selectedSubject) {
        // Generate a unique link based on the selected subject
        const link = generateLink(selectedSubject);
        linkOutput.value = link;
    } else {
        alert('Please select a subject to generate the link.');
    }
});
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Simulated database (replace with a real database)
const linksDB = {};

app.use(bodyParser.json());

// Endpoint for generating links
app.post('/generate-link', (req, res) => {
    const subject = req.body.subject;
    const link = generateLink(subject);
    linksDB[subject] = link;
    res.json({ link });
});

function generateLink(subject) {
    // Implement your secure link generation logic here
    // Example: return `https://your-website.com/meeting/${subject}`
    return `https://example.com/meeting/${subject}`;
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


function generateLink(subject) {
    // Implement your link generation logic here
    // Example: return `https://your-website.com/meeting/${subject}`
    return `https://example.com/meeting/${subject}`;
}
