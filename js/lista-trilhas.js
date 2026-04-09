const API = "http://localhost:8080";

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

        // 🔥 SEU BACKEND USA "data"
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

function abrir(id) {
    window.location.href = `trilhas.html?id=${id}`;
}

function irPerfil() {
    window.location.href = "perfil.html";
}

carregar();