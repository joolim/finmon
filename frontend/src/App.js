import {useState} from "react";
import './App.css';
import Axios from 'axios';

function App() {
  //Background image
  document.body.style.background = "url('IMG1.png') center"

  // Hook (something like a set of variable and function to change the variable)

  // Hook for Login Section
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [displayBalance, setDisplayBalance] = useState("");
  
  // Hook for Create Section (a.k.a Add Wishlist)
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [item_name, setItem_Name] = useState("");
  const [price, setPrice] = useState("");
  const [createMessage, setCreateMessage] = useState(false)

  // Hook for Update Section
  const [itemUpdated, setItemUpdated] = useState("")
  const [newType, setNewType] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newItem_name, setNewItem_Name] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [updateMessage, setUpdateMessage] = useState(false) 

  // Hook for Delete Section
  const [deleteMessage, setDeleteMessage] = useState(false) 

  // Hook for multipupose
  const [wishlist, setWishlist] = useState([]);
  const [child_id, setChild_id] = useState("")

  // Hook for section
  const [showLoginSection, setShowLoginSection] = useState(true);
  const [showWishlistSection, setShowWishlistSection] = useState(false);
  const [showAddWishlistSection, setShowAddWishlistSection] = useState(false)
  const [showUpdateWishlistSection, setShowUpdateWishlistSection] = useState(false)

  // login 
  const login = () => {
    Axios.post('http://localhost:3001/child/login',{
      username: username, 
      password: password,
    }).then((response)=>{
      if (response.data.message){
        setLoginStatus(response.data.message)
      } else {
        setShowLoginSection(false);
        setShowWishlistSection(true);
        setDisplayName(response.data[0].child_name);
        setChild_id(response.data[0].id);
        setDisplayBalance((response.data[0].balance));
      };
    })
  }

  // logout
  const logout = () => {
    setShowWishlistSection(false);
    setShowLoginSection(true);

  }

  // create
  const showAddWishlist = () => {
    setShowAddWishlistSection(true);
    setShowWishlistSection(false);
    setShowUpdateWishlistSection(false);
  }

  const addWishlist = () => {
    Axios.post("http://localhost:3001/wishlist/create",{
      child_id: child_id,
      type: type,
      category: category,
      item_name: item_name,
      price: price,
      goal: Math.random() * 151, // for demo purpose, we randomize this number
    }).then(()=>{
      setCreateMessage(true);
    })
  }

  // read
  const showWishlist = () => {
    Axios.post('http://localhost:3001/wishlist/read',{
      child_id: child_id,
    }).then((response) => {
      setWishlist(response.data);
      setShowWishlistSection(true);
      setShowAddWishlistSection(false);
      setShowUpdateWishlistSection(false);
    })
  }

  // update
  const showUpdateWishlist = () => {
    setShowAddWishlistSection(false);
    setShowWishlistSection(false);
    setShowUpdateWishlistSection(true);
  }

  const updateWishlist = () => {
    Axios.put("http://localhost:3001/wishlist/update", {
      id: itemUpdated,
      type: newType,
      category: newCategory,
      item_name: newItem_name,
      price: newPrice,

    }).then(()=>{
      setUpdateMessage(true);
    })

  }

  // delete
  const deleteWishlist = (id) => {
    Axios.delete(`http://localhost:3001/wishlist/delete/${id}`)
    setShowWishlistSection(false);
    setDeleteMessage(true);

  }

  
  // HTML start after return, each div is wrapped with conditional ternary opeartor, to toggle it on and off depending on what button is clicked
  return (
    <div className="App">
      {
        showLoginSection?
        // HTML for Login Section
        <div className="App">
          <img src="IMG2.png" alt="Test" width="600" height="500"></img>
          <div>&nbsp;</div>
          <input type="text" placeholder="username" onChange={(e)=>{setUsername(e.target.value)}}></input>
          <input type="password" placeholder="password" onChange={(e)=>{setPassword(e.target.value)}}></input>
          <div>&nbsp;</div>
          <button onClick={login}>login</button>
          <div>&nbsp;</div>
          <button onClick={fakebutton}>Register</button>
          <p>{loginStatus}</p>
        </div>
        :
        null
      }
      {deleteMessage ? 
      <div>
        <p>Wishlist deleted !!</p>
        <button onClick={()=> {setDeleteMessage(false); showWishlist()}}>Ok</button>
      </div>
      : null}

      {
        
        showWishlistSection?
        // HTML for Wishlist Section
        <div className="App">
          <div>
          <button2 onClick={fakebutton2}>Transactions</button2> &nbsp; &nbsp;
          <button2 onClick={fakebutton2}>Rewards</button2> &nbsp; &nbsp;
          <button2 onClick={fakebutton2}>Game</button2>
          </div>
          <div>&nbsp;</div>
          <div className="Profile">
            <h1>Hello {displayName}</h1>
            <h3>Your Balance: S$ {(displayBalance)}</h3>

            <button onClick={showWishlist}>Display Wishlist</button>
          </div>
          <div>
            <h3>Your Wishlist</h3>
            <table>
              <tr>
                <th>Type</th>
                <th>Category</th>
                <th>Item Name</th>
                <th>Item Price</th>
                <th>Your Progress</th>
                <th>Delete</th>
              </tr>
              {wishlist.map((value,key) => {
              return (
              <tr>
                  <td>{value.type}</td>
                  <td>{value.category}</td>
                  <td>{value.item_name}</td>
                  <td>S$ {(value.price).toFixed(2)}</td>
                  <td>{((value.goal / value.price) * 100).toFixed(2)}% progress</td>
                  <td><button onClick={()=>{deleteWishlist(value.id)}}>Delete</button></td>
              </tr>  
              )
              })}
            </table>
          </div>
          <br/>
          <button onClick={showAddWishlist}>Add Wishlist</button>
          <br/>
          <button onClick={showUpdateWishlist}>Update Wishlist</button>
          <br/>
          <button onClick={logout}>Logout</button>

        </div>
        :
        null
      }
      {
        showAddWishlistSection?
        // HTML for Add Wishlist Section
        <div className="App">
          <button onClick={showWishlist}>Back</button>
          <h3>Add Wishlist</h3>
          <select type="text" name="type" onChange={(e)=>{setType(e.target.value)}}>
            <option value="">What is your wishlist type ?</option>
            <option value="need">need</option>
            <option value="want">want</option>
          </select>
          <select type="text" name="category" onChange={(e)=>{setCategory(e.target.value)}}>
            <option value="">What is your category type ?</option>
            <option value="toys">toys</option>
            <option value="foods">foods</option>
            <option value="books">books</option>
          </select>
          <input type="text" placeholder="item name" onChange={(e)=>{setItem_Name(e.target.value)}}></input>
          <input type="number" placeholder="price" onChange={(e)=>{setPrice(e.target.value)}}></input>
          <button onClick={addWishlist}>Add Wishlist</button>

          {/* Message display after successful creation */}
          {createMessage ? 
          <div>
            <p>Wishlist added !!</p>
            <button onClick={()=> {setShowAddWishlistSection(false); setCreateMessage(false); showWishlist()}}>Ok</button>
          </div>
          : null}

        </div>
        :
        null
      }
      {
        showUpdateWishlistSection?
        // HTML for Add Wishlist Section
        <div className="App">
          <button onClick={showWishlist}>Back</button>
          <h3>Update Wishlist</h3>
          <select type="text" name="type" onChange={(e)=>{setItemUpdated(e.target.value)}}>
            <option value="">Which Item to Update ?</option>
            {wishlist.map((value,key) => {
              return (
                <option value={value.id}>{value.item_name}</option>
              )
              })}
          </select>
          <select type="text" name="type" onChange={(e)=>{setNewType(e.target.value)}}>
            <option value="">Change your wishlist type to ?</option>
            <option value="need">need</option>
            <option value="want">want</option>
          </select>
          <select type="text" name="category" onChange={(e)=>{setNewCategory(e.target.value)}}>
            <option value="">Change your category to ?</option>
            <option value="toys">toys</option>
            <option value="foods">foods</option>
            <option value="books">books</option>
          </select>
          <input type="text" placeholder="new item name" onChange={(e)=>{setNewItem_Name(e.target.value)}}></input>
          <input type="number" placeholder="new item price" onChange={(e)=>{setNewPrice(e.target.value)}}></input>
          <button onClick={updateWishlist}>Update Wishlist</button>
          {/* Message display after successful creation */}
          {updateMessage ? 
          <div>
            <p>Wishlist Updated !!</p>
            <button onClick={()=> {setShowUpdateWishlistSection(false); setUpdateMessage(false); showWishlist()}}>Ok</button>
          </div>
          : null}
        </div>
        :
        null
      }

    </div>
  );
}

export default App;

// Fake buttons
const fakebutton = () =>{
}
const fakebutton2 = () =>{
}







