import { BrowserRouter, Routes, Route } from "react-router-dom";
import hero from "./assets/hero.jpg";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateTrip from "./pages/CreateTrip";
import TripDetails from "./pages/TripDetails";

import Layout from "./components/Layout";

function App() {
  return (
    <div className="min-h-screen relative">

      
      <div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center -z-20"
        style={{ backgroundImage: `url(${hero})` }}
      />

      {/* Dark overlay */}
      <div className="fixed top-0 left-0 w-full h-full bg-black/40 -z-10"></div>

      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />

          <Route
            path="/create-trip"
            element={
              <Layout>
                <CreateTrip />
              </Layout>
            }
          />

          <Route
            path="/trip/:id"
            element={
              <Layout>
                <TripDetails />
              </Layout>
            }
          />

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;