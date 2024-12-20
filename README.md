# Danna - Saúde e Bem-Estar

A extensão **Danna** foi desenvolvida para ajudar a gerenciar o tempo de trabalho e garantir pausas saudáveis durante o expediente. Ela é focada na promoção de atividades como alongamentos, hidratação e lembretes para ir ao banheiro, visando aumentar a produtividade e melhorar a saúde do usuário.

## Funcionalidades

-   **Cronômetro de intervalo**: Monitore o tempo de trabalho com a possibilidade de pausas.
-   **Alertas**: Lembretes para realizar alongamentos, hidratar-se e ir ao banheiro.
-   **Controle de tempo**: Inicie, pause, continue ou reinicie o cronômetro de forma simples.
-   **Ícone interativo**: O ícone da extensão exibe o tempo restante do cronômetro, facilitando o controle sem precisar abrir o popup.

## Tecnologias

-   **HTML/CSS**: Estrutura e estilização do popup e da página de notificação.
-   **JavaScript**: Funcionalidade principal da extensão, controle do cronômetro e comunicação entre os componentes.
-   **Chrome APIs**: Uso das APIs do Chrome para interações como manipulação do ícone e armazenamento de estado.

## Estrutura de Arquivos

```
Danna/
├── background.js # Lógica do cronômetro e controle de estado
├── fimContagem.html # Pagina quando o time e finalizado
├── fimContagem.js # Lógica da pagina fimContagem.html
├── manifest.json # Manifesto da extensão
├── popup.html # HTML do popup de controle
├── notification.html # Página de notificação (alongamentos, água, sanitários)
├── popup.js # Script de controle do popup
├── icons/ # Ícones da extensão
│ ├── icon16.png
│ ├── icon48.png
│ └── icon128.png
├── bootstrap/ # Arquivos de dependência do Bootstrap
├── styles.css # Estilo da interface
└── notification.css # Estilo da página de notificação
```

## Como Usar

### Instalação

1. Baixe ou clone este repositório.
2. Acesse o **chrome://extensions/** no navegador Chrome.
3. Habilite o **Modo de desenvolvedor** no canto superior direito.
4. Clique em **Carregar sem compactação** e selecione a pasta do projeto.
5. A extensão estará disponível no seu navegador.

### Controle do Cronômetro

No popup da extensão, você encontrará as seguintes opções:

-   **Iniciar**: Começa o cronômetro de 30 minutos.
-   **Pausar**: Pausa o cronômetro, permitindo retomá-lo mais tarde.
-   **Continuar**: Retoma o cronômetro após uma pausa.
-   **Resetar**: Zera o cronômetro e reinicia de 30 minutos.

Além disso, o ícone da extensão mostrará o tempo restante em formato `MM:SS`, e a barra de progresso será preenchida conforme o tempo passa.

### Lembretes de Saúde

Na página de notificação, você encontrará dicas e lembretes para melhorar seu bem-estar durante o trabalho:

-   **Alongamentos**: Imagens e dicas de alongamentos para evitar lesões.
-   **Hidratação**: Lembretes sobre a importância de beber água.
-   **Sanitários**: Dicas sobre a importância de fazer pausas para ir ao banheiro.

### Compatibilidade

A Danna é uma extensão desenvolvida para ser utilizada no Google Chrome ou em navegadores baseados no mesmo núcleo, como o Microsoft Edge, Brave, Opera e outros que utilizam o Chromium como motor de renderização.
A extensão pode não funcionar corretamente em navegadores que não utilizam o Chromium, como o Mozilla Firefox ou o Safari. Para garantir uma experiência de uso adequada, recomendamos o uso de um navegador baseado no Chromium.

## Permissões

A extensão solicita as seguintes permissões:

-   `storage`: Para salvar o estado do cronômetro.
-   `tabs`: Para abrir a página de notificação quando necessário.

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Desenvolvido com 💙 para melhorar a sua saúde e produtividade no trabalho! 🧑‍💻✨
