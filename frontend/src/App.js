import {useState} from "react";
import './App.css';
import Axios from 'axios';

function App() {

  // Hook (something like a set of variable and function to change the variable)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  const [wishlist, setWishlist] = useState([]);

  const [child_id, setChild_id] = useState("")

  // Hook for section
  const [showLoginSection, setShowLoginSection] = useState(true);
  const [showWishlistSection, setShowWishlistSection] = useState(false);

  // login 
  const login = () => {
    Axios.post('http://localhost:3001/login',{
      username: username, 
      password: password,
    }).then((response)=>{
      if (response.data.message){
        setLoginStatus(response.data.message)
      } else {
        setShowLoginSection(false);
        setShowWishlistSection(true);
        setLoginStatus(response.data[0].child_name);
        setChild_id(response.data[0].id)
      };
    })
  }

  // read
  const showWishlist = (id) => {
    Axios.post('http://localhost:3001/read',{
      child_id: child_id,
    }).then((response) => {
      setWishlist(response.data)
    })
  }


  // HTML start after return
  return (
    <div className="App">
      {
        showLoginSection?
        <div className="App">
          <h1>FinMon</h1>
          <input type="text" placeholder="username" onChange={(e)=>{setUsername(e.target.value)}}></input>
          <input type="password" placeholder="password" onChange={(e)=>{setPassword(e.target.value)}}></input>
          <button onClick={login}>login</button>
          <p>{loginStatus}</p>
        </div>
        :
        null
      };
      {
        showWishlistSection?
        <div className="App">
          <h1>Hello {loginStatus}</h1>
          <h3>Your Wishlist</h3>
          <button onClick={showWishlist}>Display Wishlist</button>
          <p>
            {wishlist.map((value,key) => {
              return (
                <table>
                  <tr>
                    <td>{value.type}</td>
                    <td>{value.category}</td>
                    <td>{value.price}</td>
                    <td>{value.goal}</td>
                  </tr>
                </table>  
                )
              })}
          </p>

        </div>
        :
        null
      }

    </div>
  );
}

export default App;
