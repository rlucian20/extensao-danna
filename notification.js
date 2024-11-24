// // Botão para reiniciar o cronômetro e iniciar automaticamente
// document.getElementById('reset-button').addEventListener('click', () => {
//     chrome.runtime.sendMessage({ action: 'reset' }, () => {
//         chrome.runtime.sendMessage({ action: 'start' }) // Iniciar após o reset
//     })
//     window.close() // Fecha a página de notificação
// })

// // Botão para fechar a página de notificação e apenas reiniciar
// // document.getElementById('close-button').addEventListener('click', () => {
// //     chrome.runtime.sendMessage({ action: 'reset' }) // Apenas resetar o cronômetro
// //     window.close() // Fecha a página de notificação
// // })

// document.getElementById('close-button').addEventListener('click', () => {
//     chrome.runtime.sendMessage({ action: 'reset' }, () => {
//         chrome.runtime.sendMessage({ action: 'start' }) // Iniciar após o reset
//     })
//     window.close() // Fecha a página de notificação
// })
