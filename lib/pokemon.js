// TODO write your code here
const url = "https://pokeapi.co/api/v2/pokemon?limit=251&offset=0"
const cardsContainer = document.querySelector('#cardsContainer');
const cardTemplate = document.querySelector("#cardTemplate");
const infoTemplates = document.querySelector('#infoTemplate');
const infoContainer = document.querySelector('#infoContainer');

fetch(url)
    .then(response => response.json())
    .then((data) =>{
      const pokeData = data.results;
      pokeData.forEach((singleData) => {
           fetch(singleData.url)
              .then(response => response.json())
              .then((pokemon) => {
                const cardClone = cardTemplate.content.cloneNode(true);
                cardClone.querySelector('img').src = pokemon.sprites.front_default;
                cardClone.querySelector('h2').innerText = pokemon.name;
                cardClone.querySelector('p').innerText = pokemon.types.map(t => t.type.name)
                cardClone.querySelector('a').addEventListener('click', () =>{
                  const infoClone = infoTemplate.content.cloneNode(true);
                  infoContainer.innerHTML = "";

                  infoClone.querySelector('img').src = pokemon.sprites.back_default;
                  infoClone.querySelector('h2').innerText = pokemon.name;
                  infoClone.querySelector('p').innerText = pokemon.types.map(t => t.type.name)

                  infoContainer.appendChild(infoClone);
                })
                  cardsContainer.appendChild(cardClone);

              });
        });
      });
