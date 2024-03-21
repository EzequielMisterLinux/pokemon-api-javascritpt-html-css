document.addEventListener("DOMContentLoaded", () => {
    const pokemonSearchForm = document.getElementById('pokemon-search-form');
    const battleMusic = document.getElementById("battle-music");
    const toggleMusicButton = document.getElementById("toggle-music");
    const volumeControl = document.getElementById("volume-control");
  
    pokemonSearchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = document.getElementById('navbar-input');
      const idOrName = input.value.trim();
      if (idOrName !== '') {
        fetchData(idOrName);
      }
    });
  
    const navToggle = document.querySelector('.nav-toggle');
    navToggle.addEventListener('click', () => {
      const navLinks = document.querySelector('.nav-links');
      navLinks.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
  
    fetchData(getRandomInt(1, 151));
  
    toggleMusicButton.addEventListener("click", () => {
      if (battleMusic.paused) {
        battleMusic.play();
        toggleMusicButton.textContent = "Pausar música";
      } else {
        battleMusic.pause();
        toggleMusicButton.textContent = "Reproducir música";
      }
    });
  
    volumeControl.addEventListener("input", () => {
      battleMusic.volume = volumeControl.value;
    });
  
    // Reproduce la música automáticamente al cargar la página
    battleMusic.play();
  });
  
  const fetchData = async (idOrName) => {
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${idOrName}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      const pokemon = {
        img: data.sprites.versions["generation-v"]["black-white"].animated.front_default,
        nombre: data.species.name,
        id: data.id,
        exp: data.base_experience,
        hp: data.stats[0].base_stat,
        ataque: data.stats[1].base_stat,
        defensa: data.stats[2].base_stat,
        especial: data.stats[3].base_stat
      };
      pintarCard(pokemon);
    } catch (error) {
      console.log(error);
    }
  };
  
  const pintarCard = (pokemon) => {
    const template = document.querySelector("#template-card").content;
    const clone = template.cloneNode(true);
    const fragment = document.createDocumentFragment();
  
    clone.querySelector(".card-body-img").setAttribute("src", pokemon.img);
    clone.querySelector(".card-body-title").innerHTML = `${pokemon.nombre} <span>${pokemon.id}</span> <span>hp: ${pokemon.hp}</span>`;
    clone.querySelector(".card-body-text").textContent = pokemon.exp + " exp";
    clone.querySelector('.attack').textContent = pokemon.ataque + 'K';
    clone.querySelector('.special').textContent = pokemon.especial + 'K';
    clone.querySelector('.defense').textContent = pokemon.defensa + 'K';
  
    const deleteButton = clone.querySelector('.btn-borrar');
    deleteButton.addEventListener('click', () => {
      const cardToRemove = deleteButton.closest('.row');
      cardToRemove.remove();
    });
  
    fragment.appendChild(clone);
    const flex = document.querySelector(".flex");
    flex.appendChild(fragment);
  };
  
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // Agrega este código al final de tu archivo app.js
  const nav = document.querySelector('nav');
  const navDownThreshold = 100; // Ajusta este valor según tus preferencias
  
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
  
    if (scrollPosition > navDownThreshold) {
      nav.classList.add('nav-down');
    } else {
      nav.classList.remove('nav-down');
    }
  });