const generateBtn = document.querySelector("button");
const memeTitle = document.querySelector(".meme-title");
const memeImage = document.querySelector(".meme-image");
const authorName = document.querySelector(".author span");

async function fetchMeme() {
  try {
    const response = await fetch("https://meme-api.com/gimme/wholesomememes");
    if (!response.ok) throw new Error("Failed to fetch meme.");
    const { author, title, url } = await response.json();

    memeTitle.textContent = title || "No title available";
    memeImage.src =
      url || "https://via.placeholder.com/440x300?text=No+Meme+Image";
    authorName.textContent = author || "Unknown";
  } catch (error) {
    memeTitle.textContent = "Failed to load meme 😔";
    memeImage.src = "https://via.placeholder.com/440x300?text=Error";
    authorName.textContent = "";
    console.error(error.message);
  }
}

// Fetch a meme when the app loads
fetchMeme();

// Fetch a new meme on button click
generateBtn.addEventListener("click", fetchMeme);

const loader = document.querySelector(".loader");

async function fetchMemeWithLoader() {
  loader.style.display = "block";
  try {
    await fetchMeme();
  } finally {
    loader.style.display = "none";
  }
}

generateBtn.addEventListener("click", fetchMemeWithLoader);
