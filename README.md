# 🚀 Front-OR-SPRINT

## ⚠️ IMPORTANTE

> **⚡ ESTE PROJETO É UM FRONT-END PARA TESTES DO BACK-END JAVA ⚡**
> Ele foi desenvolvido para consumir e testar endpoints da API Java.

---

## 📌 Sobre o Projeto

O **Front-OR-SPRINT** é uma aplicação front-end simples desenvolvida com:

* HTML
* CSS
* JavaScript

Seu principal objetivo é servir como interface para testes de integração com um back-end em Java (API REST).

---

## 📁 Estrutura do Projeto

```
Front-OR-SPRINT/
│
├── html/
│   ├── login.html
│   ├── cadastro.html
│   ├── perfil.html
│   ├── trilhas.html
│   ├── lista-trilhas.html
│   └── admin-usuarios.html
│
├── css/
│   ├── login.css
│   ├── cadastro.css
│   ├── perfil.css
│   ├── trilhas.css
│   ├── lista-trilhas.css
│   └── admin-usuarios.css
│
├── js/
│   ├── login.js
│   ├── cadastro.js
│   ├── perfil.js
│   ├── trilhas.js
│   ├── lista-trilhas.js
│   └── admin-usuarios.js
```

---

## ⚙️ Como Clonar o Projeto

Abra o terminal (ou VS Code) e execute:

```bash
git clone https://github.com/SEU-USUARIO/Front-OR-SPRINT.git
```

Depois entre na pasta:

```bash
cd Front-OR-SPRINT
```

---

## 💻 Como Executar no VS Code

### 1. Abrir o projeto

* Abra o **VS Code**
* Clique em **File > Open Folder**
* Selecione a pasta `Front-OR-SPRINT`

---

### 2. Rodar o projeto

Você tem duas opções:

#### 🔹 Opção 1 (mais simples)

* Abra qualquer arquivo `.html` (ex: `login.html`)
* Clique com botão direito
* Selecione **"Open with Live Server"**

👉 (Recomendado instalar a extensão **Live Server**)

---

#### 🔹 Opção 2 (sem extensão)

* Abra o arquivo `.html` diretamente no navegador

---

## 🔗 Integração com o Back-end

Este front depende de um back-end Java rodando.

### Antes de testar:

* Certifique-se que sua API Java está ativa (Spring / Quarkus / etc.)
* Verifique as URLs dentro dos arquivos `.js`

Exemplo comum:

```js
fetch("http://localhost:8080/api/usuarios")
```

Se necessário, ajuste as URLs para o seu back-end.

---

## 🧪 Funcionalidades

* Login de usuário
* Cadastro
* Tela de perfil
* Listagem de trilhas/cursos
* Área administrativa de usuários

---

## 📌 Observações

* Este projeto **não possui back-end próprio**
* Ele depende totalmente da API Java
* Ideal para testes de integração (CRUD, autenticação, etc.)

---

## 👨‍💻 Autor

Projeto desenvolvido para fins acadêmicos (FIAP).

---

## 🚀 Próximos Passos (Sugestões)

* Integração com autenticação JWT
* Melhorar UI/UX
* Conectar com banco real via API
* Deploy em ambiente web

---

🔥 **Dica final:**
Sempre teste esse front com o back-end rodando, senão as requisições não vão funcionar.
