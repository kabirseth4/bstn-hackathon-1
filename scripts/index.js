const totalLives = 10;
let livesLost = 0;
const quoteTextEl = document.querySelector(".quote__text");
const inputEl = document.querySelector(".footer__input");

const getRandomQuote = async () => {
  const response = await axios.get(
    "https://officeapi.akashrajpurohit.com/quote/random"
  );
  return response.data;
};

const addHearts = () => {
  const container = document.querySelector(".footer__hearts");
  container.innerHTML = "";

  for (let i = 0; i < totalLives - livesLost; i++) {
    const heartImg = document.createElement("img");
    heartImg.classList.add("footer__heart");
    heartImg.src = "https://freesvg.org/img/BeatingHeart.png";
    container.appendChild(heartImg);
  }

  for (let i = totalLives - livesLost; i < totalLives; i++) {
    const heartImg = document.createElement("img");
    heartImg.classList.add("footer__heart");
    heartImg.classList.add("footer__heart--broken");
    heartImg.src = "https://freesvg.org/img/broken_SVG_heart.png";
    container.appendChild(heartImg);
  }
};
addHearts();

const endGame = () => {
  inputEl.disabled = true;

  const characters = document.querySelectorAll(".character");
  characters.forEach((char) => {
    if (!char.classList.contains("character--correct")) {
      char.classList.add("character--incorrect");
    }
  });
};

const createQuote = (quote) => {
  const quoteLetters = quote.split("");
  const underLined = quoteLetters.map((char) => {
    if (char.match(/[a-z]/i)) {
      return `<span class="character">${char}</span>`;
    } else {
      return char;
    }
  });
  return underLined.join("");
};

const renderQuote = async () => {
  const quoteData = await getRandomQuote();

  quoteTextEl.innerHTML = createQuote(quoteData.quote);
  document.querySelector(
    ".quote__author"
  ).innerText = `- ${quoteData.character}`;
  document.querySelector(".quote__image").src = quoteData.character_avatar_url;
};
renderQuote();

const loseHeart = () => {
  livesLost++;
  addHearts();

  if (livesLost === totalLives) {
    endGame();
  }
};

const checkGuess = (guess) => {
  const characters = document.querySelectorAll(".character");
  let hasFailed = true;

  characters.forEach((char) => {
    if (char.innerText.toLowerCase() === guess.toLowerCase()) {
      char.classList.add("character--correct");
      hasFailed = false;
    }
  });

  if (hasFailed) {
    loseHeart();
  }
};

inputEl.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkGuess(e.target.value);
    inputEl.value = "";
  }
});
