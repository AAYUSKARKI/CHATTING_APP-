import {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { setotheruser } from '../Redux/Otheruser'
import axios from 'axios'

export const useFetchallusers = () => {

    const dispatch = useDispatch()

    const fetchallusers = async () => {
        try {
            const res = await axios.get("https://chat-backend-for-deploy.onrender.com/api/v1/users/allusers")
            console.log(res.data.data)
            dispatch(setotheruser(res.data.data))
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {     
        fetchallusers() 
    },[])
}