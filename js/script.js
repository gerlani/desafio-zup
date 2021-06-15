const url_api = 'https://rickandmortyapi.com/api'
var status_api = false;
var max_character_number = 0;  

const status_span = document.getElementById('status_api');
const section_characters = document.getElementById('characters');
checkStatus = async () => {
  
    let data = await getCharacters(1);
    if(data)
        status_api = true;
    
    refreshStatus();
}
getMaxCharactersNumber = async () => {
    let data = await getCharacters();
    if(data)
        max_character_number = data.info.count;
}

refreshStatus = () => {
    status_span.innerHTML = status_api ? "API Ativa" : "API Inativa";
}

getCharacters = async (ids) => {

    let params = "";
    if(Array.isArray(ids)){
        params = ids.join(',');
    }else if(ids && ids.toString().length > 0){
        params = ids.toString();
    }
        
    let response = await fetch (`${url_api}/character/${params}`,{
        method:'Get',
        headers: {
            Accept:'application/json'
        }
    }).then((response) => response.json() ).then((data) => data );

    return response;
}
generateRandomNumber = () => {
    return Math.floor(Math.random() * max_character_number);
}
getRandomCharacters = async () => {
    
    let ids = [generateRandomNumber(),generateRandomNumber(),generateRandomNumber(),generateRandomNumber()]
    let data = await getCharacters(ids);
    if(!data)
        return;
    
    let characterCards;
    data.forEach((character) => {
        
        let card = createCharacterCard(character);
        characterCards = characterCards ? characterCards+card: card;
    });
    section_characters.innerHTML = characterCards;

}
createCharacterCard = (character) => {
    let card = `<div class="card">
    <img src="${character.image}" alt="${character.name}" style="width:100%">
    <div class="container">
      <h4><b>${character.name}</b></h4> 
      <p>Espécie ${character.species}</p> 
    </div>
  </div>`;
    return card
} 

handleGenerateRandomCharacters = async  () => {
    refreshStatus();
    checkStatus();
    await getMaxCharactersNumber();
    await getRandomCharacters();
    
}

handleGenerateRandomCharacters();
