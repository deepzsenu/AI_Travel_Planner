import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateTrip from "./pages/CreateTrip";
import TripDetails from "./pages/TripDetails";

import Layout from "./components/Layout";

function App() {

  return (

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

  );
}

export default App;