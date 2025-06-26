import useFetch from "../../hooks/useFetch";

const Admin = () => {

  const {
    data,
  } = useFetch<void>({
    key: 'auth-req',
    url: `admin`,
  });
  
  return <div>Admin page, authenticated and authorized</div>;
};

export default Admin;
