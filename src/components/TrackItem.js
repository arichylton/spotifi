const TrackItem = ({ track, handlePlay, size, width }) => {
  function formatTime(milliseconds) {
    let totalSeconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(1, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }

  return (
    <div
      className='d-flex align-items-center justify-content-between track-item'
      style={{ cursor: 'pointer' }}
      onClick={() => handlePlay(track)}
    >
      <div className='d-flex m-1 align-items-center '>
        <img
          src={track.album.images[0].url}
          style={{ height: `${size}px`, width: `${size}px` }}
          alt='top-track-img'
        />
        <div className='m-3'>
          <div
            className='text-white fw-bold d-block text-truncate'
            style={{ maxWidth: `${width}` }}
          >
            {track.name}
          </div>
          <div
            className='text-muted d-block text-truncate'
            style={{ maxWidth: `${width}` }}
          >
            {track.artists[0].name} • {track.album.name}
          </div>
        </div>
      </div>

      <div className='text-muted m-3 '>{formatTime(track.duration_ms)}</div>
    </div>
  );
};
export default TrackItem;
