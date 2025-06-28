import { useNavigate } from "react-router-dom";
import { URL_ADMIN } from "../constants/urls";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>Home page, no auth required</div>
      <button onClick={() => navigate(URL_ADMIN)}>go to admin</button>
    </>
  );
};

export default Home;
