import React, { Component } from 'react';
import {BrowserRouter as Router , Link , Route} from "react-router-dom";
import './App.css';
import HomePage from "./components/HomePage";
import SignIn from "./components/SignIn";
import LogOut from "./components/LogOut";

class App extends Component {
  constructor(props) {
    super(props);
    this.state=
        {
          user:
              {
                online:false,
                IdName:null,
              }
        }
  }

  componentDidMount() {
    this.checkforuser()
  }

  grabBookList=()=>
  {
    console.log("getting Book list");
    fetch("/book/")
        .then(data=> data.json())
        .then(response => this.setState({booklist:response}))
  };

  checkforuser = ()=>
  {
    console.log("checking if someone is logged in");
    fetch("/users/")
        .then(data=> data.text())
        .then(response =>
        {
          if(response)
          {
            this.setState({user:{IdName:response,online:true}})
          }
          else
            {
              this.setState({user:{IdName:null,online:false}})
            }
        })
  };

  loginCookie =(username)=>
  {
    console.log("made it in");
    console.log(username);
    this.setState({user:{online:true, IdName:username}})
  };

  render() {
    return (
      <div className="App">
        <h1>Welcome To The House</h1>
        <Router>
          <Link to={"/"} onClick={this.grabBookList}>Home</Link>
          <Link to={"/Login"}>Login</Link>
          <Link to={"/Logout"}>Log Out</Link>
          <Route exact path={"/"} component={()=><HomePage user={this.state.user} />}/>
          <Route path={"/login"} component ={()=><SignIn loginCookie={this.loginCookie}/>}/>
          <Route path={"/logout"} component={LogOut}/>
        </Router>
      </div>
    );
  }
}

export default App;
