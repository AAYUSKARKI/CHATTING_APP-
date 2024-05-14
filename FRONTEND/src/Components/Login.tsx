import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { setuser } from '../Redux/Userslice'
import { Link, useNavigate } from 'react-router-dom'
const Login = () => {

    const dispatch = useDispatch()
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    })

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const handleChange = (e: any) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {

            setLoading(true)
            const res = await axios.post("https://chat-backend-for-deploy.onrender.com/api/v1/users/login", user)
            console.log('data is', res.data.data)
            dispatch(setuser(res.data.data))
            console.log(res.data.data.accesstoken, 'accesstoken')
            Cookies.set("accesstoken", res.data.data.accesstoken)
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.data.accesstoken}`
            toast.success(res.data.message)
            navigate("/chat")
            setLoading(false)
        }
        catch (error: any) {
            setLoading(false)
            toast.error(error.message)
        }
    }

    return (
        <>

            <div className="h-screen flex flex-col items-center justify-center bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60 border border-gray-100">

                <h1 className='text-3xl text-green-500 py-2 px-4 font-serif font-bold'>Welcome To Chat App</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 bg-black">

                    <label htmlFor="name">UserName</label>
                    <input
                        className="rounded-md p-1 bg-gray-400 "
                        type="text" name="username"
                        value={user.username}
                        onChange={handleChange}
                        placeholder="Enter your username" />

                    <label htmlFor="email">Email</label>
                    <input className="rounded-md p-1 bg-gray-400"
                        type="email" name="email"
                        value={user.email}
                        onChange={handleChange}
                        placeholder="Enter your email" />

                    <label htmlFor="password">Password</label>
                    <input className="rounded-md p-1 bg-gray-400"
                        type='password'
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        placeholder="Enter your password" />

                    {
                        loading?
                        <span className="loading loading-spinner loading-lg flex items-center justify-center"></span>:
                    <button disabled={loading} type="submit" className='btn btn-info'>Login</button>
                    }
                    <p>Don`t have an account? <Link to="/">Register</Link></p>
                </form>
            </div>

        </>
    )
}

export default Login