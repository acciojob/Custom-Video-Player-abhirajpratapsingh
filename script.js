const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Toggle Play/Pause
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update Play/Pause Button Icon
function updateButton() {
  if (video.paused) {
    toggle.textContent = '►'; // Play icon
  } else {
    toggle.textContent = '❚❚'; // Pause icon
  }
}

// Update Progress Bar
function updateProgress() {
  const progressPercent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${progressPercent}%`;
}

// Scrub Video
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Skip Video
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Handle Volume & Playback Rate Changes
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// Event Listeners
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', updateProgress);

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('input', handleRangeUpdate));

progress.addEventListener('click', scrub);
progress.addEventListener('mousedown', (e) => {
  progress.addEventListener('mousemove', scrub);
});
progress.addEventListener('mouseup', () => {
  progress.removeEventListener('mousemove', scrub);
});

// Optional: Reset the player (e.g., for edge cases where the video doesn't load properly)
video.addEventListener('error', () => {
  alert('Failed to load the video. Please try again later.');
});
