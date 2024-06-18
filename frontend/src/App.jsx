import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { Sendmoney } from "./pages/Sendmoney";

function App() {
  return (
    <>
      <div>const Top Bar it doest change when rendering other pages</div>
      <BrowserRouter>
        {/* here we can add appbar component or the top bar*/}
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/send" element={<Sendmoney />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
