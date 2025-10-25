function loadingWiggle() {
  const loader = document.getElementById('siteLoadingScreen');
  for (const child of loader.children) {
    child.classList.add('wiggle');
  }
}
