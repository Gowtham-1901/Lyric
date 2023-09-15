import React,{useState} from 'react';
import PasswordChecklist from "react-password-checklist";
import axios from 'axios';

function Adduser() {
    const [data,setData] = useState({
        Username: "",
        Email:"",
        Phone:'',
        Password:'',
        Reenter:'',
        Language:'',
        Role:'',
      })
      
      const handleSubmit=(e)=>{
        e.preventDefault();
        alert("Account Created")
        console.log(data);
        console.log(data);
        axios({
          method: 'POST',
          url: 'http://localhost:3008/userdata',
          data: data
        });
      };
    
      const handleChange = (e)=>{
        const {name, value} = e.target
        setData(data =>({
          ...data,
          [name]: value
        }))
      }
     
     

  return (
    <div >
        <h1>Create New user</h1>
    
    
    <form >
      <div className='wholecontent'>
       <div className="Name">
         <label htmlFor='name'>Name:</label>
         <input type='text'
         id='name'
         value={data.Username}
         name='Username'
         onChange={handleChange}
         required/>
       </div>
   <br/>
       
       
       <div className ="Email">
         <label htmlFor='name'>Email:</label>
         <input type='email'
         id='email'
         value={data.Email}
         name='Email'
         onChange={handleChange}
         required/>
       </div>
 <br/>
       
     <div className='firstrow'>
   
     <div className ="Phone">
       <label htmlFor='Phone'>Phone:</label>
         <input type='tel'
         id='Phone'
         value={data.Phone}
         name='Phone'
         onChange={handleChange}
         pattern='[789][0-9]{9}'
         required/>
   </div>
       
 <br/>
 
 
 
          <div className='Password'> 
          <label htmlFor='Password'>Password:</label> 
          <input type = "password" value = {data.Password} name= "Password"onChange = {handleChange} />
          
          </div>
         <div className='Reenterpassword'>
         <label htmlFor='Password'>Re Enter:</label> 
 
          <input
             type = "password"
             name='Reenter'
             value = {data.Reenter}
             onChange = {handleChange}
          />
          <PasswordChecklist
             rules = {[
                "capital",
                "match",
                "specialChar",
                "minLength",
                "lowercase",
                "number",
             ]}
             minLength = {10}
             value = {data.Password}
             valueAgain = {data.Reenter}
            
          />
          </div>
          
           
       </div>
 <br/>
   
   
   <div className="Language">
    
   <label htmlFor='Language'>Language:</label>
             <select value={data.Language} name='Language' onChange={handleChange} required>
                 <option value="">Chose an Language</option>
                 <option value="English">English</option>
                 <option value="Tamil">Tamil</option>
              </select>
              
              <br/>
     </div>
     <br/>
 
     <div className="Role">
     <label htmlFor='Role'>Role:</label>
             <select value={data.Role} onChange={handleChange} name="Role"required>
             <option value="">Chose an Role</option>
                 <option value="Translator">Translator</option>
                 <option value="Reviewer">Reviewer</option>
              </select>
              
              <br/>
     </div>
     </div>
     <br/>
       
       
       <div className='Submit'>
           <button type="submit" className='btn btn-primary' onClick={handleSubmit} >Create Account</button>
       </div>
     </form>
    </div>
  )
}

export default Adduser