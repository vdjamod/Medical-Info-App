import axios from "axios";
import React, { useState, useEffect } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import UserHeader from "../user/UserHeader";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";

function ExpertList() {
  const [expertList, setExpertList] = useState([]);
  const [onlineExpertMobile, setOnlineExpertMobile] = useState("");
  const navigate = useNavigate();
  const mySocket = useContext(SocketContext);
  const location = useLocation();

  useEffect(() => {
    if(!mySocket) return;

    mySocket.on("login", (mobile) => {
      console.log('Logged in...' + mobile);
      setOnlineExpertMobile(mobile);
    });

    return () => {
      mySocket.off("expert-online");
    }
  }, [mySocket, location]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get("/API/pharmacist", {
          withCredentials: true,
        });

        setExpertList(res.data);
      } catch (error) {
        console.error("Error fetching experts:", error);
      }
    }

    getData();
  }, []);

  const handleExpert = (mobile) => {
    navigate("/user/chat-with-expert", {
      state: mobile,
    });
  };
  return (
    <>
      <UserHeader />
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex items-center mb-6">
          <UserCircleIcon className="h-8 w-8 text-indigo-600 mr-2" />
          <h2 className="text-3xl font-bold text-gray-800">Expert List</h2>
        </div>

        {expertList.length === 0 ? (
          <p className="text-gray-500">No experts available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {onlineExpertMobile !== ""  && expertList.map((e, idx) => {
              let status = "offline";

              console.log(onlineExpertMobile);
              console.log(e.mobile);
              if(e.mobile == onlineExpertMobile) {
                console.log("equal");
                status = "online";
              }
            
              return <div
                key={idx}
                // onClick={() => handleExpert(e.mobile)}
                onClick={() => status == 'online' && handleExpert(e.mobile)}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg transition duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xl font-semibold text-indigo-700">
                    {e.name}
                  </p>
                  <span className="flex items-center">
                    <span
                      className={`h-2 w-2 rounded-full mr-1 ${
                        status === "online" ? "bg-green-500" : "bg-gray-400"
                      }`}
                    ></span>
                    <span
                      className={`text-sm ${
                        status == "online"
                          ? "text-green-600"
                          : "text-gray-500"
                      }`}
                    >
                      {status}
                    </span>
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-700">
                    <span className="font-medium">📞 Mobile:</span> {e.mobile}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">🕒 Available:</span>{" "}
                    {e.availableTime.start} – {e.availableTime.end}
                  </p>
                </div>
              </div>;
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default ExpertList;
