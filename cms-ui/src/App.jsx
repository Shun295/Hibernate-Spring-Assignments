import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import PageNotFound from "./pages/PageNotFound";
const App =() =>
{
  return(
  <div>
     <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Auth />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>

  </div>
  )

}
export default App;