import Test from './Test';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from './Landing';
import Register from './Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Landing></Landing>} />
        <Route exact path="/test" element={<Test id='3' type={true} />} />
        <Route exact path="/registro" element={<Register></Register>} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
