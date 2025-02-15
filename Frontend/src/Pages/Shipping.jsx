import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import Metadata from '../Components/Metadata'
import CheckOut from '../Components/CheckOut'
import { AiOutlineHome, AiOutlinePhone } from 'react-icons/ai'
import { Country, State } from 'country-state-city'
import { BiSolidCity, BiWorld } from 'react-icons/bi'
import {TbMapPinCode} from 'react-icons/tb'
import { SlLocationPin } from 'react-icons/sl'
import { toast } from 'react-toastify';
import { saveShipInfo } from '../Actions/cartActions'


const Shipping = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {isLogin} = useSelector(state=> state.user);
    const {cartItems , shippingInfo} = useSelector(state=> state.cart)

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city)
    const [state, setState] = useState(shippingInfo.state)
    const [country, setCountry] = useState(shippingInfo.country)
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode)
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)

    useEffect(() => {
        if (isLogin === false) {
            navigate("/auth")
        }
    }, [])

    const shippingSubmitHandler = (e) =>{
       e.preventDefault()

       if(phoneNo.length < 0 || phoneNo.length > 10){
         toast.info('Please Enter 10 Digit Phone Number')
         return
       }
       dispatch(saveShipInfo({ address, city, state, country, pinCode, phoneNo }))
        navigate("/order/confirm")
    }
  return (
    <>
    <Metadata title='Shopping Details'/>
     <div className='min-h-screen pt-14 pb-14'>
     <div>
     <div className="pt-3"><CheckOut activeStep={0} /></div>




     <form encType='multiport/form-data' action="" onSubmit={shippingSubmitHandler}>
     <div className='w-full flex flex-col md:px-0 px-5 justify-center items-center pt-8'>
        <div className='md:w-1/3 w-full bg-white rounded-md shadow-md shadow-gray-400'>
            <p className='text-2xl text-center font-medium py-4'>Shipping Details</p>





            <div className='flex flex-col pb-10 py-3 gap-5 px-8'>



                <div className=' relative px-3 rounded border border-gray-500 py-1 flex justify-around items-center'>
                <AiOutlineHome className='text-gray-500' size={26} />
                <input type="text" onChange={(e) => setAddress(e.target.value)} placeholder='Enter Address' required value={address} className=' w-full pl-4 outline-none py-1 pr-4'/>
                </div>
                



                <div className='relative flex rounded border border-gray-500 items-center justify-around py-1 px-3'>
                <BiSolidCity className='text-gray-500' size={26} />
                <input type="text"  onChange={(e) => setCity(e.target.value)} placeholder='Enter City' required value={city} className=' w-full pl-4 outline-none py-1 pr-4'/>
                </div>
                

               
                <div className='relative flex justify-around px-3 py-1 items-center border border-gray-500'>
                <TbMapPinCode className='text-gray-500' size={26} />
                <input type="text"  onChange={(e) => setPinCode(e.target.value)} placeholder='Enter Pincode' required value={pinCode} className=' w-full pl-4 outline-none py-1 pr-4'/>
                </div>
                



                <div className='flex justify-around items-center py-1 px-3 border border-gray-500 '>
                <AiOutlinePhone className='text-gray-500' size={26} />
                <input type="text"  onChange={(e) => setPhoneNo(e.target.value)} placeholder='Enter Phone Number' required value={phoneNo} className=' w-full pl-4 outline-none py-1 pr-4'/>
                </div>




                <div className='flex justify-around items-center px-3 py-1 border border-gray-500'>
                <BiWorld className='text-gray-500' size={26} />
                <select name="" id="" onChange={(e) => setCountry(e.target.value)} className='w-full  bg-white pl-4 outline-none py-1 pr-4'>
                    <option value="">Country</option>
                    {
                         Country &&
                         Country.getAllCountries().map((item) => (
                             <option className='bg-white ' key={item.isoCode} value={item.isoCode}>
                                 {item.name}
                             </option>

                         ))
                    }
                </select>
                </div>







                {
                    country && (<div className='relative px-3 rounded border border-gray-500 py-1 flex justify-around items-center'>
                        <SlLocationPin className='text-gray-500' size={26} />
                        <select name="" value={state} className='w-full bg-white pl-4 outline-none py-1 pr-4' onChange={(e) => setState(e.target.value)}  id="">
                            <option value="">State</option>
                            {State &&
                            State.getStatesOfCountry(country).map((item) => (
                             <option key={item.isoCode} value={item.isoCode}>
                            {item.name}
                            </option>
                                                ))}
                        </select>
                    </div>)}
                



                      

                      <div>
                      <input className='w-full cursor-pointer bg-blue-600 py-2 text-white font-medium rounded hover:bg-blue-500 ' disabled={state ? false : true} type="submit" value="Continue" />
                      </div>

            </div>
        </div>
     </div>




     </form>
     </div>



     </div>
    </> 
  )
}

export default Shipping