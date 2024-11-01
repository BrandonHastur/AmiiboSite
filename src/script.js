//^ Extracción de datos de la API Amiibo
async function fetchAmiiboData(url = 'https://www.amiiboapi.com/api/amiibo/') {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data; //= Devuelve los datos JSON
  } catch (error) {
    console.error('Error fetching the data:', error);
  }
}

//% Variables de la barra de búsqueda
const search = document.querySelector('.search');
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.btn');

//@ Funcionamiento visual de la barra de búsqueda
searchButton.addEventListener('click', e => {
  search.classList.toggle('active');
  searchInput.focus();
});

//@ Mostrar aviso si Amiibo no fue lanzado en una region
function releaseDate(release){
  if (release === null){
    return 'Never Released';
  }else{
    return release;
  }
}

//% Variable del contenedor principal
const mainContainer = document.querySelector('.main-container');

//^ LLamada para usar la información de la API
fetchAmiiboData().then(amiiboData => {
  // mainContainer.innerHTML = ''; //=limpia el contenedor de las tarjetas

  objectAmiibos(amiiboData.amiibo); //= funcion a ejecutar con la data
  
  
});

//% Variable de los botones de paginas
const buttonsPagsContainer = document.querySelector('.buttons-pags');

//% Variable contenedor de las tarjetas 
const container = document.getElementById('container');


function objectAmiibos(amiibos){ //= amiibos es el array entero
  let amiibosTotal = Object.keys(amiibos).length;
  let pageResults = 50;
  let pags = amiibosTotal / pageResults;

  //@ Cartas por cada Pagina
  for (let i = 0; i <= amiibosTotal; i += pageResults) { //= Por cada pagina haz lo siguiente...

    const chunkKeys = Object.keys(amiibos).slice(i, i + pageResults); // Extrae 50 claves por ciclo
    const chunk = chunkKeys.map(key => amiibos[key]); // Mapea las claves a sus valores en el objeto

    //@ Creación de pagina
    const pag = document.createElement('div');
    pag.classList.add('main-container');
    if(i != 0){
      pag.classList.add('inactive');
    }
    console.log('pagina agregada'); //debug
    container.appendChild(pag);  

    //@ Creación de cartas por pagina
    chunk.forEach(amiibo => {
      const amiiboDiv = document.createElement('div'); 
      amiiboDiv.classList.add('card'); //= estilo para la tarjeta

      amiiboDiv.innerHTML = `
          
        <img src="${amiibo.image}" alt="${amiibo.name}">
        <h2 class="game-series">${amiibo.gameSeries}</h2>
        <h3 class="character">${amiibo.character}</h3>
        <p><span>Type:</span> ${amiibo.type}</p>
        <p><span>Amiibo Series:</span> ${amiibo.amiiboSeries}</p>

        <table class="release-table">
          <tr>
            <th>Release Date:</th>
          </tr>
          <tr>
            <td>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480">
                <path fill="#012169" d="M0 0h640v480H0z"/>
                <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0z"/>
                <path fill="#C8102E" d="m424 281 216 159v40L369 281zm-184 20 6 35L54 480H0zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42z"/>
                <path fill="#FFF" d="M241 0v480h160V0zM0 160v160h640V160z"/>
                <path fill="#C8102E" d="M0 193v96h640v-96zM273 0v480h96V0z"/>
              </svg>
              ${releaseDate(amiibo.release.au)}
            </td>
          </tr>
          <tr>
            <td>
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="flag-icons-eu" viewBox="0 0 640 480">
                <defs>
                  <g id="eu-d">
                    <g id="eu-b">
                      <path id="eu-a" d="m0-1-.3 1 .5.1z"/>
                      <use xlink:href="#eu-a" transform="scale(-1 1)"/>
                    </g>
                    <g id="eu-c">
                      <use xlink:href="#eu-b" transform="rotate(72)"/>
                      <use xlink:href="#eu-b" transform="rotate(144)"/>
                    </g>
                    <use xlink:href="#eu-c" transform="scale(-1 1)"/>
                  </g>
                </defs>
                <path fill="#039" d="M0 0h640v480H0z"/>
                <g fill="#fc0" transform="translate(320 242.3)scale(23.7037)">
                  <use xlink:href="#eu-d" width="100%" height="100%" y="-6"/>
                  <use xlink:href="#eu-d" width="100%" height="100%" y="6"/>
                  <g id="eu-e">
                    <use xlink:href="#eu-d" width="100%" height="100%" x="-6"/>
                    <use xlink:href="#eu-d" width="100%" height="100%" transform="rotate(-144 -2.3 -2.1)"/>
                    <use xlink:href="#eu-d" width="100%" height="100%" transform="rotate(144 -2.1 -2.3)"/>
                    <use xlink:href="#eu-d" width="100%" height="100%" transform="rotate(72 -4.7 -2)"/>
                    <use xlink:href="#eu-d" width="100%" height="100%" transform="rotate(72 -5 .5)"/>
                  </g>
                  <use xlink:href="#eu-e" width="100%" height="100%" transform="scale(-1 1)"/>
                </g>
              </svg>
              ${releaseDate(amiibo.release.eu)}
            </td>
          </tr>
          <tr>
            <td>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480">
                <defs>
                  <clipPath>
                    <path fill-opacity=".7" d="M-88 32h640v480H-88z"/>
                  </clipPath>
                </defs>
                <g fill-rule="evenodd" stroke-width="1pt" clip-path="url(#jp-a)" transform="translate(88 -32)">
                  <path fill="#fff" d="M-128 32h720v480h-720z"/>
                  <circle cx="523.1" cy="344.1" r="194.9" fill="#bc002d" transform="translate(-168.4 8.6)scale(.76554)"/>
                </g>
              </svg>
              ${releaseDate(amiibo.release.jp)}
            </td>
          </tr>
          <tr>
            <td>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480">
                <path fill="#bd3d44" d="M0 0h640v480H0"/>
                <path stroke="#fff" stroke-width="37" d="M0 55.3h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640"/>
                <path fill="#192f5d" d="M0 0h364.8v258.5H0"/>
                <marker id="um-a" markerHeight="30" markerWidth="30">
                  <path fill="#fff" d="m14 0 9 27L0 10h28L5 27z"/>
                </marker>
                <path fill="none" marker-mid="url(#um-a)" d="m0 0 16 11h61 61 61 61 60L47 37h61 61 60 61L16 63h61 61 61 61 60L47 89h61 61 60 61L16 115h61 61 61 61 60L47 141h61 61 60 61L16 166h61 61 61 61 60L47 192h61 61 60 61L16 218h61 61 61 61 60z"/>
              </svg>
              ${releaseDate(amiibo.release.na)}
            </td>          
          </tr>
        </table>
        
        `;
      
      pag.appendChild(amiiboDiv); //= se agrega el amiibo creado 
    });
  }

  const blocks = document.querySelectorAll('.main-container');

  for(let counter = 0; counter <= pags; counter++){ //= Por cada pagina haz lo siguiente...
    //@ botones por cada pagina
    const button = document.createElement('button');
    button.innerText = counter+1;
    buttonsPagsContainer.appendChild(button);

    button.addEventListener('click', e =>{
      activeButton(button);
      blocks.forEach(block => {
        block.classList.add('inactive');
      });
      blocks[counter].classList.remove('inactive');
    });
  }
}

function activeButton(button){
  const pagsButtons = buttonsPagsContainer.querySelectorAll('button');
  pagsButtons.forEach(button => {
    button.classList.remove('button-active');
  });
  button.classList.add('button-active');
}

function releaseDate(release){
  if(release == null){
    return 'Never Released';
  }else{
    return release;
  }
}

// Funcionalidad de botones para game-series y tipos


//^ Funcionamiento de Búsqueda de la barra principal
searchInput.addEventListener("keydown", event => {
  if (event.key === "Enter") { //= Detectar si la tecla presionada es Enter
      event.preventDefault();   //= Evitar el comportamiento por defecto si lo hubiera

      const query = searchInput.value.trim();

      if (query) {
          console.log("Búsqueda realizada:", query);


      } else {
          console.log("Por favor, ingresa algo para buscar.");

      }
  }
});