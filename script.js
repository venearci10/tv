let playlist = [];

function addVideo() {
  const title = document.getElementById('videoTitle').value.trim();
  const url = document.getElementById('videoUrl').value.trim();
  const duration = document.getElementById('videoDuration').value || 180;

  if(!title || !url) {
    alert('Por favor completa el título y la URL del vídeo.');
    return;
  }

  playlist.push({ title, url, duration });
  updatePlaylistUI();

  document.getElementById('videoTitle').value = '';
  document.getElementById('videoUrl').value = '';
}

function updatePlaylistUI() {
  const ul = document.getElementById('playlistView');
  ul.innerHTML = '';
  playlist.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${index + 1}. ${item.title} (${item.duration}s)`;
    ul.appendChild(li);
  });
}

function generateM3U8() {
  if(playlist.length === 0) {
    alert('Añade al menos un vídeo a la parrilla.');
    return;
  }

  // Encabezados Estándar HLS
  let m3u8Content = `#EXTM3U\n#EXT-X-VERSION:3\n#EXT-X-TARGETDURATION:300\n#EXT-X-MEDIA-SEQUENCE:0\n#EXT-X-PLAYLIST-TYPE:VOD\n\n`;

  playlist.forEach(item => {
    m3u8Content += `#EXTINF:${item.duration},${item.title}\n${item.url}\n`;
  });

  m3u8Content += `#EXT-X-ENDLIST`;

  document.getElementById('m3u8Output').value = m3u8Content;
  
  if(playlist[0].url) {
    playPreview(playlist[0].url);
  }
}

function playPreview(url) {
  const video = document.getElementById('previewPlayer');
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(video);
  } else {
    video.src = url;
  }
}

function downloadM3u8() {
  const content = document.getElementById('m3u8Output').value;
  if(!content) return alert('Primero genera el manifiesto.');
  
  const blob = new Blob([content], { type: 'application/x-mpegurl' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'canal1.m3u8';
  a.click();
}
