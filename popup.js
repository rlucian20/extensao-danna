// Elementos DOM
const timerDisplay = document.getElementById('timer-display')
const progressBar = document.getElementById('progress-bar')
const startButton = document.getElementById('start-button')
const pauseButton = document.getElementById('pause-button')
const continueButton = document.getElementById('continue-button') // Novo botão
const resetButton = document.getElementById('reset-button')

// Comunicar com o background.js
function sendMessage(action) {
    chrome.runtime.sendMessage({ action })
}

// Atualizar UI com estado recebido
function updateUI({ timeRemaining, isPaused }) {
    const minutes = Math.floor(timeRemaining / 60)
    const seconds = timeRemaining % 60

    // Atualiza o display do tempo
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(
        seconds
    ).padStart(2, '0')}`
    progressBar.style.width = `${(timeRemaining / 1800) * 100}%`

    // Controla os botões
    startButton.disabled = !isPaused && timeRemaining !== 30 * 60 // "Iniciar" só habilitado se estiver pausado e no início
    continueButton.disabled = !isPaused || timeRemaining === 30 * 60 // "Continuar" só habilitado se estiver pausado e não no início
    pauseButton.disabled = isPaused // "Pausar" desativado se estiver pausado
}

// Atualizações em tempo real
function listenToUpdates() {
    chrome.runtime.onMessage.addListener(message => {
        if (message.type === 'updateUI') {
            updateUI(message.state)
        }
    })
}

// Inicialização
chrome.runtime.sendMessage({ action: 'getState' }, response => {
    if (response) {
        updateUI(response)
        listenToUpdates()
    }
})

// Eventos de Botões
startButton.addEventListener('click', () => sendMessage('start'))
pauseButton.addEventListener('click', () => sendMessage('pause'))
continueButton.addEventListener('click', () => sendMessage('continue')) // Evento do novo botão
resetButton.addEventListener('click', () => sendMessage('reset'))
