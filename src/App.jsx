import { useContext, useEffect } from "react";
import Routing from "./Routing.jsx";
import { DataContext } from "./components/dataprovider/DataProvider.jsx";
import { type } from "./utility/action.type.js";
import { auth } from "./utility/firebase.js";

// import { Carousel } from "react-responsive-carousel";

function App() {
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        dispatch({ type: type.SET_USER, user: authUser });
      } else {
        dispatch({ type: type.SET_USER, user: null });
      }
    });
  }, []);

  return (
    <>
      <Routing />
    </>
  );
}

export default App;
