import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contracts from "./pages/Contracts";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Workshops from "./pages/Workshops";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <Header />
      <QueryClientProvider client={queryClient}>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/contracts" element={<Contracts />}></Route>
            <Route path="/orders" element={<Orders />}></Route>
            <Route path="/products" element={<Products />}></Route>
            <Route path="/workshops" element={<Workshops />}></Route>
          </Routes>
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
