import React, { useState,useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/js/dist/modal.js';

const Dashboard =()=>{  
    const [data, setData] = useState([]);
    const [titles,setTitles] = useState([]);
    const [isDeleted, setisDeleted] = useState(0);
    const [changedData,setChangedData] = useState({
        id :"",
        name: "",
        email:"",
        phone:'',
        language:'',
        role:'',
      })

    const navigate = useNavigate();
      
    useEffect(()=>{
        const getdata =async()=>{
            await axios.get("http://localhost:3008/getuserdata")
                .then(response =>{
                    setData(response.data);
                    setTitles(Object.keys(response.data[0]));
                })
                .catch(error=>{
                    console.log(error)
                })
          };
          getdata();
      },[isDeleted])

      const handleDelete = async(id)=>{
        const data = {"id": id}
        try{
            await axios.delete(`http://localhost:3008/deletedata`,{data});
            console.log("data deleted");
            
            }
            catch(error){
                console.log(error);
            }
        console.log(id)
    }

    const handleEdit =(e)=>{
        setChangedData({
            id:e.id,
            name: e.name,
            email: e.email,
            phone: e.phone,
            language: e.language,
            role: e.role
        })
    }


    const handleChanges = (e)=>{
        const {name, value} = e.target
        setChangedData(changedData=>({
            ...changedData,
            [name]: value
            
        }))
      }
    
    const handleSubmit= async()=>{
        console.log(changedData)
            //  const changedData= {"id": id}
            try{
                await axios.put(`http://localhost:3008/editdata`,changedData);
                console.log("data edited");
                }
                catch(error){
                    console.log(error);
                }  
                setisDeleted(!isDeleted); 
               
            
            }

    const handleDetails = (id) =>{
        console.log(id);
        navigate('/userdetails',{state: {"id": id}});
    }

               
    return (  
       <div  className='full'>
        <h1>User Details</h1>
    
        
          <div className='table' id='table'>
          <table class="table table-striped table-hover">

                <thead>
                <tr>
                    {
                    titles.map((key)=>(
                        <th key={key}>{key}</th>
                    ))   
                    }
                        </tr> 
                </thead>

            <tbody>
                    {data.map((indidata,index)=>(
                        <tr key={index}> 
                            {Object.keys(indidata).map((key)=> (    
                            <td key={key}>
                                {indidata[key]}
                            </td>   
                            ))}
                             <button type="button" onClick={()=>handleDetails(indidata.id)} id={"detailbutton"}>Details</button>
                            <button type="button"onClick={()=>{handleEdit(indidata)}} className='btn btn-primary' id='editbutton'  data-bs-toggle="modal" data-bs-target="#exampleModal" >Update</button>
                            <button type="button"onClick={()=>{handleDelete(indidata.id)}} class="btn btn-primary" id='deletebutton'>Delete</button>
                        </tr>
                    ))
                    }
                
                </tbody>
            </table> 


            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Edit User</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Name: <input type="text" name='name' id='name' value={changedData.name} onChange={handleChanges}/><br></br>
                    Email: <input type="email" name='email' id='email' defaultValue={changedData.email} onChange={handleChanges}/><br></br>
                    Phone: <input type="tel" name='phone' id='phone' defaultValue={changedData.phone} onChange={handleChanges}/><br></br>
                    Language: <input type="text" name='language' id='language' defaultValue={changedData.language} onChange={handleChanges}/><br></br>
                    Role: <input type="text" name='role' id='role' defaultValue={changedData.role} onChange={handleChanges}/>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary "  data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onClick={handleSubmit} data-bs-dismiss="modal">Save changes</button>
                </div>
                </div>
            </div>  
            </div>          
      </div> 

</div>
    );
};





export default Dashboard;