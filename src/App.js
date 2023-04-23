import Test from './Test';
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Landing from './Landing';
import Register from './Register';
import Login from './Login';
import CreateTest from './EditTest';

function App() {

  function RouteTest() {
    let params = useParams();
    return <Test id={params.id} type={true} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/test/:id" element={<RouteTest />} />
        <Route exact path="/registro" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/edit" element={<CreateTest testID={5}/>} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
