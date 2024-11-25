document.addEventListener("DOMContentLoaded", () => {
    const profileList = document.getElementById("profileList");
    const numProfilesInput = document.getElementById("numProfiles");
    const loadProfilesButton = document.getElementById("loadProfiles");
    const clearProfilesButton = document.getElementById("clearProfiles");

    const criarUsuariosAleatorios = () => {
        const numProfiles = parseInt(numProfilesInput.value, 10);

        if (!numProfiles || numProfiles < 1 || numProfiles > 20) {
            alert("Por favor, insira um número entre 1 e 20.");
            return;
        }

        profileList.innerHTML = "<p>Carregando perfis...</p>";

        const xhr = new XMLHttpRequest();
        xhr.open("GET", `https://randomuser.me/api/?results=${numProfiles}`, true);

        xhr.onload = () => {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);

                const fragment = document.createDocumentFragment();

                data.results.forEach(perfil => {
                    const profile = document.createElement("div");
                    profile.className = "profile";

                    const img = document.createElement("img");
                    img.src = perfil.picture.large;
                    img.alt = `${perfil.name.first} ${perfil.name.last}`;
                    img.loading = "lazy";

                    const name = document.createElement("p");
                    name.textContent = `${perfil.name.first} ${perfil.name.last}`;

                    profile.appendChild(img);
                    profile.appendChild(name);
                    fragment.appendChild(profile);
                });

                profileList.innerHTML = ""; 
                profileList.appendChild(fragment);
            } else {
                profileList.innerHTML = "<p>Erro ao carregar perfis. Tente novamente.</p>";
            }
        };

        xhr.onerror = () => {
            profileList.innerHTML = "<p>Erro na requisição. Tente novamente.</p>";
        };

        xhr.send();
    };

    const limparPerfis = () => {
        profileList.innerHTML = "";
    };

    loadProfilesButton.addEventListener("click", criarUsuariosAleatorios);
    clearProfilesButton.addEventListener("click", limparPerfis);
});
