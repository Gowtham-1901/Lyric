import React, { useEffect } from 'react'
import { useState } from 'react';
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import '../index.css';


function UserDetails() {

    const [data,setData] = useState({
        id :"",
        name: "",
        email:"",
        phone:'',
        language:'',
        role:'',
    });
    const location = useLocation();
    const id = location.state.id;    

    useEffect(()=>{
        const getdata =async()=>{
            await axios.get(`http://localhost:3008/userdetails/${id}`)
            .then(response =>{
                const data = response.data;
                setData({
                    id: data[0].id,
                    name: data[0].name,
                    email: data[0].email,
                    phone: data[0].phone,
                    language: data[0].language,
                    role: data[0].role
                });
            })
            .catch(err =>{
                console.log(err)
            })
        };
        getdata();
      })

    return (
       
        <div className='Detailsviewpage' >
        <div className='detailheading'>
            <h1>DETAILS OF {data.name}</h1>
        </div>
        
        <br></br>
     
       <p className='datas'><b>ID:</b>  {data.id}</p>
        <br></br>
        <p className='datas'><b>NAME:</b> {data.name}</p>
        <br></br>
        <p className='datas'><b>EMAIL:</b>{data.email}</p>
        <br></br>
        <p className='datas'><b>PHONE: </b> {data.phone}</p>
        <br></br>
        <p className='datas'><b>LANGUAGE:</b>{data.language}</p>
        </div>
  
         
)}

export default UserDetails