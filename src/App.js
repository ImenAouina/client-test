import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom'
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import AddProject from './components/AddProject';

function App() {
const [authorized , setAuthorized] = useState('')
const [projects, setProjects] = useState([])

  return (
    <div>
      <h1 style={{textAlign:"center", marginTop:"20px"}}>Project Manager</h1>
    <Routes>

      <Route path='/' element={<Dashboard projects={projects} setProjects={setProjects}/>}/> 
      <Route path='/sing_in' element={<LoginForm authorized={authorized} setAuthorized={setAuthorized}/>}/> 
      <Route path='/projects/new' element={<AddProject projects={projects} setProjects={setProjects}/>} />
    
    </Routes>
      
    </div>
  );
}

export default App;
