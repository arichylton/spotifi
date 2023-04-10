import { formatDuration } from "../utils";

const TrackItem = ({ track, handlePlay, size, width }) => {

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
            className='text-white d-block text-truncate'
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

      <div className='text-muted m-3 '>{formatDuration(track.duration_ms)}</div>
    </div>
  );
};
export default TrackItem;
