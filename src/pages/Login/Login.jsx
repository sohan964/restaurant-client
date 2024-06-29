import { useContext, useEffect, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Login = () => {

    
    const [disabled, setDisabled] = useState(true);

    const {signIn} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

  //for captcha
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signIn(email,password)
    .then(result =>{
      const user = result.user;
      console.log(user);
      navigate(from, {replace: true})
    })
  };

  const handleValidateCaptcha = (e) => {
    const userCaptchaValue = e.target.value;
    console.log(userCaptchaValue);
    if(validateCaptcha(userCaptchaValue)===true){
        setDisabled(false);
    }else{
        setDisabled(true);
    }
    
  };

  return (
    <>
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content w-1/2 flex-col md:flex-row">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full text-center max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                name="email"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                name="password"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <LoadCanvasTemplate />
              </label>
              <input
                type="text"
                onBlur={handleValidateCaptcha}
                placeholder="captcha"
                className="input input-bordered"
                name="captcha"
              />
            </div>

            <div className="form-control mt-6">
              <input disabled={disabled} className="btn btn-outline border-0 border-b-4" type="submit" value="Login" />
            </div>
          </form>
          <div className="divider"></div>
          <SocialLogin></SocialLogin>
          <p className="my-2"><small>New Here? <Link to='/signup'>Create an account</Link></small></p>
        </div>
      </div>
      
    </div>
    
    </>
  );
};

export default Login;
