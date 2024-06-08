import React, { useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import { Link } from 'react-router-dom'
import { validateEmail } from '../../utils/Helper'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { validatePassword } from '../../utils/PasswordHelp'

const Signin = () => {
    const[isShowPassword,setIsShowPassword] = useState(0);
    
    const toggleShowPassword = () => {
       setIsShowPassword(!isShowPassword);
    };

    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[error, setError] = useState(null);


    const handleLogin = async(e) => {
        e.preventDefault();

        if(!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }

        if(!password) {
            setError("Please enter the password");
            return;
        }

        if(!validatePassword(password)) {
          setError("Please enter a valid password");
          return;
      }

        setError(null);

    }

  return (
    <>
      <NavBar/>
      <div class="flex justify-center items-center mt-28">
        <div class =" flex items-center justify-center w-96 border rounded bg-white px-3 py-10 ">
            <form onSubmit={handleLogin}>
                <h1 class=" text-2xl mb-10 text-center font-semibold">Login</h1>
                
                <input type="text" placeholder="Email" class=" h-12 w-full border-[1.5px] bg-transparent rounded py-3 px-5 outline-none"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                ></input>

                <div class="flex items-center bg-transparent border-[1.5px] px-5 rounded mb-2 mt-4 h-12">
                <input 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                type={isShowPassword ? "text" : "password"} 
                placeholder="Password"
                class='w-full text-sm bg-transparent py-3 mr-3 rounded outline-none'
                >
                </input>
                {isShowPassword ? (<FaRegEye
                size ={22} 
                className="text-primary cursor-pointer" 
                onClick = {()=>{ toggleShowPassword()}} 
                />) : (<FaRegEyeSlash
                    size ={22} 
                    className="text-primary cursor-pointer" 
                    onClick = {()=>{ toggleShowPassword()}} 
                     />)}
                </div>
                
                {error && <p class="pl-1 text-red-500 text-xs pb-1">{error}</p>}

                <button type = "submit" class=" w-full text-sm text-white p-2 my-1 hover:bg-blue-600 bg-primary rounded mt-4">Login</button>
                <p class="text-sm text-center mt-4">
                    Not Registered Yet? {" "} <Link to="/signup" class="font-medium text-primary underline mt-5">Create an Account</Link>
                </p>
            </form>
        </div>
      </div>
    </>
  )
}

export default Signin
