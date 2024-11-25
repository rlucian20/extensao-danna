// ==========================
//  Definição de variáveis globais
// ==========================
let timeRemaining = 0.1 * 60 //
let isPaused = true
let timer

// ===============================
//  Funções de atualização do ícone
// ===============================
function updateBadge() {
    const minutes = Math.floor(timeRemaining / 60)
    const seconds = timeRemaining % 60
    const badgeText = `${minutes}:${String(seconds).padStart(2, '0')}`
    chrome.action.setBadgeText({ text: badgeText })
    chrome.action.setBadgeBackgroundColor({ color: '#4688F1' })
}

// ============================
//  Funções de controle do timer
// ============================
function startTimer() {
    if (!isPaused || timeRemaining !== 0.1 * 60) return
    isPaused = false
    timer = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--
            updateBadge()
            broadcastState()
        } else {
            clearInterval(timer)
            openNotificationPage() // Abrir a página de notificação
        }
    }, 1000)

    if (timeRemaining === 0) {
        resetTimer()
        startTimer()
    }
}

function pauseTimer() {
    isPaused = true
    clearInterval(timer)
    broadcastState()
}

function continueTimer() {
    if (!isPaused || timeRemaining === 0.1 * 60) return
    isPaused = false
    timer = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--
            updateBadge()
            broadcastState()
        } else {
            clearInterval(timer)
            openNotificationPage() // Abrir a página de notificação
        }
    }, 1000)
    if (timeRemaining === 0) {
        resetTimer()
        startTimer()
    }
}

function resetTimer() {
    isPaused = true
    clearInterval(timer)
    timeRemaining = 0.1 * 60 // Resetar para 1 minuto
    updateBadge()
    broadcastState()
}

// ================================
//  Funções de comunicação de estado
// ================================
function broadcastState() {
    chrome.storage.local.set({ appState: { timeRemaining, isPaused } })

    try {
        chrome.runtime.sendMessage({
            type: 'updateUI',
            state: { timeRemaining, isPaused }
        })
    } catch (error) {
        console.warn('Nenhum listener ativo para a mensagem.')
    }
}

function openNotificationPage() {
    chrome.tabs.create({
        url: chrome.runtime.getURL('notification.html') // Caminho para a página de notificação
    })
}

// ===========================
//  Listener de mensagens do popup.js
// ===========================
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.action) {
        case 'start':
            startTimer()
            break
        case 'pause':
            pauseTimer()
            break
        case 'continue':
            continueTimer()
            break
        case 'reset':
            resetTimer()
            break
        case 'getState':
            sendResponse({ timeRemaining, isPaused })
            break
        default:
            console.warn('Ação desconhecida:', message.action)
    }
})

// ============================
//  Inicialização do ícone
// ============================
updateBadge()
