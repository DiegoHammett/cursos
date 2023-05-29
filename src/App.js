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
import Dashboard from './Dashboard';
import Navbar from './Navbar';
import Course from './Course';
import MathQ from './MathQ';

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
    return <React.Fragment><Navbar/><Course id={params.id} /></React.Fragment>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/registro" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/logout" element={<Login />} />
        <Route exact path="/edit" element={<EditCourse courseID={1} />} />
        <Route exact path="/course/:id" element={<RouteCourse />} />
        <Route exact path="/dashboard" element={<React.Fragment><Dashboard/></React.Fragment>} />
        <Route exact path="/math" element={<MathQ/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
