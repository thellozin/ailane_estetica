const galerias = {
  Fulani: [
    "/img/trancas/tranca1.png",
    "/img/trancas/tranca1.png",
  ],
    Gipsy: [
    "/img/trancas/tranca1.png",
    "/img/trancas/tranca1.png",
  ],
  Nago: [
    "/img/trancas/tranca1.png",
    "/img/trancas/tranca1.png",
  ],
  Box_Braids: [
    "/img/trancas/tranca1.png",
    "/img/trancas/tranca1.png",
  ],
  Knotless: [
    "/img/trancas/tranca1.png",
    "/img/trancas/tranca1.png",
  ],
  Box_Chanel: [
    "/img/trancas/tranca1.png",
    "/img/trancas/tranca1.png",
  ],
  Goddes_Braids: [
    "/img/trancas/tranca1.png",
    "/img/trancas/tranca1.png",
  ],
};

const nomesGalerias = {
  Fulani: {
    nome: "Fulani",
    capa: "/img/trancas/tranca1.png",
  },
  Gipsy: {
    nome: "Gipsy",
    capa: "/img/trancas/tranca1.png",
  },
  Nago: {
    nome: "Nago",
    capa: "/img/trancas/tranca1.png",
  },
  Box_Braids: {
    nome: "Box Braids",
    capa: "/img/trancas/tranca1.png",
  },
  Knotless: {
    nome: "Knotless",
    capa: "/img/trancas/tranca1.png",
  },
  Box_Chanel: {
    nome: "Box Chanel",
    capa: "/img/trancas/tranca1.png",
  },
  Goddes_Braids: {
    nome: "Goddes Braids",
    capa: "/img/trancas/tranca1.png",
  }
};

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function mostrarGaleriaGeral() {
  const container = document.getElementById("container-galeria");

  Object.entries(nomesGalerias).forEach(([id, dados]) => {
    const div = document.createElement("div");
    div.className = "item-galeria";

    const link = document.createElement("a");
    link.href = `/pages/galeria.html?id=${id}`;

    const img = document.createElement("img");
    img.src = dados.capa;
    img.alt = dados.nome;
    img.className = "foto-capa";

   const legenda = document.createElement("div");
legenda.className = "legenda-galeria";
legenda.textContent = dados.nome;

link.appendChild(img);
link.appendChild(legenda); // legenda fica dentro do link e por cima da imagem
div.appendChild(link);
container.appendChild(div);

  });
}

function mostrarGaleriaIndividual(id) {
  const imagens = galerias[id];
  const container = document.getElementById("container-galeria");
  container.innerHTML = ""; // limpa antes

  if (!imagens) {
    container.innerHTML = "<p>Galeria não encontrada.</p>";
    return;
  }

  // 🔹 Adiciona o título no topo
  if (nomesGalerias[id]) {
    const titulo = document.createElement("h2");
    titulo.className = "titulo-galeria";
    titulo.textContent = nomesGalerias[id].nome;
    container.appendChild(titulo);
  }

  // 🔹 Adiciona as imagens abaixo
  imagens.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.className = "foto-galeria";
    container.appendChild(img);
  });

  const btnVoltar = document.getElementById("btn-voltar");
  if (btnVoltar) btnVoltar.style.display = "inline-block";
}


function criarModalZoom() {
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <span class="modal-close">&times;</span>
    <img class="modal-content" id="img-zoomada" />
  `;
  document.body.appendChild(modal);

  const imgZoomada = modal.querySelector("#img-zoomada");
  const btnFechar = modal.querySelector(".modal-close");

  document.getElementById("container-galeria").addEventListener("click", e => {
    if (e.target.tagName === "IMG" && e.target.classList.contains("foto-galeria")) {
      imgZoomada.src = e.target.src;
      modal.style.display = "flex";
    }
  });

  btnFechar.onclick = () => {
    modal.style.display = "none";
    imgZoomada.src = "";
  };

  modal.onclick = e => {
    if (e.target === modal) {
      modal.style.display = "none";
      imgZoomada.src = "";
    }
  };
}

window.onload = () => {
  const id = getQueryParam("id");
  if (id) {
    mostrarGaleriaIndividual(id);
  } else {
    mostrarGaleriaGeral();
  }
  criarModalZoom();
};
