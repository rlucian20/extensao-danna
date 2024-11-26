document.addEventListener('DOMContentLoaded', () => {
    // Função com atraso de 2 segundos
    setTimeout(() => {
        chrome.runtime.sendMessage({ action: 'getState' }, response => {
            if (response && response.isPaused) {
                return // Timer pausado, não faz nada
            }
            const userConfirmed = confirm('Deseja reiniciar a contagem?')
            if (userConfirmed) {
                chrome.runtime.sendMessage({ action: 'reset' })
                chrome.runtime.sendMessage({ action: 'start' })
            } else {
                chrome.runtime.sendMessage({ action: 'reset' })
                console.log('O usuário cancelou a ação.')
            }
        })
    }, 500) // 2 segundos de atraso
})
