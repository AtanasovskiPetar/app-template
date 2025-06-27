import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>Home page, no auth required</div>
      <button onClick={() => navigate("admin")}>go to admin</button>
    </>
  );
};

export default Home;
