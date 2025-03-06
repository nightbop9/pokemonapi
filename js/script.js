// seleciona o elemento com a classe "container"
const container = document.querySelector(".container");

// seleciona o elemento com o id "quantidade"
const qtd = document.querySelector("#quantidade");

// seleciona o botão com o id "btn"
const btn = document.querySelector("#btn");

// adiciona um ouvinte do tipo "click" ao botão
btn.addEventListener("click", (e) => {
    // previne o comportamento padrão do evento
    e.preventDefault();

    // inicia tentativa de executar o código
    try {
        // limpa o conteúdo do container
        container.innerHTML = '';

        // define a url da api com base na quantidade informada
        const url = `https://pokeapi.co/api/v2/pokemon/?limit=${qtd.value}`;

        // declara função assíncrona para obter pokemons da api
        async function retornarPokemons() {
            // faz a requisição e espera a resolucao para atribuição à constante
            const response = await fetch(url);
            // espera a conversão da resposta para json e atribui à constante
            const pokemons = await response.json();

            // percorre a lista de resultados
            pokemons.results.forEach((pokemon) => {
                // cria um elemento div
                const div = document.createElement("div");
                // atribui a classe "pokemon" para a div
                div.setAttribute("class", "pokemon");
                
                // declara função assíncrona para buscar imagem e detalhes
                async function buscarImg() {
                    // obtém a url específica do pokemon
                    const newUrl = pokemon.url;
                    // faz requisição para essa url
                    const resposta = await fetch(newUrl);
                    // converte a resposta para json
                    const data = await resposta.json();

                    // cria um elemento p
                    const p = document.createElement("p");
                    
                    // define o texto com id e nome do pokemon
                    p.textContent = `${data.id} - ${pokemon.name}`;
                    
                    // adiciona o elemento p à div
                    div.appendChild(p);
                    
                    // percorre as entradas do objeto sprites
                    Object.entries(data.sprites).forEach(([chave, valor]) => {
                        // verifica se a chave corresponde à imagem frontal
                        if (chave === "front_default") {
                            // cria um elemento img
                            const img = document.createElement("img");
                            // define o src da imagem
                            img.setAttribute("src", valor);
                            // adiciona a imagem à div
                            div.appendChild(img);
                        }
                    });
                }
                // chama a função para buscar imagem
                buscarImg();
                // adiciona a div ao container
                container.appendChild(div);
            });
        }
        // chama a função que obtém os pokemons
        retornarPokemons();
        function retornarMsg() {
            alert(`Todos os ${quantidade.value} foram listados`)
        }
        retornarMsg()
    } catch (error) {
        // exibe erro no console
        console.log(error);
    }
});

