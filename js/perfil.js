const usuario = JSON.parse(localStorage.getItem("usuario"));

if (!usuario) {
    window.location.href = "login.html";
}

async function carregar() {
    const res = await fetch(`http://localhost:8080/usuario/${usuario.idUsuario}`);
    const data = await res.json();

    const u = data.usuario;

    const primeiraLetra = u.nomeUsuario.charAt(0).toUpperCase();

    document.getElementById("perfil").innerHTML = `
        <div class="avatar">${primeiraLetra}</div>
        <h2>${u.nomeUsuario}</h2>
        <p>${u.email}</p>
        <small>Tipo: ${u.nomeTipoUsuario}</small>
    `;
}

function voltar() {
    window.location.href = "lista-trilhas.html";
}

carregar();