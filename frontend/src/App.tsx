import { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Messages from "./pages/Messages";
import Notification from "./pages/Notification";
import Create from "./pages/Create";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import { Notfound } from "./pages/Notfound";
import { Toaster } from "react-hot-toast";
import Protective from "./components/common/Protective";
import { useAppDispatch, useAppSelector } from "./store/Hooks";
import { io, Socket } from "socket.io-client";
import { setonlineusers, setsocket } from "./store/socketslice";

const App = () => {
  const dispatch = useAppDispatch();

  const { user, isauth } = useAppSelector((state) => state.user);
  useEffect(() => {
    let socketInstance: Socket;
    if (isauth && user) {
      socketInstance = io("https://nepfron.onrender.com", {
        query: { userid: user._id },
        transports: ["websocket"],
      });

      socketInstance.on("connect", () => {
        // Warning: This still triggers the TS error we discussed earlier.
        // Use 'as any' to bypass the TypeScript check if you must store it in Redux.
        dispatch(setsocket({ id: socketInstance }));
      });

      socketInstance.on("getonlineusers", (data: Array<string>) => {
        dispatch(setonlineusers(data));
        console.log(` "online"data`);
      });
    } else {
      console.log(isauth, user);
    }

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
        dispatch(setsocket({ id: null }));
      }
    };
  }, [user, isauth, dispatch]);

  return (
    <div className="app">
      <Toaster position="top-right" />
      <Suspense>
        <Routes>
          <Route
            path="/"
            element={
              <Protective>
                <Layout />
              </Protective>
            }
          >
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="search" element={<Search />} />
            <Route path="message" element={<Messages />} />
            <Route path="notification" element={<Notification />} />
            <Route path="create" element={<Create />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
