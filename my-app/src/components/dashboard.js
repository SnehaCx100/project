import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const user = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  console.log("user", user);

  const fetchData = async () => {
    try {
      const data = axios
        .get(`https://api.social.ramkrishnan.xyz/user/${user}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res.data);
          const user = JSON.stringify(res.data.response);
          localStorage.setItem("userDetails", user);
          if (res) {
            setName(user);
          }
        });
      setLoading(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          Hi
          <div>
            {" "}
            {loading ? name : <Spinner animation="border" role="status" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
