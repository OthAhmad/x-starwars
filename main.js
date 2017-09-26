var mainElement = document.querySelector('main');
var menuElement = document.querySelector('.menu');
var loader = document.createElement('div');
var renderers = {};
//
function loadPeople(done) {

   var xm1Http = new XMLHttpRequest();
  xm1Http.open("Get",'https://swapi.co/api/people/', false);
  xm1Http.addEventListener('load',function(people){
     var response = JSON.parse(xm1Http.responseText);
     done(response);
    });
  xm1Http.send();
}




function renderGenerics(data, renderFunction, itemFunction){
  //console.info('rendering generics');
  loader.classList.remove('loader');
  mainElement.innerHTML='';
  var createNav = document.createElement('nav');
  createButton('previous',data.previous, renderFunction,createNav);
  createButton('next',data.next, renderFunction,createNav);

  var cardsElement = document.createElement('div');
  cardsElement.classList.add('cards');
  mainElement.appendChild(cardsElement);

  mainElement.appendChild(createNav);

  //return cardsElement;
  data.results.forEach(function(object) {
    var sectionElement = document.createElement('section');
    sectionElement.classList.add('cardsStyle');
    sectionElement.innerHTML = itemFunction(object);
    cardsElement.appendChild(sectionElement);
  });
}


//
function renderPeople(people) {
  var cardsElement = renderGenerics(people, renderPeople, function(person) {
    return `<header >
              <h1 class="lable"> ${person.name}</h1>
            </header>
            <div>
              <ul>
                <li>Birth Year : ${person.birth_year}</li>
                <li>Eye Color : ${person.eye_color}</li>
                <li>Skin Color : ${person.skin_color}</li>
                <li>Hair Color : ${person.hair_color}</li>
                <li>Height: ${person.height}</li>
                <li>Mass : ${person.mass}</li>
              </ul>
           `;
  });
  /*
  //console.info(people);
  for (var i = 0; i < people.results.length; i++) {
    var person = people.results[i];
    var createSection = document.createElement('section');
    createSection.classList.add('cardsStyle');
    createSection.innerHTML = `<header >
                                  <h1 class="lable"> ${person.name}</h1>
                                  </header>
                                  <div>
                                    <ul>
                                      <li>Birth Year : ${person.birth_year}</li>
                                      <li>Eye Color : ${person.eye_color}</li>
                                      <li>Skin Color : ${person.skin_color}</li>
                                      <li>Hair Color : ${person.hair_color}</li>
                                      <li>Height: ${person.height}</li>
                                      <li>Mass : ${person.mass}</li>
                                    </ul>
                                 `;
      cardsElement.appendChild(createSection);

  }*/
}


//
function renderPlanets(planets){
  var cardsElement = renderGenerics(planets, renderPlanets, function(planet){
    return `<header >
                  <h1 class="lable"> ${planet.name}</h1>
            </header>
                <ul>
                  <li>Climate : ${planet.climate}</li>
                  <li>Created : ${planet.created}</li>
                  <li>Diameter : ${planet.diameter}</li>
                  <li>Edited : ${planet.edited}</li>
                </ul>
                  `
  });
}
//
function renderFilms(films){
  var cardsElement = renderGenerics(films, renderFilms, function(film){
    return  `<header >
              <h1 class="lable"></h1>
              </header>
                <ul>
                  <li>Created : ${film.created}</li>
                  <li>Director : ${film.director}</li>
                  <li>Edited : ${film.Edited}</li>
                  <li>Episode_Id : ${film.episode_id}</li>
                  <li>Opening_Crawl : ${film.opening_crawl}</li>
                </ul>
             `
  });
}

//
function renderSpecies(species){
  var cardsElement = renderGenerics(species, renderSpecies, function(specie){
    return  `<header >
              <h1 class="lable"> ${specie.name}</h1>
              </header>
                <ul>
                  <li>Average Height : ${specie.average_height}</li>
                  <li>Average Lifespan : ${specie.average_lifespan}</li>
                  <li>Classification : ${specie.classification}</li>
                  <li>Created : ${specie.created}</li>
                  <li>Edited : ${specie.edited}</li>
                  <li>Eye Colors : ${specie.eye_colors}</li>
                  <li>Hair Colors : ${specie.hair_colors}</li>
                  <li>Language : ${specie.language}</li>
                </ul>
             `
  });
}

//

function renderVehicles(vehicles){
  var cardsElement = renderGenerics(vehicles, renderVehicles, function(vehicle){
    return  `<header >
              <h1 class="lable"> ${vehicle.name}</h1>
              </header>
              <div>
                <ul>
                  <li>Cargo Capacity : ${vehicle.cargo_capacity}</li>
                  <li>Consumables : ${vehicle.consumables}</li>
                  <li>Cost in Credits : ${vehicle.cost_in_credits}</li>
                  <li>Created : ${vehicle.created}</li>
                  <li>Crew : ${vehicle.crew}</li>
                  <li>Edited : ${vehicle.Edited}</li>
                  <li>Length : ${vehicle.length}</li>
                  <li>Max Atmosphering Speed : ${vehicle.max_atmosphering_speed}</li>
                  <li>Model : ${vehicle.model}</li>
                  <li>Passengers : ${vehicle.passengers}</li>
                </ul>
             `
      });
}


//

function renderStarship(starships){
  var cardsElement = renderGenerics(starships, renderStarship, function(starship){
    return  `<header >
              <h1 class="lable"> ${starship.name}</h1>
              </header>
              <div>
                <ul>
                  <li>MGLT : ${starship.MGLT}</li>
                  <li>Consumables : ${starship.consumables}</li>
                  <li>Cargo Capacity : ${starship.cargo_capacity}</li>
                  <li>Cost in Credits : ${starship.cost_in_credits}</li>
                  <li>Created : ${starship.created}</li>
                  <li>Crew : ${starship.crew}</li>
                  <li>Edited : ${starship.edited}</li>
                  <li>Hyperdrive Rating : ${starship.hyperdrive_rating}</li>
                  <li>Length : ${starship.length}</li>
                  <li>Manufacturer : ${starship.manufacturer}</li>
                  <li>Max Atmosphering Speed : ${starship.max_atmosphering_speed}</li>
                  <li>Model : ${starship.model}</li>
                  <li>Passengers : ${starship.passengers}</li>
                </ul>
             `
      });
}
function renderUnimplemented(){
  mainElement.innerHTML = "Sorry, this is not implementes yet";
}

function renderMenu(data){
  Object.keys(data).forEach(function(key){
    var listItem = document.createElement('li');
    var link = document.createElement('a');
    link.textContent = key;
    link.addEventListener('click',function(){
      if(!renderers[key])return renderUnimplemented();
      loadData(data[key], renderers[key]);
    })
    menuElement.appendChild(listItem);
    listItem.appendChild(link);
  });
}


function loadData(url, done){
  var xm2Http = new XMLHttpRequest();
  xm2Http.addEventListener('load',function(){
    var response =JSON.parse(xm2Http.responseText);
    mainElement.classList.remove('loading');
    done(response);
  });
  xm2Http.open('get', url);
  xm2Http.send();
  mainElement.classList.add('loading');
  mainElement.appendChild(loader);
}
//
function createButton(what, url, done, container){
      if(!url) return;
         var btn = document.createElement('button');
         btn.textContent = what;
         btn.classList.add(what);
         btn.addEventListener('click', function(){
          loadData(url,done);
         })
         container.appendChild(btn);

}


renderers.people = renderPeople;
renderers.planets= renderPlanets;
renderers.films = renderFilms;
renderers.species = renderSpecies;
renderers.vehicles = renderVehicles;
renderers.starships = renderStarship;

loadPeople(renderPeople);
loadData('https://swapi.co/api/', renderMenu);
//loadData("https://swapi.co/api/planets/", renderPlanets);



/*function createModel(){
  var Modalcreate = document.createElement('div');
  Modalcreate.innerHTML =`<div class="body">
                      <div class="controls">
                        <button>close</button>
                      </div>
                      <div class="content"></div>
                    </div>
                    <div class="underlay"></div>`;
Modalcreate.classList.add('modal');
}
var divContentElement = document.querySelector('content');

function showModal(contentElement){
  divContentElement.innerHTML="";
  divContentElement.appendChild(contentElement);

}*/
