//Informações de usuario -> API google
fetch('/api/usuario')
  .then(response => response.json())
    .then(usuario => {
        document.getElementById("nome-usuario").textContent = usuario.displayName;
        document.getElementById("email-usuario").textContent = usuario.emails[0].value;
    })
    .catch(error => {
        console.error('Erro ao buscar informações do usuário:', error);
        window.location.href = '/';
    });