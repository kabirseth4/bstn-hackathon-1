const quoteTextEl = document.querySelector(".quote__text");

const getRandomQuote = async () => {
  const response = await axios.get(
    "https://officeapi.akashrajpurohit.com/quote/random"
  );
  return response.data;
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

const checkGuess = (guess) => {
  const characters = document.querySelectorAll(".character");
  let hasFailed = true;

  characters.forEach((char) => {
    if (char.innerText === guess) {
      char.style.color = "black";
      hasFailed = false;
    }
  });

  if (hasFailed) {
    // Lose health
  }
};

const inputEl = document.querySelector(".footer__input");
inputEl.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkGuess(e.target.value);
    inputEl.value = "";
  }
});
