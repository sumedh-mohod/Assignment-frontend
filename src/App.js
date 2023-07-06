import { Routes, Route } from "react-router-dom";
import AmenitiesForm from "./components/AmenitiesForm";
import SlotBooked from "./components/SlotBooked";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AmenitiesForm />} />
        <Route path="bookedslot" element={<SlotBooked />} />
      </Routes>
    </div>
  );
}

export default App;
