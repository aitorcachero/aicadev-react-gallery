import './App.css';
import Slider from './components/Slider';

function App() {
  const images = [];
  return (
    <>
      <Slider images={images} interval={1000} width={110} />
    </>
  );
}

export default App;
