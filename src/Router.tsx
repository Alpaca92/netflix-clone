import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="tv" element={<Tv />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
