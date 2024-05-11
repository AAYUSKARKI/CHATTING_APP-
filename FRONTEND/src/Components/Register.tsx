import {useState} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link,useNavigate } from 'react-router-dom'
const Register = () => {

const navigate = useNavigate()

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    })

    const [avatar, setAvatar] = useState("")
const [loading, setLoading] = useState(false)
    const handleChange = (e: any) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleAvatar = (e:any) => {
        setAvatar(e.target.files[0])
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("username", user.name)
        formData.append("email", user.email)
        formData.append("password", user.password)
        formData.append("avatar", avatar)
        try {
            setLoading(true)
         const res = await axios.post("http://localhost:7000/api/v1/users/register", formData)
         toast.success(res.data.message)
         navigate("/login")
         setLoading(false)
        } catch (error: any) {
            setLoading(false)
            toast.error(error.message)    
        }
    }
  return (
    <>
    <div className="h-screen flex flex-col items-center justify-center bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60 border border-gray-100">
        <h1 className='text-3xl text-blue-500 py-2 px-4'>Welcome To Chat App</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
            <label htmlFor="name">Full Name</label>
            <input className="rounded-md p-1 " type="text" name="name" value={user.name} onChange={handleChange} placeholder="Enter your name" />
            <label htmlFor="email">Email</label>
            <input className="rounded-md p-1 " type="email" name="email" value={user.email} onChange={handleChange} placeholder="Enter your email" />
            <label htmlFor="password">Password</label>
            <input className="rounded-md p-1 " type='password' name="password" value={user.password} onChange={handleChange} placeholder="Enter your password" />
            <label htmlFor="avatar">Avatar</label>
            <input className="rounded-md p-1 " type="file" name="avatar" onChange={handleAvatar} />
            <button disabled={loading} type="submit">Register</button>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </form>
    </div>
    </>
  )
}

export default Register