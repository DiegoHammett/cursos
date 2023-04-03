import './App.css';
import Test from './Test';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" />
            <Route exact path="/test" element={<Test id='3' type={true}/>} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
