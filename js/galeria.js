const galerias = {
  Sobrancelhas_fem: [
    "../img/sobrancelha_femenina/img1.jpeg",
    "../img/sobrancelha_femenina/img2.jpeg",
    "../img/sobrancelha_femenina/img3.jpeg",
  
    
  ],
    Unhas_mao: [
    "../img/unhas_mao/img1.jpeg",
    "../img/unhas_mao/img2.jpeg",
    "../img/unhas_mao/img3.jpeg",
    "../img/unhas_mao/img4.jpeg",
    "../img/unhas_mao/img5.jpeg",
    "../img/unhas_mao/img6.jpeg",
    "../img/unhas_mao/img7.jpeg"
  ],

   Unhas_pe: [
    "../img/unhas_pe/img1.jpeg",
    "../img/unhas_pe/img2.jpeg",
    "../img/unhas_pe/img3.jpeg",
    "../img/unhas_pe/img4.jpeg"
  ],

   sobrancela_mas: [
    
    "../img/sobrancelha_masculina/img4.jpeg",
    
  ],

   bigode: [
    "../img/bigode/img4.jpeg"
  ],

   depilacao: [
    "../img/depilacao/img1.jpeg",
    "../img/depilacao/img2.jpeg"
  ],

  //  epilacao_linha: [
  //   "../img/epilacao_com_linha/img1.jpeg",
  //   "../img/epilacao_com_linha/img2.jpeg"
  // ],

   antes_depois: [
    "../img/antes_e_depois/img1.jpeg",
    "../img/antes_e_depois/img2.jpeg",
    "../img/antes_e_depois/img3.jpeg",
    "../img/antes_e_depois/img4.jpeg",
  ],
  
};

const nomesGalerias = {
  Sobrancelhas_fem: {
    nome: "Sobrancelhas Femeninas",
    capa: "../img/sobrancelha_femenina/img1.jpeg",
  },
 Unhas_mao: {
    nome: "Unhas Mão",
    capa: "../img/unhas_mao/img1.jpeg",
  },
  
  Unhas_pe: {
    nome: "Unhas Pé",
    capa: "../img/unhas_pe/img3.jpeg",
  },

  sobrancela_mas: {
    nome: "Sobrancelha Masculina",
    capa: "../img/sobrancelha_masculina/img4.jpeg",
  },

  bigode: {
    nome: "Bigode",
    capa: "../img/bigode/img4.jpeg",
  },

  depilacao: {
    nome: "Depilação",
    capa: "../img/depilacao/img2.jpeg",
  },

  // epilacao_linha: {
  //   nome: "Epilação com Linha",
  //   capa: "../img/epilacao_com_linha/img2.jpeg",
  // },

  antes_depois: {
    nome: "Antes e Depois",
    capa: "../img/antes_e_depois/img9.jpeg",
  },
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
    link.href = `galeria.html?id=${id}`;

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
