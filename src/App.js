import React from 'react';
import Test from './Test';
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Landing from './Landing';
import Register from './Register';
import Login from './Login';
import './styles/palette.css';
import EditCourse from './EditCourse';
import EditClass from './EditClass';
import Class from './Class';
import Course from './Course';
import MathExp from './MathExp';
import Navbar from './Navbar';

function App() {

  function RouteTest() {
    let params = useParams();
    return <Test id={params.id} retro={true} />;
  }

  function RouteInfo() {
    let params = useParams();
    return <Class id={params.id} />;
  }

  function RouteCourse() {
    let params = useParams();
    return <React.Fragment><Navbar /> <Course id={params.id} /></React.Fragment>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/test/:id" element={<RouteTest />} />
        <Route exact path="/registro" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/editclase" element={<EditClass id="4" mode="edit"/>} />
        <Route exact path="/clase/:id" element={<RouteInfo />} />
        <Route exact path="/edit" element={<EditCourse courseID={1} />} />
        <Route exact path="/course/:id" element={<RouteCourse/>} />
        <Route exact path="/math" element={<MathExp text={"Ecuacion: \\(x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}\\)"}/>} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
