import React, { Component } from 'react';

export default class SignIn extends Component
{
    constructor(props) {
        super(props);
        this.state=
            {
                login:false,
                message:""
            }
    }

    loginOrRegister=()=>
    {
        if(this.state.login)
        {
            this.setState({login:false, message:''})
        }
        else
            {
                this.setState({login:true, message:''})
            }
    };

    createNewUser= (e) =>
    {
        e.preventDefault();
        console.log("Here to make a new user");
        fetch("/users/",
            {
                method:"POST",
                headers:
                    {
                        "Accept":"application/json",
                        "Content-type":"application/json",
                    },
                body: JSON.stringify(
                    {
                        username: e.target.username.value,
                        password: e.target.password.value,
                    }),
            })
            .then(data => data.text())
            .then(data => this.setState({message:data}));

    };

    loginExistingUser=(e)=>
    {
        e.preventDefault();
        console.log("here to log in");
        fetch("/users/login",
            {
                method:"POST",
                headers:
                    {
                        "Accept":"application/json",
                        "Content-type":"application/json",
                    },
                body: JSON.stringify(
                    {
                        username : e.target.username.value,
                        password: e.target.password.value,
                    }),
            })
            .then(data => data.text())
            .then( data=> this.setState({message:data}));
        this.props.loginCookie(e.target.username.value)
    };


    render() {
        if(this.state.login) {
            return (
                <div>
                    <h3>Make An Account</h3>
                    <form onSubmit={this.createNewUser}>
                        <p>
                            <label htmlFor={"username"}>Username:</label>
                            <input id={"username"} name={"username"} type="text"/>
                        </p>
                        <p>
                            <label htmlFor={"password"}>Password:</label>
                            <input id={"password"} name={"password"} type="text"/>
                        </p>
                        <button>Submit</button>
                    </form>
                    <p><button onClick={this.loginOrRegister}>Already have an account? Login here</button></p>
                    <p>{this.state.message}</p>
                </div>
            );
        }
        else
            {
                return (
                    <div>
                        <h3>LogIn</h3>
                        <form onSubmit={this.loginExistingUser}>
                            <p>
                                <label htmlFor={"username"}>Username:</label>
                                <input id={"username"} name={"username"} type="text"/>
                            </p>
                            <p>
                                <label htmlFor={"password"}>Password:</label>
                                <input id={"password"} name={"password"} type="text"/>
                            </p>
                            <button>Submit</button>
                        </form>
                        <p>
                        <button onClick={this.loginOrRegister}>Need To make a new Account?</button>
                        </p>
                        <p>{this.state.message}</p>
                    </div>
                )
            }
    }
}