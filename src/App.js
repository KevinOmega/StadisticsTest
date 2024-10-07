import Footer from "./Footer";
import MainMenu from "./pages/MainMenu";
import StatisticTest from "./pages/StatisticTest";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/stadistic-test/:type" element={<StatisticTest />} />
        <Route path="*" element={<MainMenu />} />
      </Routes>
    </div>
    <Footer/>
    </Router>
  );
}

export default App;
