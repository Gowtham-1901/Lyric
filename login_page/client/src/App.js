import React, {useState} from "react";
import axios from 'axios';
import './App.css';
import { useNavigate } from "react-router-dom";
import logo from "./assets/1st.svg"
import img from "./assets/2nd.png"


function App() {

  const navigate = useNavigate();

  const [checkCredentials, setcheckCredentials]= useState({
    username:"",
    password:""
  })
  const [invalidCredentials,setInvalidCredentials] = useState(false)

//  const [username, setUsername]= useState("")
//   const [password,setPassword] = useState("");
// const [isLoggedIn,setLoggedIn] = useState(false);
// const [LoggedIn,setLoggedIn] = useState('false');

  // const handleChange = async (e) => {
  //   const{name , value} = e.target;
  //   if(name === 'username'){
  //     setUsername(value);
  //   }else if (name === 'password'){
  //     setPassword(value);
  //   }
  //   console.log(username,password);
// }

  const handleUsername = (e) => {
    setcheckCredentials((prev)=>({
         ...prev, username : e.target.value
    }))}

  const handlePassword = (e) => {
    setcheckCredentials((prev)=>({
      ...prev, password : e.target.value
 }))
  }



  const handleLogin = async(e) => {
    e.preventDefault()

    console.log(checkCredentials)
    // setUsername(document.getElementsByName('username').value);
    // setPassword(document.getElementsByName('password').value);

    // if(checkCredentials.username === 'validUsername' && checkCredentials.password === 'validpassword'){
    //     console.log('Login successful');
        
    // }else{
      
    // }


    // setLoggedIn(true);

    axios.post(`http://localhost:3001/addData`, { username: checkCredentials.username, password: checkCredentials.password})
    .then(res => {
      console.log(res);
      navigate('/admin_page')
      setInvalidCredentials(false);
    }).catch(err => {
      setInvalidCredentials(true);
      console.log(err)
    })
  };



  return(
    
    <div class="container">
      <img class="logo" src={logo}></img>
        <div class="image">
            <img class="img" src={img}/> 
       </div>
        <div class="login-content">
            <div class="wrapper">
                <div class="title"><span>WELCOME BACK</span></div>
                <form action="#">
                    <div class="row">
                        <i class="fas fa-user"></i>
                        <input type="text" name="username" id="username" placeholder="USERNAME" onChange={handleUsername} required/>
                      </div>
                      <div class="row">
                        <i class="fas fa-lock"></i>
                        <input type="password" name="password" id="username" placeholder="PASSWORD" onChange={handlePassword} required/>
                      </div>
                      <div class="pass"><a href="#">Forgot password?</a></div>
                      <div>
                        {invalidCredentials ? <p style={{color: 'red'}}>Invalid username or password, please try again!</p> : null }
                        <button class="button" onClick={handleLogin}><span>LOGIN</span></button>
                      </div>
                </form>
            </div>
        </div>
    </div>
)

}
export default App;


































  // const handleLogout = () => {
  //   setLoggedIn(false);
  //   setUsername('');
  //   setPassword('');
  // }

  // if(LoggedIn) {
  //   return(
  //     <div className="App">
  //       <h1>Welcome, {username}!</h1>
  //       <button onClick={handleLogout}>Logout</button>
  //     </div>
  //   );
  // }