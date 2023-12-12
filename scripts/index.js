const getRandomQuote = async () => {
  const response = await axios.get(
    "https://officeapi.akashrajpurohit.com/quote/random"
  );
  return response.data;
};

const renderQuote = async () => {
  const quoteData = await getRandomQuote();

  document.querySelector(".quote__text").innerText = quoteData.quote;
  document.querySelector(
    ".quote__author"
  ).innerText = `- ${quoteData.character}`;
  document.querySelector(".quote__image").src = quoteData.character_avatar_url;
};

renderQuote();
