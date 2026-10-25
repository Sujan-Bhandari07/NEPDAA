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
import { setonlineusers, setsocketconnected } from "./store/socketslice";
import {
  clearSocketClient,
  setSocketClient,
} from "./store/socketClient";
import { useGetuserQuery } from "./store/userapi";
import { setisauth, setuser } from "./store/Userslice";

const App = () => {
  const dispatch = useAppDispatch();

  const { user, isauth } = useAppSelector((state) => state.user);
  const { data, isSuccess, isError } = useGetuserQuery();

  useEffect(() => {
    if (isSuccess && data?.payload) {
      dispatch(setuser(data.payload));
      dispatch(setisauth(true));
    } else if (isError) {
      dispatch(setuser(null));
      dispatch(setisauth(false));
    }
  }, [data, dispatch, isError, isSuccess]);

  useEffect(() => {
    let socketInstance: Socket | undefined;
    if (isauth && user) {
      socketInstance = io(new URL(import.meta.env.VITE_BACKEND_URL).origin, {
        query: { userid: user._id },
        transports: ["websocket"],
      });
      setSocketClient(socketInstance);

      socketInstance.on("connect", () => {
        dispatch(setsocketconnected(true));
      });

      socketInstance.on("disconnect", () => {
        dispatch(setsocketconnected(false));
      });

      socketInstance.on("getonlineusers", (data: Array<string>) => {
        dispatch(setonlineusers(data));
      });
    }

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
        clearSocketClient(socketInstance);
        dispatch(setsocketconnected(false));
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
