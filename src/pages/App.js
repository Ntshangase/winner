import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Timeline from "./Timeline";
import SearchQuote from "./SearchQuote";
import RepairLanding from "./RepairLanding";
import CustomerLanding from "./CustomerLanding";
import Login from "./Login";
import Register from "./Register";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../Components/global.css";
import { Testing } from "./Testing";

function App() {

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/Timeline" element={<Timeline />} />
				<Route path="/SearchQuote" element={<SearchQuote />} />
				<Route path="/RepairLanding" element={<RepairLanding />} />
				<Route path="/CustomerLanding" element={<CustomerLanding />} />
				<Route path="/Login" element={<Login />} />
				<Route path="/Register" element={<Register />} />
				<Route path="/Testing" element={<Testing />} />
			</Routes>
		</Router>
	);
}

export default App;
