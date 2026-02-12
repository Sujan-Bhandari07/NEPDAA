import {  useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import type { errortype, formtype } from "../types/loginpagetypes";
import {
  useCheckresetotpMutation,

  useLoginMutation,
  useNewpasswordMutation,
  useRegisterMutation,
  useSendresetotpMutation,
} from "../store/userapi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/Hooks";
import { setisauth, setuser } from "../store/Userslice";

// @ts-nocheck

const Login = () => {
  const dispatch = useAppDispatch();


  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [login, setLogin] = useState(true);
  const [otp, setOtp] = useState(false);
  const [conotp, setConotp] = useState(false);
  const [form, setForm] = useState<formtype>({
    username: "",
    fullname: "",
    email: "",
    password: "",
    newpassword: "",
    otps: "",
  });
const [checkotp,{isLoading:checkloading,data:checkdata,isError:checkiserror,error:checkerror,isSuccess:checkissuc}]=useCheckresetotpMutation()

const [newpass,{data:pd,isError:pie,error:pe,isSuccess:pis,isLoading:pil}]=useNewpasswordMutation()

  const [
    register,
    {
      data: registerdata,
      error: registererror,
      isError: registeriserror,
      isSuccess: registerissuccess,
      isLoading: registerisloading,
    },
  ] = useRegisterMutation();

  const [
    logins,
    { data: ld, error: le, isError: lie, isSuccess: lis, isLoading: lil },
  ] = useLoginMutation();



  const [sendresetotp] = useSendresetotpMutation();

  const handleform = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlelogin = () => {
    setLogin((prev) => !prev);
  };
  const handleotp = async () => {
    if (login && !otp && !conotp) {
      if(!user){
        return toast.error("Login first")
      }
      
      const a = await sendresetotp({ email: user.email}).unwrap();
      if (a.success) {
        toast.success(a.message);
        setForm({
          username: "",
          email: "",
          password: "",
          fullname: "",
          newpassword: "",
          otps: "",
        });
        setLogin(false);
        setOtp(true);
      }
    }
    if (otp) {
      setOtp(false);
      setLogin(true);
    }
    if (conotp) {
      setConotp(false);
      setOtp(true);
    }
  };

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!login && !otp && !conotp) {
      const a = await register({
        fullname: form.fullname,
        username: form.username,
        email: form.email,
        password: form.password,
      }).unwrap();
      if (a.success) {
        setForm({
          username: "",
          email: "",
          password: "",
          fullname: "",
          newpassword: "",
          otps: "",
        });
      }
    }

    if (login && !otp && !conotp) {
      const a = await logins({
        email: form.email,
        password: form.password,
      }).unwrap();
      if (a.success) {
        setForm({
          username: "",
          email: "",
          password: "",
          fullname: "",
          newpassword: "",
          otps: "",
        });
      }
    }
    if(conotp){
      const a = await newpass({email:user?.email,password:form.password,confirmpassword:form.newpassword}).unwrap()
      if(a.success){
        setForm({
          username: "",
          email: "",
          password: "",
          fullname: "",
          newpassword: "",
          otps: "",
        });

      }
    }

    if(otp){

      const a= await checkotp({email:user?.email,otp:form.otps}).unwrap()

      if(a.success){
        setOtp(false);
      setConotp(true);
      }
     
    
    }

    

    //
  };

  useEffect(() => {
    let id: string;

    if (registerisloading) {
      id = toast.loading("");
    }

    if (registeriserror && registererror && "data" in registererror) {
      const error = registererror.data as errortype;
      toast.error(error.message);
    }
    if (registerissuccess) {
      dispatch(setuser(registerdata.payload));
      dispatch(setisauth(true))
      navigate("/");

      toast.success(registerdata.message);
    }
    return () => {
      if (id) {
        toast.dismiss(id);
      }
    };
  }, [
    registerdata,
    registererror,
    registeriserror,
    registerisloading,
    registerissuccess,
    navigate,
    dispatch,
  ]);

  useEffect(() => {
    let id: string;

    if (lil) {
      id = toast.loading("");
    }

    if (lie && le && "data" in le) {
      const error = le.data as errortype;
      toast.error(error.message);
    }
    if (lis) {
      dispatch(setuser(ld.payload));
      dispatch(setisauth(true))
      navigate("/");

      toast.success(ld.message);
    }
    return () => {
      if (id) {
        toast.dismiss(id);
      }
    };
  }, [ld, le, lie, lis, lil, navigate, dispatch]);


  useEffect(() => {
    
    let id:string
    if(checkloading){
      id = toast.loading("")
    }
    if(checkiserror && checkerror && "data" in checkerror){

      const error = checkerror.data as errortype
      toast.error(error.message)
    }
    if(checkissuc){
      toast.success(checkdata.message)
    }
  
    return () => {
if(id)toast.dismiss(id)
    }
  }, [checkdata,checkerror,checkiserror,checkissuc,checkloading])
  



  useEffect(() => {
    let id:string

    if(pil){
      id = toast.loading("")
    }
    if(pis){
      navigate("/")
      toast.success(pd.message)
    }
    if(pie && pe && "data" in pe){
      const error = pe.data as errortype
      toast.error(error.message)
    }
  
    return () => {
      if(id)toast.dismiss(id)
    }
  }, [pd,pe,pis,pie,pil,navigate])
  
console.log(form)
  console.log(ld,le)
  return (
    <form
      onSubmit={handlesubmit}
      className="login   flex justify-center flex-col gap-3 items-center w-screen h-screen"
    >
      <h1 className="text-6xl font-bold">
        {!login && !otp && !conotp
          ? "SIGN UP"
          : login && !otp && !conotp
            ? "SIGN IN"
            : otp
              ? "Enter OTP"
              : "New password"}
      </h1>
      <div className="card flex flex-col  p-5 rounded-xl  gap-5 w-1/3   items-center  ">
        {!login && !otp && !conotp && (
          <input
            onChange={handleform}
            name="fullname"
            value={form.fullname}
            className="w-full h-full border outline-0  py-2 border-black-200 text-[1.1rem] px-4 mx-1"
            type="text"
            placeholder="Enter your fullname"
          />
        )}
        {!login && !otp && !conotp && (
          <input
            onChange={handleform}
            name="username"
            value={form.username}
            className="w-full h-full border outline-0  py-2 border-black-200 text-[1.1rem] px-4 mx-1"
            type="text"
            id=""
            placeholder="Enter your username"
          />
        )}
        {!otp && !conotp && (
          <input
            onChange={handleform}
            name="email"
            value={form.email}
            className="w-full h-full border outline-0  py-2 border-black-200 text-[1.1rem] px-4 mx-1"
            type="email"
            id=""
            placeholder="Enter your email"
          />
        )}
        {!otp && (
          <input
            onChange={handleform}
            name="password"
            value={form.password}
            className="w-full h-full border outline-0  py-2 border-black-200 text-[1.1rem] px-4 mx-1"
            type="password"
            id=""
            placeholder="Enter your password"
          />
        )}

        {otp && (
          <input
            onChange={handleform}
            name="otps"
            value={form.otps}
            className="w-full h-full border outline-0  py-2 border-black-200 text-[1.1rem] px-4 mx-1"
            type="text"
            placeholder="Enter OTP"
          />
        )}
        {conotp && (
          <input
            onChange={handleform}
            name="newpassword"
            value={form.newpassword}
            className="w-full h-full border outline-0  py-2 border-black-200 text-[1.1rem] px-4 mx-1"
            type="password"
            placeholder="Enter Confirm password"
          />
        )}

        <div className="w-full px-1 flex justify-between items-center">
          <div
            onClick={handleotp}
            className={`font-light ${login && "blue"} ${otp && "blue"} ${conotp && "blue"}`}
          >
            {!login && !otp && !conotp ? (
              "Already have account?"
            ) : login && !otp && !conotp ? (
              "Forget password"
            ) : otp ? (
              <IoIosArrowRoundBack size={30} />
            ) : (
              conotp && !otp && <IoIosArrowRoundBack size={30} />
            )}
          </div>
          {!otp && !conotp && (
            <div
              onClick={handlelogin}
              className="font-light hover:text-blue-600 cursor-pointer"
            >
              {login && !otp && !conotp ? "Sign up" : "Sign in"}
            </div>
          )}
        </div>
        <button
          type="submit"

          className="bg-black cursor-pointer text-white px-3 border-none outline-none py-1"
        >
          {login && !otp
            ? "Sign in"
            : !login && !otp
              ? "Sign up"
              : otp ? "Send":conotp && "Send"}
        </button>
      </div>
    </form>
  );
};

export default Login;
