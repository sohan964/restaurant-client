import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const {googleSignIn} = useAuth();
    const axiosPublic = useAxiosPublic();
    const naviate = useNavigate();
    const handleGoogleSignIn = () =>{
        googleSignIn()
        .then(result =>{
            console.log(result.user);
            const userInfo = {
                email: result.user.email,
                name: result.user?.displayName,
            }
            axiosPublic.post('/users', userInfo)
            .then(res =>{
                console.log(res.data);
                naviate('/');
            })
        })
    }
  return (
    <div>
      <div>
        <button onClick={handleGoogleSignIn} className="btn btn-wide">
          <FaGoogle></FaGoogle>
          SignIn with Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
