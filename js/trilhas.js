const API = "https://orangeroute-oracle-production.up.railway.app";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const usuario = JSON.parse(localStorage.getItem("usuario"));
const token = localStorage.getItem("token");

let jaFavoritado = false; // 🔥 controla estado

// 🔒 Proteção
if (!usuario || !token) {
    window.location.href = "login.html";
}

// ================== TRILHA ==================
async function carregarTrilha() {
    try {
        const res = await fetch(`${API}/trilhas/${id}`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        if (!res.ok) throw new Error("Erro ao carregar trilha");

        const data = await res.json();

        document.getElementById("trilha").innerHTML = `
            <h2>${data.tituloTrilha}</h2>
            <p>${data.conteudoTrilha}</p>

            <button id="btnFavorito" 
                    class="favorito nao-favoritado" 
                    onclick="favoritar()">
                ⭐ Favoritar
            </button>
        `;

        // 🔥 depois de renderizar → verifica favorito
        await verificarFavorito();

    } catch (e) {
        console.error(e);
        alert("Erro ao carregar trilha");
    }
}

// ================== VERIFICAR FAVORITO ==================
async function verificarFavorito() {
    try {
        const res = await fetch(`${API}/favoritos/usuario/${usuario.idUsuario}`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const json = await res.json();

        const favoritos = json.data;

        // 🔥 verifica se já existe favorito dessa trilha
        jaFavoritado = favoritos.some(f => f.idTrilhaCarreira == id);

        const btn = document.getElementById("btnFavorito");

        if (jaFavoritado) {
            btn.classList.remove("nao-favoritado");
            btn.classList.add("favoritado");
        }

    } catch (e) {
        console.error(e);
    }
}

// ================== COMENTÁRIOS ==================
async function carregarComentarios() {
    try {
        const res = await fetch(`${API}/comentarios/trilha/${id}`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const json = await res.json();

        const div = document.getElementById("comentarios");
        div.innerHTML = "";

        json.data.forEach(c => {
            div.innerHTML += `
                <p><b>${c.nomeUsuario}:</b> ${c.conteudoComentario}</p>
            `;
        });

    } catch (e) {
        console.error(e);
    }
}

// ================== COMENTAR ==================
async function comentar() {
    const texto = document.getElementById("comentario").value;

    if (!texto) {
        alert("Digite um comentário");
        return;
    }

    try {
        await fetch(`${API}/comentarios`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                conteudoComentario: texto,
                idUsuario: usuario.idUsuario,
                idTrilhaCarreira: id
            })
        });

        document.getElementById("comentario").value = "";
        carregarComentarios();

    } catch (e) {
        console.error(e);
    }
}

// ================== FAVORITAR ==================
async function favoritar() {

    // 🔥 evita erro de duplicidade
    if (jaFavoritado) {
        alert("Você já favoritou essa trilha!");
        return;
    }

    try {
        await fetch(`${API}/favoritos`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idUsuario: usuario.idUsuario,
                idTrilhaCarreira: id
            })
        });

        const btn = document.getElementById("btnFavorito");

        btn.classList.remove("nao-favoritado");
        btn.classList.add("favoritado");

        jaFavoritado = true; // 🔥 atualiza estado

    } catch (e) {
        console.error(e);
    }
}

// ================== LINKS ==================
async function carregarLinks() {
    try {
        const res = await fetch(`${API}/links/trilha/${id}`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const json = await res.json();

        const div = document.getElementById("links");
        div.innerHTML = "";

        json.data.forEach(l => {
            div.innerHTML += `
                <a href="${l.conteudoLink}" target="_blank">
                    ${l.tituloLink}
                </a><br>
            `;
        });

    } catch (e) {
        console.error(e);
    }
}

// ================== VOLTAR ==================
function voltar() {
    window.location.href = "lista-trilhas.html";
}

// ================== INIT ==================
carregarTrilha();
carregarComentarios();
carregarLinks();