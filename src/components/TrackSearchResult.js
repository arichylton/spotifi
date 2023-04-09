const TrackSearchResult = ({ track, chooseTrack, clear }) => {
  const handlePlay = () => {
    chooseTrack(track);
    clear();
  };
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
      className='d-flex align-items-center justify-content-between track-item '
      style={{ cursor: 'pointer' }}
      key={track.uri}
      onClick={handlePlay}
    >
      <div className='d-flex m-1 align-items-center'>
        <img
          src={track.albumUrl}
          style={{ height: '64px', width: '64px' }}
          alt='top-track-img'
        />
        <div className='m-3'>
          <div className='text-white fw-bold'>{track.title}</div>
          <div className='text-muted'>
            {track.artist} • {track.albumName}
          </div>
        </div>
      </div>

      <div className='text-muted m-3 '>{formatTime(track.duration)}</div>
    </div>
  );
};
export default TrackSearchResult;
