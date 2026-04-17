import { useState } from 'react';
import FacialExpression from './components/FacialExpression'
import MoodSong from './components/MoodSong'



const App = () => {

  const [songs, setSongs] = useState([
  
  ]);
  return (
    <>
   <FacialExpression setSongs={setSongs}/>
   <MoodSong songs={songs}/>
    </>
  )
}

export default App