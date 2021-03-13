import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { CourseRoute } from './Router';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <CourseRoute />
      </div>
    </BrowserRouter>
  );
}

export default App;
