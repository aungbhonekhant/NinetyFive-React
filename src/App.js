import {Routes, Route} from 'react-router-dom';
import Business from './pages/Business';
import CreateDocx from './pages/CreateDocx';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Render from './pages/Render';
import Template from './pages/Template';
import User from './pages/User';
import AuthCheck from  './components/AuthCheck'
import RequireAuth from './components/RequireAuth';
import { Unauthorized } from './pages/Unauthorized';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<AuthCheck/>}>
              {/* public routes */}
              <Route path="/login" element={ <Login />} />
              <Route path="/register" element={ <Register />} />
              <Route path="/" element={ <Home />} />
              <Route path="/unauthorized" element={ <Unauthorized />} />

              {/* protected routes */}
              <Route element={<RequireAuth allowedRoles="admin" />}>
                <Route path="/users" element={ <User />} />
                <Route path="/business" element={ <Business />} />
                <Route path="/template" element={ <Template />} />
                <Route path="/docx" element={ <CreateDocx />} />
                <Route path="/render-docx" element={ <Render />} />
              </Route>
              
          </Route>
      </Routes>
    </div>
  );
}

export default App;
