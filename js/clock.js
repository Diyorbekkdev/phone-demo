const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minutes");
const secondEl = document.getElementById("seconds");
const ampmEl = document.getElementById("ampm");

function updateClock() {
  let currentTime = new Date();
  let h = currentTime.getHours();
  let m = currentTime.getMinutes();
  let s = currentTime.getSeconds();
  let ampm = "AM";

  if (h > 12) {
    h = h - 12;
    ampm = "PM";
  }

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  hourEl.innerHTML = h;
  minuteEl.innerHTML = m;
  secondEl.innerHTML = s;
  ampmEl.innerText = ampm;

  setTimeout(updateClock, 1000);
}

updateClock();


const clockContent = document.querySelector('.clock-content');
const content = document.getElementById('content');
const krilContent = document.querySelector('.kril-content');
const alarmClock = document.querySelector('.alarm-content')
const caseContent = document.querySelector('.case_converter')
function changeContent(){
  content.style.display = 'none';
  clockContent.style.display = 'block';
  alarmClock.style.display = "none";
}
function changeContent2(){
  content.style.display = 'none';
  clockContent.style.display = 'none';
  alarmClock.style.display = "none";
  
}
function changeContent3(){
  content.style.display = 'none';
  clockContent.style.display = 'none';
  krilContent.style.display = 'none';

}
function changeContent4(){
  content.style.display = 'none';
  clockContent.style.display = 'none';
  krilContent.style.display = 'none';
  alarmClock.style.display = 'block';
  caseContent.style.display = 'none';

}
function closeBtn(){
  clockContent.style.display = 'block';
  content.style.display = 'block';
  alarmClock.style.display = 'block';
  reloadPage()
}

function reloadPage() {
  location.reload();
}

function closeBtn2(){
  clockContent.style.display = 'block';
  content.style.display = 'block';
  alarmClock.style.display = 'block';
  reloadPage()
}