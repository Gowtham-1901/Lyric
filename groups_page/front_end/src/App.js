import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/js/dist/modal.js';

function App() {
  const [data,setData] = useState([]);
  const titles = ["Name","Role","","",""];
  // const [searchTerm,setSearchTerm] = useState('');
  const [UpdatedRole,setUpdatedRole] = useState('');
  const [IsDeleted,setIsDeleted] = useState(0);
  const [isFilter,setIsFiltered] = useState([]);
  const [filteredData,setFilteredData] = useState([]);
  const [searchInput,setSearchInput] = useState('');


  const getdata = async() => {
    await axios.get("http://localhost:3008/getuserdata")
    .then(response => {
      setData(response.data);
      setIsFiltered(response.data);
      setFilteredData(response.data);
    })
    .catch(error => {
      console.log(error)
    })
};

  useEffect( () => {
    
    getdata();
    
  },[IsDeleted])
  
  // const Array = data.map((item)=>{return item.name})
  // console.log(Array);
  

  const handleRole = async(event) => {
    try{
      let role =event.target.value
      // const response = await axios.put(`http://localhost:3008/updateuserdata`)
      // // setMeggage(response.data.message)
      setUpdatedRole(role)  	
      // console.log(response)
    }catch(error) {
      console.error(error);
    }
  }

  const handleSearchChange = (e) => {
    console.log(e.target.value);
    if(e.target.value === ""){
      setSearchInput("")
      setIsFiltered(data);
    }
    else{
      setSearchInput(e.target.value);
    }
  }

  const handleSearchSubmit = (List) => {

    console.log(`Searching for: ${searchInput}`);
      let filtered = List.filter((user) => 
        user.name.toLowerCase().includes(searchInput.toLowerCase()) || 
        user.role.toLowerCase().includes(searchInput.toLowerCase())
      );
      console.log(filtered)
      setIsFiltered(filtered);
    }




  const handleChange = async(res) => {
    try{
      
      const response = await axios.put(`http://localhost:3008/updateuserdata/${res}`, {role :UpdatedRole, id: res} )
      console.log(response)
      // setUpdatedRole(response.data.role)
      // console.log(response)
    }catch(error) {
      console.error(error);
    }
  }




  const handleDelete= async(res) => {
    const data = {"id" :res}
    try{
      await axios.delete(`http://localhost:3008/deleteuserdata`, {data})
      console.log("Data deleted")

    }catch(error){
      console.log(error);
    }
    setIsDeleted(!IsDeleted);
  }


  const filterByBoth = (List) => {
    let filtered = List;
    console.log(filtered);
    setIsFiltered(filtered)
  }

  const filterByTra = (List) => {
    let filtered =List.filter((user)=>user.role.includes("Translator"))
    console.log(filtered);
    setIsFiltered(filtered)
  }

  const filterByRev = (List) => {
    let filtered =List.filter((user)=>user.role.includes("Reviewer"))
    console.log(filtered);
    setIsFiltered(filtered)
  }







  return (
    <div className="App">

      <div className='topbar'>
      <img src="/image.png" className='logo'/>
      <input  className="search" type="text" placeholder="Search.."></input>
      <button className='lens'> 🔍 </button>
      <div className='profile'>
          <button className='notification'><span class="material-symbols-outlined">notifications</span></button>
          <button className='account'><span class="material-symbols-outlined">account_circle</span></button>
      </div>
      </div>

      <div className='navibar'>
        <button className='home'> <span class="material-symbols-outlined">home</span>HOME</button><br></br>
        <button className='home'> <span class="material-symbols-outlined">add_task</span> ASSIGN TASK</button><br></br>
        <button className='home'> <span class="material-symbols-outlined">group</span>GROUPS</button><br></br>
        <button className='home'> <span class="material-symbols-outlined">help</span>HELP</button><br></br>
        <button className='home'> <span class="material-symbols-outlined">logout</span>LOGOUT</button>
      </div>


      <div className='blue'>
        <div className='backarrow' >
          <button><span class="material-symbols-outlined">arrow_back</span></button>
          <p className='group'>Groups</p>
       </div>
       <div className='searchelement'>
          <form onSubmit={handleSearchSubmit}>
            <input className='web'
            type='text'
            placeholder='filter with name or role' 
            value={searchInput}
            onChange={handleSearchChange} />
          </form>
          <button className='buttonsearch' onClick={()=>{handleSearchSubmit(isFilter)}} type='sumbit'><span className="material-symbols-outlined">manage_search</span></button>
       </div>
       
    <div className='radio_button'>
       <input type="radio" name="usertype" value="BOTH" onClick={()=>{ filterByBoth(data)}}/>Both
       <input type="radio" name="usertype" value="translator" onClick={()=>{filterByTra(data)}} />Translator
       <input type="radio" name="usertype" value="Reviewer" onClick={()=>{ filterByRev(data)}} />Reviewer
    </div>

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

        {/* <tbody>
            {data.map((indidata,index)=>(
                <tr key={index}> 
                    {Object.keys(indidata).map((key)=> (    
                    <td key={key}>
                        {indidata[key]}
                    </td>   
                    ))}
                    <select>
                      <option value='translator'>Translator</option>
                      <option value='reviewer'>Reviewer</option>
                    </select>
                </tr>
            ))
            }

        </tbody> */}

        <tbody>
          {isFilter.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>
                <select defaultValue={item.role}  name='role' id='role'  onChange={handleRole} >
                  <option value="Translator" >Translator</option>
                  <option value="Reviewer" >Reviewer</option>
                </select>
                </td>
              
                  <td>
                  <button type="button" className='assign' onClick={()=>{handleChange(item.id)}} >Assign</button>
                </td>
                <td>
                <button type="button" className='update' onClick={()=>{handleChange(item.id)}}>Update</button>
                </td>
                <td>
                <button type="button" className='delete' onClick ={() => {handleDelete(item.id)}} >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>

        </table>
    </div>
    </div>
  );
}

export default App;
