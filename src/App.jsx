
import './App.css'
import { useState } from 'react';

const bookDisplay = document.getElementById("bookDisplay");
var versionSelected = "78a9f6124f344018-01";
var book = "GEN"
var chapter = 1;
var passage = `${book}.${chapter}`;
let chapterCount = 0;
var API_KEY = "N/A ;)";

export default function App() {


  //CurrentPage: Stores which page is currently active
  //setCurrentPage: Changes the value of current page
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'bible'
  const [modalOpened, setModalOpened] = useState(true);

  return (
    <div id='content' className='min-h-screen items-center   flex flex-col gap-3 overflow-y-hidden'>
      <BibleHeader currentPage={currentPage} setModalOpened={setModalOpened}/>
      <MainContent currentPage={currentPage} />
      <Controls currentPage={currentPage} />
      <Footer setCurrentPage={setCurrentPage} currentPage={currentPage} />
    </div>
  );
}

function BibleHeader({ currentPage, setModalOpened }) {
  console.log(currentPage);
  return currentPage === "bible" ? (
    <header className=' bg-zinc-900/50 text-white w-full h-20 flex items-center justify-between overflow-hidden'>
      <button className='transition-all ml-5 bg-zinc-900/50 hover:bg-white/30 rounded-full p-2' onClick={() => setModalOpened(true)}>Change Passage</button>
      <i class="bx bx-cog mr-5 text-2xl animate-spin transition-all bg-zinc-900/50 rounded-full p-2 hover:bg-white/30 "></i>
    </header>
  ) : null;
}



function MainContent({ currentPage }) {
  return (
    <main className=' flex justify-center items-center relative overflow-hidden'>
      {/* Home Content */}

      <div id='homeContent' className={`flex ${currentPage === 'home' ? 'translate-x-0 scale-100 pointer-events-auto' : 'translate-x-full scale-0 pointer-events-none'}`}>
        <h1>Hello</h1>
      </div>


      {/* Bible Content */}
      <div id='bookDisplay' className={`transition-all hide-scrollbar p-3 text-white  h-[50vh] md:h-[70vh] mr-[5vh] max-w-[60vh] overflow-y-scroll  bg-zinc-900/50 ${currentPage === 'bible' ? 'translate-x-0 scale-100 pointer-events-auto' : 'translate-x-full scale-0 pointer-events-none'}`}>




      </div >
    </main >
  );
}



function Footer({ setCurrentPage, currentPage }) {
  return (

    <footer className=' flex fixed justify-evenly items-center  bottom-0 left-0 w-full bg-zinc-900/50 h-20 overflow-hidden'>
      <div id='footerHome' className={`transition-all flex flex-col gap-2 justify-center items-center ${currentPage === 'home' ? `text-white` : `text-zinc-500`}`} onClick={() => setCurrentPage('home')}>
        <i class="bx bx-home text-lg"></i>
        <h1>Home</h1>
      </div>

      <div id='footerBible' className={`transition-all flex flex-col gap-2 justify-center items-center  ${currentPage === 'bible' ? `text-white` : `text-zinc-500`}`} onClick={() => setCurrentPage('bible')}>
        <i class="bx bx-bible text-lg"></i>
        <h1>Bible</h1>
      </div>


      <div id='footerPlans' className={`transition-all flex flex-col gap-2 justify-center items-center  ${currentPage === 'plans' ? `text-white` : `text-zinc-500`}`} onClick={() => setCurrentPage('plans')}>
        <i class="bx bx-check text-lg"></i>
        <h1>Plans</h1>
      </div>


      <div id='footerDiscover' className={`transition-all flex flex-col gap-2 justify-center items-center  ${currentPage === 'discover' ? `text-white` : `text-zinc-500`}`} onClick={() => setCurrentPage('discover')}>
        <i class="bx bx-search text-lg"></i>
        <h1>Discover</h1>
      </div>


      <div id='footerYou' className={`transition-all flex flex-col gap-2 justify-center items-center  ${currentPage === 'you' ? `text-white` : `text-zinc-500`}`} onClick={() => setCurrentPage('you')}>
        <i class="bx bx-user text-lg"></i>
        <h1>You</h1>
      </div>

    </footer>

  );
}

function Controls({ currentPage }) {
  if (currentPage !== 'bible') return null;

  return (
    <div className='flex justify-center items-center gap-2 text-5xl md:text-3xl mt-5 md:mt-2'>
      <i id="leftArrow"
        className="bx bx-caret-left text-white/50   hover:text-white transition-all cursor-pointer z-0"
      ></i>
      <i id="rightArrow"
        className="bx bx-caret-right text-white/50 hover:text-white transition-all cursor-pointer z-0"
      ></i>

    </div>

  );
}

function Modal({ modalOpened }) {
  if (modalOpened !== true) return null;
  return (
    <div className='fixed inset-0 flexmin-h-screen'>

    </div>
  )
}

loadVerse();
async function loadVerse() {
  try {
    const response = await fetch(`https://rest.api.bible/v1/bibles/${versionSelected}/chapters/${passage}?content-type=html&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=true`, {
      headers: { "api-key": API_KEY }

    })

    const userData = await response.json();
    document.getElementById("bookDisplay").innerHTML = (userData.data.content);
    console.log(userData);
  

  }

  catch (error) {
    console.error("bro smth is cooked idk: ", error.message);
  }


}