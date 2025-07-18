import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

function SocketProvider({ children }) {
  const [mySocket, setMySocket] = useState(null);

  const auth = useSelector((state) => state.auth);
  const mobile = useSelector((state) => state.auth.mobile);

  useEffect(() => {
    if (auth.role) {
      const socket = io("http://localhost:3000", {
        withCredentials: true,
      });
         
      socket.on("connect", () => {
        socket.emit("save-id", { mobile });
        
        if (auth.role == "user" || auth.role == "pharmacist") {
          console.log(socket.id);
          setMySocket(socket);
        }
      });
    }
  }, [auth.role]);

  return (
    <>
      <SocketContext.Provider value={mySocket}>
        {children}
      </SocketContext.Provider>
    </>
  );
}

export default SocketProvider;
