function loadingAnimation() {
  const loader = document.getElementById('siteLoadingIcons');
  let staggerStart = 1;
  for (const child of loader.children) {
    child.style.animationDelay = `${staggerStart}s`;
    child.classList.add('pulse');
    staggerStart += 0.3
  }
}
