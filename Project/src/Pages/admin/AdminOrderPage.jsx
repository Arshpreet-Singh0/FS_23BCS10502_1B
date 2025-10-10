import React, { useEffect, useState } from 'react'
import axios from 'axios';
const ORDER_API_END_POINT = import.meta.env.VITE_ORDER_API_END_POINT;
import OrderCard from '../../components/OrderCard';
import Loader from '../../components/Loder';
import { message } from 'antd';

const AdminOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const getOrders = async()=>{
      setLoading(true);
      try {
        const res = await axios.get(`${ORDER_API_END_POINT}/admin/get`,{
          withCredentials : true,
        });
        if(res?.data?.success){
          setOrders(res?.data?.orders);
        }

      } catch (error) {
        // console.log(error);
        message.error("Internal server error");
      }finally{
        setLoading(false);
      }
    };
    getOrders();
  },[])
  
  if(loading){
    return <Loader />
  }
  return (
    <div className='flex flex-col gap-5 mt-10 mb-10'>
      {
        orders.length > 0 ? (
          orders?.map((order,idx)=>(
            <>
            <OrderCard order={order} key={order?._id} admin={true}/>
            </>
          ))) : (
            (
              <div className="mx-auto">
              <p className="text-lg font-bold text-center mt-10">No Orders yet</p>
              <img src="https://img.freepik.com/free-vector/detective-following-footprints-concept-illustration_114360-21835.jpg?t=st=1732629634~exp=1732633234~hmac=4b9fb2e8a2d3398fe1526c2732eb59e361c550e326146e3b6e3258db818c9d43&w=1380" className="h-[70vh] mx-auto" alt="" />
              </div>
          )
        )
      }
    </div>
  )
}

export default AdminOrderPage;