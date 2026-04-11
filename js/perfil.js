const API = "http://localhost:8080";

const usuario = JSON.parse(localStorage.getItem("usuario"));
const token = localStorage.getItem("token");

if (!usuario || !token) {
    window.location.href = "login.html";
}
  
let editando = false;

async function carregar() {
    const res = await fetch(`${API}/usuario/${usuario.idUsuario}`);
    const data = await res.json();
    const u = data.usuario;

    // AVATAR
    const avatarContainer = document.getElementById("avatarContainer");

    if (u.fotoBase64) {
        avatarContainer.innerHTML = `
            <img class="avatar-img" src="data:image/png;base64,${u.fotoBase64}">
        `;
    } else {
        const letra = u.nomeUsuario.charAt(0).toUpperCase();
        avatarContainer.innerHTML = `
            <div class="avatar-placeholder">${letra}</div>
        `;
    }

    // INFO
    document.getElementById("nome").innerText = u.nomeUsuario;
    document.getElementById("email").innerText = u.email;

    // BADGE
    const badge = document.getElementById("badgeTipo");
    if (u.nomeTipoUsuario.toUpperCase().includes("ADMIN")) {
        badge.innerHTML = `<span class="badge admin">ADMIN</span>`;
    } else {
        badge.innerHTML = `<span class="badge user">USER</span>`;
    }

    // STATUS
    const status = document.getElementById("status");
    if (u.ativo === "1") {
        status.innerHTML = `<span class="status">🟢 Ativo</span>`;
    } else {
        status.innerHTML = `<span class="status">🔴 Inativo</span>`;
    }
}

// EDITAR
function toggleEdicao() {
    editando = !editando;
    document.getElementById("formEdicao").classList.toggle("hidden");
}

// SALVAR
async function salvar() {
    const nome = document.getElementById("novoNome").value;
    const email = document.getElementById("novoEmail").value;
    const senha = document.getElementById("novaSenha").value;

    await fetch(`${API}/usuario/${usuario.idUsuario}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeUsuario: nome,
            email: email,
            senha: senha
        })
    });

    document.getElementById("mensagem").innerText = "Perfil atualizado!";
    carregar();
}

// FOTO
async function enviarFoto() {
    const fileInput = document.getElementById("fotoInput");

    if (!fileInput.files[0]) {
        alert("Selecione uma imagem");
        return;
    }

    const formData = new FormData();
    formData.append("foto", fileInput.files[0]);

    await fetch(`${API}/usuario/${usuario.idUsuario}/foto`, {
        method: "PUT",
        body: formData
    });

    document.getElementById("mensagem").innerText = "Foto atualizada!";
    carregar();
}

// VOLTAR
function voltar() {
    window.location.href = "lista-trilhas.html";
}

carregar();