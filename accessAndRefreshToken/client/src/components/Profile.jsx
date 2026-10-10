import { useContext, useEffect, useState } from "react";
import Section from "../context/Context";
import useApi from "../api/useApi";

const Profile = () => {
  const { user, setuser } = useContext(Section.store);
  const api = useApi();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchProfile = async () => {
      setLoading(true)
      try {
        const response = await api.get("/auth/me",);
        setuser(response.data.data.user);
      } catch (error) {
        console.log("error in me ", error)
      } finally {
        setLoading(false)
      }
    };

    fetchProfile();

    return () => controller.abort();
  }, [api, setuser]);

  if (loading) {
    return (
      <div role="status" aria-live="polite" style={{ textAlign: "center", margin: "40px" }}>
        Loading your profile...
      </div>
    );
  }

  return (
    <div
      style={{
        width: "300px",
        margin: "40px auto",
        padding: "25px",
        textAlign: "center",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
      }}
    >
      <img
        src={user?.profileImage || "https://i.pravatar.cc/150?img=12"}
        alt="Profile"
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          objectFit: "cover",
          marginBottom: "15px",
        }}
      />

      <h2>{user?.name || "User Name"}</h2>
      <p style={{ color: "#666" }}>{user?.email || "user@example.com"}</p>
    </div>
  );
};

export default Profile;
