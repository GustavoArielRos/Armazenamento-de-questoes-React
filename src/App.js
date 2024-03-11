import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

//PAGES
import Home from "./components/pages/Home"
import CreateFolder from "./components/pages/CreateFolder"
import Folders from './components/pages/Folders';

import Folder from "./components/pages/Folder"

function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/createfolder" element={<CreateFolder />} />
          <Route path="/folders" element={<Folders />} />
          <Route path="/folder/:id" element ={<Folder />} />
          
        </Routes>
    </Router>
  );
}

export default App;
