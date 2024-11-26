// Função para mostrar o dialogo de confirmação
function showConfirmDialog() {
    // Envia uma mensagem para o background.js para verificar o estado do timer
    chrome.runtime.sendMessage({ action: 'getState' }, response => {
        if (response && response.isPaused) {
            // Se o timer ainda estiver em andamento, não exibe o confirm
            //   alert('O tempo ainda está em andamento.')
            return
        }

        // Caso o timer tenha zerado, exibe o confirm
        const userConfirmed = confirm('Deseja reiniciar a contagem?')

        if (userConfirmed) {
            // Se o usuário clicar em "OK", envie mensagens para o background.js
            chrome.runtime.sendMessage({ action: 'reset' }) // Reseta o timer
            chrome.runtime.sendMessage({ action: 'start' }) // Inicia o timer novamente
        } else {
            chrome.runtime.sendMessage({ action: 'reset' }) // Reseta o timer
            console.log('O usuário cancelou a ação.')
        }
    })
}

// Chama a função para exibir a caixa de confirmação
showConfirmDialog()
