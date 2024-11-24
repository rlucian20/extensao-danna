let timeRemaining = 30 * 60 // 1 minuto para teste
let isPaused = true
let timer

// Atualizar o texto no ícone
function updateBadge() {
    const minutes = Math.floor(timeRemaining / 60)
    const seconds = timeRemaining % 60
    const badgeText = `${minutes}:${String(seconds).padStart(2, '0')}`
    chrome.action.setBadgeText({ text: badgeText })
    chrome.action.setBadgeBackgroundColor({ color: '#4688F1' })
}

// Iniciar o Timer
function startTimer() {
    if (!isPaused || timeRemaining !== 30 * 60) return // Não iniciar se já estiver rodando ou se não for o início
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
        resetTimer() // Reseta para 30 minutos
        startTimer() // Reinicia o cronômetro
    }
}

// Pausar o Timer
function pauseTimer() {
    isPaused = true
    clearInterval(timer)
    broadcastState()
}

// Continuar o Timer
function continueTimer() {
    if (!isPaused || timeRemaining === 30 * 60) return // Não continuar se não estiver pausado ou se for o início
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
        resetTimer() // Reseta para 30 minutos
        startTimer() // Reinicia o cronômetro
    }
}

// Resetar o Timer
function resetTimer() {
    isPaused = true
    clearInterval(timer)
    timeRemaining = 30 * 60 // Resetar para 1 minuto
    updateBadge()
    broadcastState()
}

// Enviar estado para o popup.js
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

// Abrir a página de notificação
function openNotificationPage() {
    chrome.tabs.create({
        url: chrome.runtime.getURL('notification.html') // Caminho para a página de notificação
    })
}

// Mensagens recebidas do popup.js
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

// Atualizar o ícone ao carregar
updateBadge()
