const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonAbilitie = document.getElementsByClassName('modal')

const maxRecords = 151
const limit = 10
let offset = 0

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick='abilitiesHtml(${pokemon.number})'>
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function abrirModal(skillName) {
    const modal = document.querySelector("dialog")
    modal.innerHTML += `<p>${skillName}</p>`
    modal.showModal()   
}

async function abilitiesHtml(id) {
    const skills = await pokeApi.getPokemonAbilities(id)
    const skillsList = JSON.parse(skills)
    for (val of skillsList) {
        const skillName = val.ability.name
        abrirModal(skillName)
    }
}

function fecharModal() {
    const modal = document.querySelector("dialog")
    modal.innerHTML = `<h1 class="title-modal">Habilidades:</h1><button class="close" id="close" onclick="fecharModal()">&times;</button>`
    modal.close()
}
