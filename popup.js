// ==============================
// Elementos DOM
// ==============================
const timerDisplay = document.getElementById('timer-display')
const progressBar = document.getElementById('progress-bar')
const startButton = document.getElementById('start-button')
const pauseButton = document.getElementById('pause-button')
const continueButton = document.getElementById('continue-button')
const resetButton = document.getElementById('reset-button')

// ==============================
// Função para comunicar com o background.js
// ==============================
function sendMessage(action) {
    chrome.runtime.sendMessage({ action })
}

// ==============================
// Atualizar a UI com o estado recebido
// ==============================
function updateUI({ timeRemaining, isPaused }) {
    const minutes = Math.floor(timeRemaining / 60)
    const seconds = timeRemaining % 60

    // Atualiza o display do tempo
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(
        seconds
    ).padStart(2, '0')}`

    progressBar.style.width = `${(timeRemaining / 1800) * 100}%`

    startButton.disabled = !isPaused && timeRemaining !== 30 * 60
    continueButton.disabled = !isPaused || timeRemaining === 30 * 60
    pauseButton.disabled = isPaused
}

// ==============================
// Atualizações em tempo real do estado
// ==============================
function listenToUpdates() {
    chrome.runtime.onMessage.addListener(message => {
        if (message.type === 'updateUI') {
            updateUI(message.state)
        }
    })
}

// ==============================
// Inicialização do estado
// ==============================
chrome.runtime.sendMessage({ action: 'getState' }, response => {
    if (response) {
        updateUI(response)
        listenToUpdates()
    }
})

// ==============================
// Eventos de Botões
// ==============================
startButton.addEventListener('click', () => sendMessage('start'))
pauseButton.addEventListener('click', () => sendMessage('pause'))
continueButton.addEventListener('click', () => sendMessage('continue'))
resetButton.addEventListener('click', () => sendMessage('reset'))
