import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import ThemeChanger from './ThemeChanger';
import Filter from 'bad-words'
import { useSelector } from 'react-redux';
const Register = () => {

    const navigate = useNavigate()

    const {theme} = useSelector((state: any) => state.theme)


    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    })

    const [validEmail, setValidEmail] = useState(true)
    const [validusername, setValidusername] = useState(true)
    const [validPassword, setValidPassword] = useState(true)
    const [avatar, setAvatar] = useState("")
    const [avatarPreview, setAvatarPreview] = useState("")
    const [loading, setLoading] = useState(false)

    const filter = new Filter()

    const validateEmail = (email: string) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const validateUsername = (username: string) => {
        const usernameLength = username.length
        if(usernameLength < 3){
            return false
        }else{
            return true
        }
    }

    const validatePassword = (password: string) => {
         const passwordlength = password.length
        if(passwordlength < 6){
            return false
        }else{
            return true
        }
    }

    const handleChange = (e: any) => {
        setUser({ ...user, [e.target.name]: e.target.value })

        if(e.target.name === "email"){
            setValidEmail(validateEmail(e.target.value))
        }

        if(e.target.name === "name"){
            setValidusername(validateUsername(e.target.value) && !filter.isProfane(e.target.value))
        }

        if(e.target.name === "password"){
            setValidPassword(validatePassword(e.target.value))
        }
    }

    
    const handleAvatar = (e: any) => {
        setAvatar(e.target.files[0])
        const reader = new FileReader()
        reader.onloadend = () => {
            setAvatarPreview(reader.result as string)
        }

        reader.readAsDataURL(e.target.files[0])

    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        if (!validateEmail(user.email)) {
            toast.error("Please enter a valid email")
            return
        }

        if (!validateUsername(user.name)) {
            toast.error("Please enter a valid username")
            return
        }

        if (!validatePassword(user.password)) {
            toast.error("Please enter a valid password")
            return
        }
        const formData = new FormData()
        formData.append("username", user.name)
        formData.append("email", user.email)
        formData.append("password", user.password)
        formData.append("avatar", avatar)

        try {
            setLoading(true)
            const res = await axios.post("https://chat-backend-for-deploy.onrender.com/api/v1/users/register", formData)
            toast.success(res.data.message)
            navigate("/login")
            setLoading(false)

        }
        catch (error: any) {
            setLoading(false)
            toast.error(error.message)
        }
    }
    return (
        <>
        
        <div className={` h-screen flex items-center justify-center`}>
       
            <div className={`${theme=='light'?'bg-slate-600':'bg-slate-700'} h-screen w-[500px] flex flex-col items-center justify-center bg-slate-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60`}>
            <div className='absolute top-0 right-0'><ThemeChanger/></div>
                <h1 className='text-3xl text-green-500 py-2 px-4'>Welcome To Chat App</h1>

                <form onSubmit={handleSubmit} className={`${theme=='light'?'bg-white text-black':'bg-black '} flex flex-col gap-4 p-4 bg-black rounded-md`}>

                    <label htmlFor="name">User name</label>
                    {!validusername ? <p className='text-red-500'>Please enter a valid name</p> : null}
                    <input 
                        className={`rounded-md p-1 
                        ${!validateUsername(user.name) ? 'border-2 border-red-500' : validusername ? 'border-[4px] border-green-500' : ''}
                        ${filter.isProfane(user.name) ? 'border-2 border-red-500' : ''}
                        ${theme=='light'?'text-black bg-white border-[1px] border-black':'text-white bg-black border-[1px] border-white'}`}
                        type="text" name="name"
                        value={user.name}
                        onChange={handleChange}
                        placeholder="Enter your name" />

                    <label htmlFor="email">Email</label>
                    {!validEmail ? <p className='text-red-500'>Please enter a valid email</p> : null}
                    <input 
                        className={`rounded-md p-1 
                        ${!validateEmail(user.email) ? 'border-2 border-red-500' : validEmail ? 'border-[4px] border-green-500' : ''}
                        ${theme=='light'?'text-black bg-white border-[1px] border-black':'text-white bg-black border-[1px] border-white'}`}
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        placeholder="Enter your email" />

                    <label htmlFor="password">Password</label>
                    {!validPassword ? <p className='text-red-500'>Please enter at least 6 characters</p> : null}
                    <input 
                        className={`rounded-md p-1
                        ${!validatePassword(user.password) ? 'border-2 border-red-500' : validPassword ? 'border-[1px] border-green-500' : ''}
                        ${theme=='light'?'text-black bg-white border-[1px] border-black':'text-white bg-black border-[1px] border-white'}`}
                        type='password'
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        placeholder="Enter your password" />

                        {
                            avatarPreview ? 
                            <><div className='flex items-center justify-center'>
                            <div className='avatar w-24 h-24 rounded-full overflow-hidden flex items-center justify-center'>
                                <img src={avatarPreview} alt="Avatar Preview" className='w-full h-full object-cover' />
                            </div></div></> : null
                        }
                     <h1>Upload Avatar</h1>
                    <label htmlFor="avatar" className='cursor-pointer'>
                        {
                            avatarPreview ? 
                            <MdOutlineCancel className='text-red-500 text-4xl' onClick={() =>{setAvatarPreview("") ;setAvatar("")}}/> 
                            : <IoCloudUploadOutline className='text-blue-500 text-4xl' />
                        }
                        <input 
                        className="hidden"
                        id='avatar'
                        type="file"
                        name="avatar"
                        onChange={handleAvatar} />
                    </label>
                    {
                        loading?
                        <span className="loading loading-spinner loading-lg flex items-center justify-center"></span>:
                        <button className="btn btn-info" disabled={loading} type="submit">Register</button>
                    }
                    <p>Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
                </form>
            </div>
        </div>
        </>
    )
}

export default Register