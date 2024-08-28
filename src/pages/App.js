import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./Home";
import Timeline from "./Timeline";
import UpdateQuote from "./UpdateQuote";
import RepairLanding from "./RepairLanding";
import CustomerLanding from "./CustomerLanding";
import Login from "./Login";
import Register from "./Register";


function App() {
	return (
		<Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Timeline" element={<Timeline />} />
        <Route path="/UpdateQuote" element={<UpdateQuote />} />
        <Route path="/RepairLanding" element={<RepairLanding />} />
        <Route path="/CustomerLanding" element={<CustomerLanding />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
	);
}

export default App;
