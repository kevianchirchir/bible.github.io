const bookSelect = document.getElementById("bookSelect");
let chapterSelect = document.getElementById("chapterSelect");
const bookDisplay = document.getElementById("bookDisplay");


let chapterCount = 0;


const chapterMap = {
  "Genesis": 50,
  "Exodus": 40,
  "Leviticus": 27,
  "Numbers": 36,
  "Deuteronomy": 34,
  "Joshua": 24,
  "Judges": 21,
  "Ruth": 4,
  "1 Samuel": 31,
  "2 Samuel": 24,
  "1 Kings": 22,
  "2 Kings": 25,
  "1 Chronicles": 29,
  "2 Chronicles": 36,
  "Ezra": 10,
  "Nehemiah": 13,
  "Esther": 10,
  "Job": 42,
  "Psalms": 150,
  "Proverbs": 31,
  "Ecclesiastes": 12,
  "Song Of Solomon": 8,
  "Isaiah": 66,
  "Jeremiah": 52,
  "Lamentations": 5,
  "Ezekiel": 48,
  "Daniel": 12,
  "Hosea": 14,
  "Joel": 3,
  "Amos": 9,
  "Obadiah": 1,
  "Jonah": 4,
  "Micah": 7,
  "Nahum": 3,
  "Habakkuk": 3,
  "Zephaniah": 3,
  "Haggai": 2,
  "Zechariah": 14,
  "Malachi": 4,

  "Matthew": 28,
  "Mark": 16,
  "Luke": 24,
  "John": 21,
  "Acts of the Apostles": 28,
  "Romans": 16,
  "1 Corinthians": 16,
  "2 Corinthians": 13,
  "Galatians": 6,
  "Ephesians": 6,
  "Philippians": 4,
  "Colossians": 4,
  "1 Thessalonians": 5,
  "2 Thessalonians": 3,
  "1 Timothy": 6,
  "2 Timothy": 4,
  "Titus": 3,
  "Philemon": 1,
  "Hebrews": 13,
  "James": 5,
  "1 Peter": 5,
  "2 Peter": 3,
  "1 John": 5,
  "2 John": 1,
  "3 John": 1,
  "Jude": 1,
  "Revelation": 22
};

const books = Object.keys(chapterMap);

for (const book in chapterMap) {
  const option = document.createElement("option");
  option.value = book;
  option.textContent = book;
  bookSelect.appendChild(option);
}

bookSelect.addEventListener("change", () => {

  chapterCount = chapterMap[bookSelect.value] || 0;


  chapterSelect.innerHTML = "";
  for (let i = 1; i <= chapterCount; i++) {
    const chapter = new Option(i, i);
    chapterSelect.add(chapter);
  }
  loadVerse();
});


chapterSelect.addEventListener("change", () => {
  loadVerse();
});
function getData(book, chapter) {
  return fetch(`https://bible-api.com/${book}+${chapter}`)
    .then(response => response.json())
    .then(data => {
      return data.text;
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
}

async function loadVerse() {
  const response = await fetch(`https://bible-api.com/${bookSelect.value}+${chapterSelect.value}`);
  const data = await response.json();

  // data.verses is an array of verses
  const verses = data.verses;

  let html = "";
  for (const v of verses) {
    html += `<span class="verse" data-verse="${v.verse}" id="verse-${v.verse}">
               <strong>${v.verse}</strong> ${v.text.trim()}
             </span><br/>`;
  }

  bookDisplay.innerHTML = html;
}

window.addEventListener("load", async () => {
  bookSelect.value = "Genesis";

  chapterCount = chapterMap[bookSelect.value] || 0;
  chapterSelect.innerHTML = "";
  for (let i = 1; i <= chapterCount; i++) {
    const chapter = new Option(i, i);
    chapterSelect.add(chapter);
  }

  chapterSelect.value = "1";

  await loadVerse();
});



bookDisplay.addEventListener("click", (e) => {
  const verse = e.target.closest(".verse");
  if (!verse) return;

  // Toggle the highlight class
  verse.classList.toggle("highlight");

  
});




document.addEventListener('DOMContentLoaded', function () {
  chapterCount = chapterMap[bookSelect.value] || 0;
  const sections = document.querySelectorAll("#footer > div");
  const displays = document.querySelectorAll("#content > div.section"); // Content sections
  const headers = document.querySelectorAll("#header > div");


  chapterSelect.innerHTML = "";
  for (let i = 1; i <= chapterCount; i++) {
    const chapter = new Option(i, i);
    chapterSelect.add(chapter);
  }

  loadVerse();

  async function highlightSelected(buttonName) {


    sections.forEach(btn => {
      if (btn.dataset.name === buttonName) {
        btn.classList.add("text-white");
        btn.classList.remove("text-zinc-500");
      }
      else {
        btn.classList.add("text-zinc-500");
        btn.classList.remove("text-white");
      }

    });

  }
  function showDisplay(displayName) {
    displays.forEach(display => {
      if (display.id.toLowerCase().includes(displayName.toLowerCase())) {
        display.classList.add("active");


      } else {
        display.classList.remove('active');
      }
    });
  }
  function showHeader(headerName) {
    headers.forEach(header => {
      if (header.id.toLowerCase() === `${headerName.toLowerCase()}header`) {
        header.classList.remove("hidden");

      }
      else {
        header.classList.add('hidden');

      }
    });
  }





  sections.forEach(btn => {
    btn.addEventListener("click", () => {
      const name = btn.dataset.name;
      highlightSelected(name);
      showDisplay(name);
      showHeader(name);
    });

  });

  const initialSection = sections[0].dataset.name;
  highlightSelected(initialSection);
  showDisplay(initialSection);
  showHeader(initialSection);
});




/* TODO: SETUP OTHER SECTION DISPLAYS */
function displayInformation(displayName) {

  const display = document.querySelectorAll("#content > div");
  console.log(display);

}



/* TODO: SETUP SETTINGS */
function openSettings(){
  
}