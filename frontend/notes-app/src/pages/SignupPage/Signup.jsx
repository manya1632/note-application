import React, { useState } from 'react'
import NavBar from '../../components/NavBar/NavBar';
import { Link } from 'react-router-dom';
import { validateEmail } from '../../utils/Helper';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { validatePassword } from '../../utils/PasswordHelp';

const Signup = () => {

  const[isShowPassword,setIsShowPassword] = useState(0);
    
    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    };

  // setting up state variables 
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState(null);

  //form submission error and conditions 
  const handleSignUp = async(e) => {
    e.preventDefault();
    
    if(!name) {
      setError("Please enter your name");
      return;
    }

    if(!validateEmail(email)) {
        setError("Please enter a valid email address");
        return;
    }

    if(!password) {
      setError("Please enter a password");
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
            <form onSubmit={handleSignUp}>
                <h1 class=" text-2xl mb-10 text-center font-semibold">SignUp</h1>


                {/* event.target.value contains the value of the name or whatever input */}
                <input type="text" placeholder="Name" class="mb-4 h-12 w-full border-[1.5px] bg-transparent rounded py-3 px-5 outline-none"
                value={name} 
                onChange={(e) => setName(e.target.value)}
                ></input>

                <input type="text" placeholder="Email" class=" h-12
                 w-full border-[1.5px] bg-transparent rounded py-3 px-5 outline-none"
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
                
                {error && <p class="ml-1 text-red-500 text-xs pb-1">{error}</p>} 

                <button type = "submit" class=" w-full text-sm text-white p-2 my-1 hover:bg-blue-600 bg-primary rounded mt-4">Create Account</button>
                <p class="text-sm text-center mt-4">
                    Already have an account? {" "} <Link to="/signin" class="font-medium text-primary underline mt-5">Login</Link>
                </p>

            </form>
        </div>
      </div>
    </>
  )
}

export default Signup