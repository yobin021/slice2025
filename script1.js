// STARFIELD — twinkle + slow gentle movement

const starfield = document.getElementById('starfield');
const starCount = 650;
const stars = [];

for (let i = 0; i < starCount; i++) {
  const star = document.createElement('div');
  star.classList.add('star');
  const size = Math.random() * 1 + 0.5; // Smaller stars with twinkle
  star.style.width = size + 'px';
  star.style.height = size + 'px';
  star.style.top = Math.random() * window.innerHeight + 'px';
  star.style.left = Math.random() * window.innerWidth + 'px';
  stars.push({
    element: star,
    x: parseFloat(star.style.left),
    y: parseFloat(star.style.top),
    size,
    speedX: (Math.random() - 0.5) * 9,
    speedY: (Math.random() - 0.5) * 10,
    opacityDirection: Math.random() > 0.5 ? 1 : -1,
    opacity: 0.8 + Math.random() * 0.2
  });
  starfield.appendChild(star);
}

function animateStars() {
  stars.forEach(star => {
    star.x += star.speedX;
    star.y += star.speedY;

    if (star.x < 0) star.x = window.innerWidth;
    if (star.x > window.innerWidth) star.x = 0;
    if (star.y < 0) star.y = window.innerHeight;
    if (star.y > window.innerHeight) star.y = 0;

    star.element.style.left = star.x + 'px';
    star.element.style.top = star.y + 'px';

    star.opacity += 0.005 * star.opacityDirection;
    if (star.opacity >= 1) star.opacityDirection = -1;
    if (star.opacity <= 0.6) star.opacityDirection = 1;
    star.element.style.opacity = star.opacity;
  });
  requestAnimationFrame(animateStars);
}

animateStars();

window.addEventListener('resize', () => {
  stars.forEach(star => {
    star.x = star.x % window.innerWidth;
    star.y = star.y % window.innerHeight;
  });
});

// SHUTTLE ANIMATION

const shuttleContainer = document.getElementById('shuttle-container');
let animationStage = 0;

const enlargedSize = 850; // ~12cm initial size in pixels
const finalSize = 400;    // ~4cm final size in pixels
const durationShrink = 2100;  // 2.1 seconds to shrink
const durationMoveLeft = 1500; // 1.5 seconds to move left

let startTime = null;
let rotationAngle = 0;

function lerp(start, end, t) {
  return start + (end - start) * t;
}

function animateShuttle(timestamp) {
  if (!startTime) startTime = timestamp;
  const elapsed = timestamp - startTime;

  if (animationStage === 0) {
    // Shrink size and morph shape from circle to rounded square
    const progress = Math.min(elapsed / durationShrink, 1);
    const currentSize = lerp(enlargedSize, finalSize, progress);
    shuttleContainer.style.width = currentSize + 'px';
    shuttleContainer.style.height = currentSize + 'px';
    shuttleContainer.style.borderRadius = (50 - 30 * progress) + '%'; // from 50% (circle) to 20% (rounded square)

    if (progress === 1) {
      animationStage = 1;
      startTime = timestamp;
    }
  }
  else if (animationStage === 1) {
    // Move left while keeping final size/shape fixed, include rotation angle
    const progress = Math.min(elapsed / durationMoveLeft, 1);
    shuttleContainer.style.width = finalSize + 'px';
    shuttleContainer.style.height = finalSize + 'px';
    shuttleContainer.style.borderRadius = '20%';

    const moveX = lerp(0, window.innerWidth * 0.3, progress);
    shuttleContainer.style.transform = `translate(calc(-50% + ${moveX}px), -50%) rotate(${rotationAngle}deg)`;

    if (progress === 1) {
  // Show the SLICE logo at the same time shuttle reaches its spot
  const sliceLogo = document.getElementById('slice-logo');
  sliceLogo.style.opacity = '1';
  sliceLogo.style.transform = 'translate(-50%, -50%) scale(1)';

  animationStage = 2;
  startTime = timestamp;
}

  }
  else if (animationStage === 2) {
    // Continuous rotation after settling left and sized
    rotationAngle += 1; // degrees per frame; adjust for faster/slower rotation
    if (rotationAngle >= 360) rotationAngle -= 360;

    shuttleContainer.style.width = finalSize + 'px';
    shuttleContainer.style.height = finalSize + 'px';
    shuttleContainer.style.borderRadius = '20%';

    // Keep shuttle at settled left position while continuously rotating
    const moveX = -window.innerWidth * 0.3;
    shuttleContainer.style.transform = `translate(calc(-50% + ${moveX}px), -50%) rotate(${rotationAngle}deg)`;

    requestAnimationFrame(animateShuttle);
  }

  if (animationStage === 0 || animationStage === 1) {
    requestAnimationFrame(animateShuttle);
  }
}

// Start the shuttle animation after a short delay so the starfield renders first
setTimeout(() => requestAnimationFrame(animateShuttle), 500);


// ... (Starfield + Shuttle animation code same as before) ...


// When shuttle has reached left and animationStage = 2
setTimeout(() => {
    window.location.href = "index1.html";
}, 6200);