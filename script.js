const API =
"https://script.google.com/macros/s/AKfycbyqpR4PVVr44Myn3vOaS6fRIwY9biPofgWukBBKg_JgV-DAOiCBcaBXW3ZBJKhPe3B7Wg/exec";
const checkboxes = document.querySelectorAll('input[name="livros"]');
const quantidade = document.getElementById("quantidade");
const total = document.getElementById("total");
const botao = document.getElementById("confirmar");
const contadorTopo = document.getElementById("contadorLivros");

const TOTAL_LIVROS = 31;

const livrosEspeciais = {
  22:6,
  24:3
};

/* ================================
QUANTIDADE REAL
================================ */

function quantidadeReal(id){

  if(livrosEspeciais[id]){
    return livrosEspeciais[id];
  }

  return 1;
}

/* ================================
CARREGAR ESCOLHIDOS (F5)
================================ */

async function carregarEscolhidos(){

  try{

    const resposta = await fetch(API);

    const dados = await resposta.json();

    let escolhidos = 0;

    dados.forEach(livro=>{

      const id = String(livro[0]);
      const escolhido = livro[3];

      const card =
      document.querySelector('.livro[data-id="'+id+'"]');

      if(escolhido == true || escolhido === "TRUE"){

        escolhidos += quantidadeReal(id);

        if(card){

          card.classList.add("escolhido");

          const checkbox = card.querySelector("input");

          if(checkbox){
            checkbox.checked = false;
            checkbox.disabled = true;
          }

        }

      }

    });

    contadorTopo.innerText =
    "📚 " + escolhidos + " / " + TOTAL_LIVROS + " livros já escolhidos";

    const progresso =
    document.getElementById("progresso");

    if(progresso){

      const porcentagem =
      (escolhidos / TOTAL_LIVROS) * 100;

      progresso.style.width =
      porcentagem + "%";

    }

  }catch(erro){

    console.log("API offline, lista continua funcionando");

  }

}

/* ================================
ATUALIZAR CARRINHO
================================ */

function atualizar(){

  let qtd = 0;
  let soma = 0;

  checkboxes.forEach(cb=>{

    if(cb.checked){

      const card = cb.closest(".livro");
      const id = card.dataset.id;

      qtd += quantidadeReal(id);

      const preco = card
      .querySelector(".price")
      .innerText
      .replace("R$","")
      .replace(",",".");

      soma += parseFloat(preco);

    }

  });

  quantidade.innerText =
  qtd + " livro" + (qtd>1 ? "s":"");

  total.innerText =
  "R$ " + soma.toFixed(2).replace(".",",");

}

checkboxes.forEach(cb=>{
  cb.addEventListener("change", atualizar);
});

/* ================================
MARCAR LIVRO
================================ */

async function marcarLivro(id){

  try{

    const resposta = await fetch(API,{
      method:"POST",
      body:new URLSearchParams({id:id})
    });

    const resultado = await resposta.text();

    if(resultado === "ja_escolhido"){

      alert("⚠️ Esse livro acabou de ser escolhido!");

      location.reload();

      return false;

    }

  }catch(e){

    console.log("API falhou, segue fluxo");

  }

  return true;

}

/* ================================
BOTÃO CONFIRMAR
================================ */
botao.addEventListener("click", async ()=>{

  botao.disabled = true;

  const textoOriginal = botao.innerText;
  botao.innerText = "⏳ Processando...";

  const nome =
  document.getElementById("nomePessoa").value || "Não informado";

  const mensagemPessoa =
  document.getElementById("mensagemPessoa").value;

  let livros = [];
  let soma = 0;

  for(const cb of checkboxes){

    if(cb.checked){

      const card = cb.closest(".livro");
      const id = card.dataset.id;

      const sucesso = await marcarLivro(id);

      if(!sucesso){
        botao.disabled=false;
        botao.innerText = textoOriginal;
        return;
      }

      const nomeLivro =
      card.querySelector("h2").innerText;

      const precoTexto =
      card.querySelector(".price").innerText;

      livros.push("• "+nomeLivro+" ("+precoTexto+")");

      const preco =
      precoTexto.replace("R$","").replace(",",".");

      soma += parseFloat(preco);

    }

  }

  if(livros.length === 0){

    alert("Escolha pelo menos um livro 📚");

    botao.disabled=false;
    botao.innerText = textoOriginal;

    return;
  }

  const mensagem = `
  Oi Tayssa!
  Quero presentear a Tayná com:
  ${livros.join("\n")}

  Total do presente: R$ ${soma.toFixed(2).replace(".",",")}

  Meu nome é: ${nome}

  Mensagem para Tayná:
  ${mensagemPessoa || "💜"}

  Quero fazer o PIX agora!`;

  const mensagemCodificada = encodeURIComponent(mensagem);

  const telefone = "5579998862522";

  /* link direto para abrir o app */
  const whatsappApp =
  `whatsapp://send?phone=${telefone}&text=${mensagemCodificada}`;

  /* fallback web */
  const whatsappWeb =
  `https://wa.me/${telefone}?text=${mensagemCodificada}`;

  /* tenta abrir o app */
  window.location.href = whatsappApp;

  /* se o app não abrir, abre web depois */
  setTimeout(()=>{
    window.location.href = whatsappWeb;
  },1500);

  setTimeout(()=>{

    botao.disabled=false;
    botao.innerText = textoOriginal;

  },2000);

});

/* ================================
AUTO ATUALIZAÇÃO
================================ */

carregarEscolhidos(); // executa ao abrir página

setInterval(carregarEscolhidos,5000); // atualiza a cada 5s