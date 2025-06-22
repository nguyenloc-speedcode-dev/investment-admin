import { Toaster } from 'sonner';
import { RouterProvider } from 'react-router-dom';
import { browserRouter } from './routes/browserRouter';
import { useDispatch } from 'react-redux';
import { RootState, store } from './store';
import http from './utils/http';
import { apiRoutes } from './routes/api';
import { login, logout } from './store/slices/adminSlice';
import { useEffect, useState } from 'react';
import { socket } from './lib/socket';


function App() {

  const state: RootState = store.getState();
  const { admin } = state as any
  const dispatch = useDispatch();


  const getAdmin = async () => {
    try {
      const res = await http.get(apiRoutes.getAdmin);
      if (res && res.data) {
        dispatch(
          login({
            ...state.admin,
            admin: res.data?.data,
          })
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(logout());

    }
  };

  useEffect(() => {
    getAdmin();
  }, [state.admin]);


  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
      if (admin?.admin?._id) {
        socket.emit("joinApp", admin.admin?._id);
      }
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Socket connect error:", err.message);
    });

    socket.on("disconnect", (reason) => {
      console.warn("⚠️ Socket disconnected:", reason);
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("disconnect");
    };
  }, [admin?.admin?._id]);




  return (
    <div className="fade-in">
      <RouterProvider router={browserRouter} />
      <Toaster />
    </div>
  );
}

export default App;
