const API = "http://localhost:8080";

const usuario = JSON.parse(localStorage.getItem("usuario"));
const token = localStorage.getItem("token");

// ================= PROTEÇÃO ADMIN =================
function verificarAdmin() {

    console.log("USUARIO LOGADO:", usuario);

    if (!usuario) {
        alert("Usuário não logado!");
        window.location.href = "login.html";
        return;
    }

    // 🔥 pega tipo corretamente (qualquer estrutura)
    const tipo =
        usuario.nomeTipoUsuario ||
        usuario.tipoUsuario?.nomeTipoUsuario ||
        usuario.tipoUsuario;

    console.log("TIPO USUARIO:", tipo);

    if (!tipo || !tipo.toUpperCase().includes("ADMIN")) {
        alert("Acesso negado! Apenas ADMIN.");
        window.location.href = "login.html";
        return;
    }
}

// ================= LISTAR USUÁRIOS =================
async function carregarUsuarios() {
    try {
        const res = await fetch(`${API}/usuario`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        if (!res.ok) {
            throw new Error("Erro ao buscar usuários");
        }

        const json = await res.json();

        const div = document.getElementById("usuarios");
        div.innerHTML = "";

        json.data.forEach(u => {
            const item = document.createElement("div");
            item.className = "usuario";

            item.innerHTML = `
                <div class="info">
                    <span class="nome">${u.nomeUsuario}</span>
                    <span class="email">${u.email}</span>
                    <span class="tipo">${u.tipoUsuario}</span>
                </div>

                <button class="deletar" onclick="deletar(${u.idUsuario})">
                    🗑️
                </button>
            `;

            div.appendChild(item);
        });

    } catch (error) {
        console.error(error);
        alert("Erro ao carregar usuários");
    }
}

// ================= DELETAR =================
async function deletar(id) {

    if (!confirm("Tem certeza que deseja deletar este usuário?")) return;

    try {
        const res = await fetch(`${API}/usuario/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        if (!res.ok) {
            throw new Error("Erro ao deletar");
        }

        alert("Usuário deletado com sucesso!");
        carregarUsuarios();

    } catch (error) {
        console.error(error);
        alert("Erro ao deletar usuário");
    }
}

// ================= VOLTAR =================
function voltar() {
    window.location.href = "lista-trilhas.html";
}

// INIT
verificarAdmin();
carregarUsuarios();