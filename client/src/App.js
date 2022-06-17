// import { Signup } from './components'
import Register from './components/Register';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/register' element = {<Register />} />
          <Route path='/' element = {<Register />} />
        </Routes>
      </div>
    </Router>
  ); 
}

export default App;
