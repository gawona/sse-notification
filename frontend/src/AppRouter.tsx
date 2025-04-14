import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./routes/Login"
import Home from "./routes/Home"
import Signup from './routes/Signup';
import Notification from './routes/Notification';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/notification" element={<Notification />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
