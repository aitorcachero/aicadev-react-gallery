import './App.css';
import Slider from './components/Slider';

function App() {
  const images = [
    'https://wallpapers.com/images/hd/1920-x-1080-hd-1qq8r4pnn8cmcew4.jpg',
    'https://wallpapers.com/images/hd/1920-x-1080-hd-1920-x-1080-vye1sz5gtvtcy5fz.jpg',
    'https://wallpapers.com/images/hd/1920-x-1080-hd-2kph8n73fpmvddj1.jpg',
    'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630',
    'https://wallpapers.com/images/hd/1920-x-1080-hd-yshf5x6cdyz4httf.jpg',
    'https://i.redd.it/x8v63p7wu2h61.jpg',
    'https://preview.redd.it/m4h2hhjze8w71.png?auto=webp&s=9bd41e9916365b5bdb38e99cee849b18a84f861a',
    'https://external-preview.redd.it/dT9asdvH-8s81XIdaHVgUSiLs4C2Nn316O1iThnZN_8.jpg?auto=webp&s=7995d45cbded19850c31e440ffd8384601776af1',
    'https://wallpapers.com/images/hd/1920-x-1080-hd-ydvvfje0bdoimttn.jpg',
    'https://wallpapers.com/images/featured/1920x1080-4k-ric2vv7wjk87ythg.jpg',
  ];
  return (
    <>
      <Slider images={images} interval={3000} width={70} height={60} />
    </>
  );
}

export default App;
