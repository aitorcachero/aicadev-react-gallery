import './App.css';
import Slider from './components/Slider';

function App() {
  const images = [
    'https://wallpapers.com/images/hd/1920-x-1080-hd-1qq8r4pnn8cmcew4.jpg',
    'https://wallpapers.com/images/hd/1920-x-1080-hd-1920-x-1080-vye1sz5gtvtcy5fz.jpg',
    'https://wallpapers.com/images/hd/1920-x-1080-hd-2kph8n73fpmvddj1.jpg',
    'https://img.goodfon.com/original/1920x1080/3/9c/space-planet-landscape-wallpapers-1920-x-1080.jpg',
    'https://wallpapers.com/images/hd/1920-x-1080-hd-yshf5x6cdyz4httf.jpg',
    'https://i.redd.it/x8v63p7wu2h61.jpg',
    'https://preview.redd.it/m4h2hhjze8w71.png?auto=webp&s=9bd41e9916365b5bdb38e99cee849b18a84f861a',
    'https://nfortec.com/wallpapers/nfortec_wallpaper_v19_4k.jpg',
    'https://wallpapers.com/images/hd/1920-x-1080-hd-ydvvfje0bdoimttn.jpg',
    'https://wallpapers.com/images/featured/1920x1080-4k-ric2vv7wjk87ythg.jpg',
  ];
  return (
    <>
      <Slider images={images} />
    </>
  );
}

export default App;
