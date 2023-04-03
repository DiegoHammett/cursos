import Test from './Test';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from './Landing';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Landing></Landing>} />
        <Route exact path="/test" element={<Test id='3' type={true} />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
