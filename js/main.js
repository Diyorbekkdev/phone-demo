// move phone screen background

const screen = document.querySelector('.screen');
const screenRect = screen.getBoundingClientRect();

screen.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX - screenRect.left;
  const mouseY = e.clientY - screenRect.top;
  
  const moveX = (mouseX - screenRect.width / 2) / 50;
  const moveY = (mouseY - screenRect.height / 2) / 50;
  
  const bgPosX = `calc(50% + ${moveX}px)`;
  const bgPosY = `calc(50% + ${moveY}px)`;
  const bgSize = `calc(${1.1} * 100%)`;
  
  screen.style.backgroundPosition = `${bgPosX} ${bgPosY}`;
});

// move gradient over text

const mainText = document.querySelector('.main-text');
const textSpan = mainText.querySelector('span');

mainText.addEventListener('mousemove', (e) => {
  const xPos = e.pageX - mainText.offsetLeft;
  const halfWidth = textSpan.offsetWidth * 1;
  const gradientCenter = xPos - halfWidth;
  const gradientPos = gradientCenter * 0.4;

  textSpan.style.backgroundPositionX = `${gradientPos}px`;
  textSpan.style.backgroundPositionY = 'center';
});





