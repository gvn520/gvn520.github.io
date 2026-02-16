// Credenciais corretas
const USUARIO_CORRETO = "Isabelle";
const SENHA_CORRETA = "10/11";

// Variáveis de áudio (declarar antes de usar)
let isPlaying = false;
const audio = document.getElementById("background-music");

function validarLogin(event) {
    event.preventDefault();
    
    const usuario = document.getElementById("usuario").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const erroDiv = document.getElementById("erro");
    
    // Limpar mensagem de erro anterior
    erroDiv.textContent = "";
    
    // Validar login
    if (usuario.toLowerCase() === USUARIO_CORRETO.toLowerCase() && 
        senha === SENHA_CORRETA) {
        
        // Login correto - mostrar a pergunta
        document.getElementById("login-container").style.display = "none";
        document.getElementById("main-container").style.display = "flex";
        
        // Limpar formulário
        document.getElementById("login-form").reset();
    } else {
        // Login incorreto
        erroDiv.textContent = "❌ Usuário ou senha incorretos. Tente novamente!";
        document.getElementById("senha").value = "";
    }
}
function responderSim() {
    // Mudar o título da aba do navegador
    document.title = "EEEBBBAAA!";
    
    const respostaDiv = document.getElementById("resposta");
    respostaDiv.innerHTML = `
        <div class="sucesso">
            🎉🎉🎉🎉🎉🎉 EEEEEBBBBBAAAAAA 🎉🎉🎉🎉🎉🎉
            <br>
            EU TE AMO MUITO MEU AMOR, EU VOU SER SEMPRE A PUTINHA OBEDIENTE COMPLETAMENTE CARENTE E OBCECADA NA MINHA MAMÃE
            <br>
            <span class="fireworks">EU TI AMOOOOOOOO💕💕💕💕</span>
        </div>
    `;
    
    // Desabilitar botões
    document.querySelectorAll(".btn-yes, .btn-no").forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = "0.5";
        btn.style.cursor = "default";
    });
    
    // Tocar a música quando clicar em SIM
    setTimeout(() => {
        const audio = document.getElementById("background-music");
        audio.muted = false;
        audio.play().catch(err => {
            console.log("Erro ao reproduzir música: ", err);
        });
        isPlaying = true;
        console.log("🎵 Música tocando após confirmação!");
    }, 500);
    
    // Criar confete (efeito visual)
    criarConfete();
    
    // Esconder a caixa de proposta após 3 segundos
    setTimeout(() => {
        const proposalBox = document.querySelector(".proposal-box");
        proposalBox.style.transition = "opacity 0.5s ease";
        proposalBox.style.opacity = "0";
        
        // Depois remover a visibilidade para liberar a área
        setTimeout(() => {
            proposalBox.style.display = "none";
        }, 500);
    }, 3000);
}

function responderNao() {
    const botaoNao = document.querySelector(".btn-no");
    
    // Mover o botão "Não" para um local aleatório
    const randomX = Math.random() * 200 - 100;
    const randomY = Math.random() * 200 - 100;
    
    botaoNao.style.transform = `translate(${randomX}px, ${randomY}px)`;
    botaoNao.style.transition = "all 0.3s ease";
}

function criarConfete() {
    const confeteChars = ['💕', '💍', '✨', '🎉', '💐', '❤️', '💝', '🎊'];
    
    for (let i = 0; i < 30; i++) {
        const confete = document.createElement('div');
        const char = confeteChars[Math.floor(Math.random() * confeteChars.length)];
        
        confete.textContent = char;
        confete.style.position = 'fixed';
        confete.style.fontSize = Math.random() * 20 + 20 + 'px';
        confete.style.left = Math.random() * 100 + '%';
        confete.style.top = '-20px';
        confete.style.pointerEvents = 'none';
        confete.style.zIndex = '9999';
        
        document.body.appendChild(confete);
        
        // Animar queda
        const duration = Math.random() * 2 + 2;
        const rotate = Math.random() * 360;
        
        confete.animate([
            {
                transform: `translateY(0) rotate(0deg)`,
                opacity: 1
            },
            {
                transform: `translateY(${window.innerHeight + 20}px) rotate(${rotate}deg)`,
                opacity: 0
            }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        // Remover elemento após animação
        setTimeout(() => {
            confete.remove();
        }, duration * 1000);
    }
}

// Prevenir que o formulário seja enviado com Enter enquanto está focado em um input
document.getElementById("login-form").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        validarLogin(e);
    }
});
