const API = "https://orangeroute-oracle-production.up.railway.app";

async function login() {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if (!email || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha })
    });

    let data = null;

    try {
        data = await res.json();
    } catch (e) {
        data = null;
    }

    if (res.ok) {
        // ✅ CORRETO
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        localStorage.setItem("token", data.token);

        window.location.href = "lista-trilhas.html";
    } else {
        alert(data?.message || "Email ou senha inválidos");
    }
}