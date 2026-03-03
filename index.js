const bookDisplay = document.getElementById("bookDisplay");
var nextId = "N/A";
var previousID = "N/A";
var versionSelected = "78a9f6124f344018-01";
var chapterSelected = "GEN.1";
let chapterCount = 0;

async function loadVerse() {
  try {

const response = await fetch(`https://bible-github-io.onrender.com/bible/${versionSelected}/${chapterSelected}?content-type=html&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=true`);    const userData = await response.json();

    bookDisplay.innerHTML = userData.data.content;
    nextId = userData.data.next?.id || "N/A";
    previousID = userData.data.previous?.id || "N/A";

    if (nextId === "GEN.1") {
      console.log("can't go back");
    }
  } catch (err) {
    console.error("Error fetching verses:", err);
  }
}


bookDisplay.addEventListener("click", (e) => {
  const verse = e.target.closest(".verse-span");
  if (!verse) return;


  verse.classList.toggle("highlight");
  console.log("yes");

});



document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll("#footer > div");
  const displays = document.querySelectorAll("#content > div.section");
  const headers = document.querySelectorAll("#header > div");
  const verses = bookDisplay.childNodes;


  

 

 

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

  const initialSection = sections[1].dataset.name;
  highlightSelected(initialSection);
  showDisplay(initialSection);
  showHeader(initialSection);

  const versionSelect = document.getElementById("versionSelect");
  if (versionSelect) {
    versionSelect.addEventListener('change', (e) => {
      versionSelected = e.target.value;
      loadVerse();
    });
  } else {
    console.log('versionSelect not found');
  }

});


function nextChapter() {
    chapterSelected = nextId;
    loadVerse();

}

function previousChapter() {
    if (previousID == "GEN.Intro") {
        return;
    }
    else {
        chapterSelected = previousID;
        loadVerse();
    }


}





