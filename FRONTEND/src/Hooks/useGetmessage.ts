import axios from 'axios'
import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { setmessage } from '../Redux/Message'


const useGetmessage =()=>{

    const {user} = useSelector((state: any) => state.user)
    const {selecteduser} = useSelector((state: any) => state.selecteduser)
    const {message} = useSelector((state: any) => state.message)

    console.log('message from hook',message)


 
    const dispatch = useDispatch()

    
 
    const getmessage = async () => {
        try {
            const res = await axios.post("http://localhost:7000/api/v1/chats/getmessages", {
                senderid: user.user._id,
                receiverid: selecteduser._id
            })
            console.log('get message executed',res.data)
            console.log(res.data.data)
            dispatch(setmessage(res.data.data))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getmessage()
    },[dispatch])
}

export default useGetmessage