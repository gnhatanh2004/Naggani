// === ELEMENTS ===
const bgEl = document.getElementById("background");
const charEl = document.getElementById("character");
const textEl = document.getElementById("text");
const nameBox = document.getElementById("nameBox");
const menuEl = document.getElementById("menu");
const gameEl = document.getElementById("game");
const choiceBox = document.getElementById("choiceBox");
const dialogueBox = document.getElementById("dialogueBox");

// === STORAGE KEYS ===
const SAVE_KEY = "vn_save_scene";
const ENDINGS_KEY = "vn_endings_unlocked";

// === ENDINGS ===
const endings = {
  A: { name: "Bad end: Lần này anh đoán sai rồi.", unlocked: false },
  B: { name: "uhhuoiyoiuttutuifvryu", unlocked: false },
  C: { name: "Ending C - Route C", unlocked: false },
};

// === SCENES ===
// game.js
import { scenes } from "./scenes.js"; 

// === MAP FOR QUICK LOOKUP ===
const sceneMap = {};
scenes.forEach(s => { if (s.id) sceneMap[s.id] = s; });

// === STATE ===
let currentSceneId = scenes[0].id;
let isTyping = false;
let typeInterval = null;
let currentFullText = "";

// === LOAD/ SAVE ENDINGS ===
function loadEndings() {
  const stored = JSON.parse(localStorage.getItem(ENDINGS_KEY) || "{}");
  Object.keys(endings).forEach(k => { if (stored[k]) endings[k].unlocked = true; });
}
function saveEndings() {
  localStorage.setItem(ENDINGS_KEY, JSON.stringify(Object.fromEntries(Object.entries(endings).map(([k,v]) => [k,v.unlocked]))));
}
loadEndings();

// === GO TO SCENE ===
function goToScene(id) {
  const scene = sceneMap[id];
  if (!scene) { console.error("Scene id not found:", id); return; }
  currentSceneId = id;
  renderScene(scene);
  localStorage.setItem(SAVE_KEY, currentSceneId);

  // Nếu scene có ending, unlock và đánh dấu
  if(scene.ending && endings[scene.ending]){
    endings[scene.ending].unlocked = true;
    saveEndings();
    scene.__endingPending = true;
  }
}

// === RENDER SCENE ===
function renderScene(scene) {
  choiceBox.style.display = "none"; choiceBox.innerHTML = "";

  bgEl.style.opacity = 0;
  charEl.style.opacity = 0;
  setTimeout(() => {
    if(scene.bg) bgEl.src = `asset/backgrounds/${scene.bg}`;
    bgEl.style.opacity = 1;
    if(scene.char && scene.char.toLowerCase() !== "narrator") {
      nameBox.textContent = scene.char.replace(".png","");
      charEl.src = `asset/characters/${scene.char}`;
      charEl.style.opacity = 1;
    } else {
      nameBox.textContent = "Narrator";
      charEl.style.opacity = 0;
    }
  }, 150);

  if(scene.text) { dialogueBox.style.display = "block"; startType(scene.text); }
  else { dialogueBox.style.display = "none"; currentFullText=""; }

  // Nếu scene có ending, unlock và đánh dấu ngay cả khi không qua choice
  if(scene.ending && endings[scene.ending]){
    endings[scene.ending].unlocked = true;
    saveEndings();
    scene.__endingPending = true;
  }
}

// === TYPEWRITER ===
function startType(text) {
  clearInterval(typeInterval);
  textEl.innerHTML = "";
  currentFullText = text;
  let i=0; isTyping=true;
  typeInterval = setInterval(() => {
    if(i<currentFullText.length) textEl.innerHTML += currentFullText[i++];
    else { clearInterval(typeInterval); isTyping=false; }
  }, 25);
}
function finishTypeInstant() {
  if(!isTyping) return;
  clearInterval(typeInterval);
  textEl.innerHTML = currentFullText;
  isTyping=false;
}

// === SHOW CHOICES ===
function showChoices(scene) {
  choiceBox.innerHTML = ""; choiceBox.style.display="flex";
  scene.options.forEach(opt => {
    const btn=document.createElement("button");
    btn.className="choiceBtn"; btn.textContent=opt.text;
    btn.onclick=(e)=>{ e.stopPropagation(); handleChoice(opt); };
    choiceBox.appendChild(btn);
  });
}

// === HANDLE CHOICE ===
function handleChoice(opt) {
  choiceBox.style.display = "none";
  if(opt.goto){
    goToScene(opt.goto);
    return;
  }
}

// === ENDINGS ===
function showEndPopup() {
  const popup=document.getElementById("endPopup");
  const btn=document.getElementById("popupBackMenu");
  if(!popup||!btn) return;
  popup.style.display="flex"; popup.style.zIndex="9999"; gameEl.style.pointerEvents="none";
  if(typeof bgMusic!=="undefined") bgMusic.pause();
  if(typeof endMusic!=="undefined") endMusic.play();
  btn.onclick=()=>{
    popup.style.display="none";
    dialogueBox.style.display="none"; textEl.innerHTML="";
    gameEl.style.display="none"; menuEl.style.display="flex"; gameEl.style.pointerEvents="auto";
    currentSceneId=scenes[0].id; localStorage.removeItem(SAVE_KEY);
  };
}

// === GLOBAL CLICK HANDLER ===
document.body.addEventListener("click",(e)=>{
  if(e.target.closest("#choiceBox") || e.target.closest("#endPopup") || e.target.closest(".choiceBtn")) return;
  const scene=sceneMap[currentSceneId];

  if(isTyping){ finishTypeInstant(); return; }

  if(scene.__endingPending){ delete scene.__endingPending; showEndPopup(); return; }
  if(scene.choice && scene.options){ showChoices(scene); return; }
  if(scene.next){ goToScene(scene.next); return; }

  // fallback linear
  const idx=scenes.findIndex(s=>s.id===currentSceneId);
  if(idx>=0 && idx+1<scenes.length){ goToScene(scenes[idx+1].id); return; }

  textEl.innerHTML="— Hết —";
});

// === ENDINGS MENU ===
document.getElementById("endingsBtn").addEventListener("click",()=>{
  const endingList=document.getElementById("endingList"); endingList.innerHTML="";
  Object.entries(endings).forEach(([k,v])=>{
    const item=document.createElement("div"); item.className="ending-item";
    item.textContent=v.name; if(v.unlocked) item.classList.add("unlocked");
    endingList.appendChild(item);
  });
  document.getElementById("endingGallery").style.display="flex";
});
document.getElementById("backToMenuFromEndings").addEventListener("click",()=>{
  document.getElementById("endingGallery").style.display="none";
});

// === START / CONTINUE ===
document.getElementById("continueBtn").addEventListener("click",()=>startGame(false));
document.getElementById("restartBtn").addEventListener("click",()=>startGame(true));

// === START GAME ===
function startGame(fromStart=false){
  menuEl.style.display="none"; gameEl.style.display="block";
  if(fromStart) currentSceneId=scenes[0].id, localStorage.removeItem(SAVE_KEY);
  else currentSceneId=localStorage.getItem(SAVE_KEY)||scenes[0].id;
  renderScene(sceneMap[currentSceneId]);
  if(typeof bgMusic!=="undefined"){ bgMusic.currentTime=0; bgMusic.play(); }
}
