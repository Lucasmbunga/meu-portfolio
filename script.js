/**
 * Por Lucas Pascoal, 2025
 */


//Codigo do Menu
let clickMenu = document.getElementById("menu")
let abrirMenu = document.getElementById("navbar")
clickMenu.addEventListener("click", () => {
    abrirMenu.classList.add("menu-aberto")
    document.getElementById("overlay").style.display = "block"
})

abrirMenu.addEventListener("click", () => {
    abrirMenu.classList.remove("menu-aberto")
    document.getElementById("overlay").style.display = "none"

})

let overlay = document.getElementById("overlay")

overlay.addEventListener("click", () => {
    abrirMenu.classList.remove("menu-aberto")
    overlay.style.display = "none"
})
const removerClasse = (links, classe) => {
    links.forEach(link => {
        link.classList.remove(classe)
    })
}
const linksDenavegacao = document.querySelectorAll("nav a")
linksDenavegacao.forEach(link => {
    link.addEventListener("click", (clicado) => {
        removerClasse(linksDenavegacao, "ativo")
        clicado.target.classList.add("ativo")
    })
})

//Este bloco coloca um observador nos elementos filhos de todas as seções, ou seja, sempre que esses elementos estiverem na direção da tela, poderão ser apresentados na tela. Caso contrário, serão ocultados na tela
const observador = new IntersectionObserver(entries => {
    entries.forEach(entrie => {
        if (entrie.isIntersecting) {
            for (let i = 0; i < entrie.target.children.length; i++) {
                entrie.target.children[i].classList.add("apresentar")
                entrie.target.children[i].classList.remove("ocultar")

                //Controle do preenchimento das barras de progresso
                const barrasprogresso = document.querySelectorAll(".bar span")
                if (entrie.target.classList.contains("skills-row")) {
                    barrasprogresso.forEach(barra => {
                        barra.classList.add("barra-progresso")
                    })
                }
                else {
                    barrasprogresso.forEach(barra => {
                        barra.classList.remove("barra-progresso")
                        barra.be
                    })

                }//Fim Controle do preenchimento das barras de progresso
            }
        }
        else {
            for (let i = 0; i < entrie.target.children.length; i++) {
                entrie.target.children[i].classList.add("ocultar")
                entrie.target.children[i].classList.remove("apresentar")
            }
        }
    })
})

//Controle da barra de rolagem

/**
 * Este bloco controla a posição da barra de rolagem, para ativar o seu link de navegação no menu, isto é, será ativado o link correspondente à seção que aparece na tela 
 */
const secoes = document.querySelectorAll("section");
window.onscroll = () => {
    secoes.forEach(secao => {

        let posicaoBarraRolagem = window.scrollY
        let distanciaTopo = secao.offsetTop - 100
        let alturaSecao = secao.offsetHeight
        let id = secao.getAttribute("id")
        if (posicaoBarraRolagem >= distanciaTopo && posicaoBarraRolagem < distanciaTopo + alturaSecao) {
            linksDenavegacao.forEach(link => {
                link.classList.remove("ativo")
                const ativarLink = document.querySelector("nav a[href*=" + id + "]")
                if (ativarLink) {
                    ativarLink.classList.add("ativo")
                }
            })
        }
        for (let i = 0; i < secao.children.length; i++) {

            observador.observe(secao.children[i])
        }

    })
}

//controlando barras de progresso
