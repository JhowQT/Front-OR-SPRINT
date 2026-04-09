const API = "http://localhost:8080";

async function cadastrar() {
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const idTipoUsuario = document.getElementById("tipoUsuario").value;

    if (!nome || !email || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    if (senha.length < 8) {
        alert("A senha deve ter no mínimo 8 caracteres!");
        return;
    }

    try {
        const res = await fetch(`${API}/usuario`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nomeUsuario: nome,
                email: email,
                senha: senha,
                idTipoUsuario: Number(idTipoUsuario)
            })
        });

        let data = null;

        try {
            data = await res.json();
        } catch (e) {
            data = null;
        }

        if (res.ok) {
            alert("Cadastro realizado com sucesso!");
            window.location.href = "login.html";
        } else {
            console.error("Erro backend:", data);
            alert(data?.message || "Erro ao cadastrar");
        }

    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro ao conectar com o servidor");
    }
}