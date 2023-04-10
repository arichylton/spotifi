import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {getPlaylist} from '../spotify';
import { TailSpin } from 'react-loader-spinner';
import { catchErrors } from '../utils';

import musicSvg from '../assets/music.svg'

const Playlist = ({accessToken}) => {


  const [playlist, setPlaylist] = useState(null);
  const { id } = useParams();

  useEffect(() => {

    const fetchData = async () => {
      await getPlaylist(accessToken, id).then((playlist) => {
        setPlaylist(playlist.data);
      });
    };
    catchErrors(fetchData());
  }, []);
  console.log(playlist);
  return (
    <div className='text-white artist__page'>
      {playlist ? (
        <div className='d-flex flex-column align-items-center justify-content-center mt-3 w-100'>
          <div className='d-flex flex-column align-items-center'>
            <img
              src={
                playlist.images.length > 0
                  ? playlist.images[0].url
                  : { musicSvg }
              }
              alt='Artist'
              className='rounded'
              style={{ width: 300, height: 300, objectFit: 'cover' }}
            />
            <span className='font-monospace mt-4' style={{ fontSize: 80 }}>
              {playlist.name}
            </span>
          </div>
        </div>
      ) : (
        <TailSpin
          height='80'
          width='80'
          color='#1DB954'
          ariaLabel='tail-spin-loading'
          radius='1'
          wrapperStyle={{}}
          wrapperClass=''
          visible={true}
        />
      )}
    </div>
  );
}
export default Playlist