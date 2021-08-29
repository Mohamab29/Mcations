import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
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
  if (!user) {
    return (
      <div className="guest-layout">
        <Routing />
      </div>
    );
  } else {
    return (
      <>
        {user ? (
          <div className={"user-layout"}>
            <header>
              <Header />
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
