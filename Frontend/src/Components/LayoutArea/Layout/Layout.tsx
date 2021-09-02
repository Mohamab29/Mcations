import _ from "lodash";
import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
  const [user, setUser] = useState<UserModel>(store.getState().authState.user);
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setUser(store.getState().authState.user );
    });
    return () => unsubscribe();
  }, [user]);
  // if no one is logged in
  if (_.isEmpty(user) || !user) {
    return (
      <div className="guest-layout">
        <Routing />
      </div>
    );
  } else {
    return (
      <>
        {!_.isEmpty(user) ? (
          <div className={"user-layout"}>
            <header>
              <NavBar/>
            </header>
            <main>
              <Routing />
            </main>
            <footer>
              <Footer />
            </footer>
          </div>
        ) : (
          null
        )}
      </>
    );
  }
}

export default Layout;
