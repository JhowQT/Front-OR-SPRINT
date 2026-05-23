const API = "https://orangeroute-oracle-production.up.railway.app";

const usuario = JSON.parse(localStorage.getItem("usuario"));

async function carregar() {
    try {
        const token = localStorage.getItem("token");

        // 🔒 Proteção de rota
        if (!token) {
            alert("Você precisa estar logado!");
            window.location.href = "login.html";
            return;
        }

        const res = await fetch(`${API}/trilhas`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            }
        });

        if (!res.ok) {
            throw new Error("Erro ao buscar trilhas");
        }

        const json = await res.json();

        const container = document.getElementById("container");
        container.innerHTML = "";

        json.data.forEach(t => {
            const div = document.createElement("div");
            div.className = "card";

            div.innerHTML = `
                <h2>${t.tituloTrilha}</h2>
                <p>${t.conteudoTrilha}</p>
                <button onclick="abrir(${t.idTrilhaCarreira})">
                    Acessar Trilha
                </button>
            `;

            container.appendChild(div);
        });

    } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao carregar trilhas. Faça login novamente.");
        window.location.href = "login.html";
    }
}

// ================= ADMIN =================
function verificarAdmin() {

    console.log("USUARIO LOGADO:", usuario);

    if (!usuario) return;

    // 🔥 TENTA PEGAR O TIPO DE TODAS AS FORMAS POSSÍVEIS
    const tipo =
        usuario.nomeTipoUsuario ||
        usuario.tipoUsuario?.nomeTipoUsuario ||
        usuario.tipoUsuario;

    console.log("TIPO USUARIO:", tipo);

    if (tipo && tipo.toUpperCase().includes("ADMIN")) {
        document.getElementById("btnAdmin").style.display = "inline-block";
    }
}

function irAdmin() {
    window.location.href = "admin-usuarios.html";
}

// ================= OUTRAS =================
function abrir(id) {
    window.location.href = `trilhas.html?id=${id}`;
}

function irPerfil() {
    window.location.href = "perfil.html";
}

// INIT
carregar();
verificarAdmin();