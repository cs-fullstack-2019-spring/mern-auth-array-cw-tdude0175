import React, { Component } from 'react';

export default class HomePage extends Component
{
    constructor(props) {
        super(props);
        this.state=
            {
                online:false,
                booklist:[],
            }
    }

    componentDidMount() {
        this.loggedin();
        if(this.state.online){
        this.grabBookList();
        }
    }

    loggedin =()=>
    {
        console.log(this.props.user.online);
        this.setState({online:this.props.user.online})
    };


    addABook=(e)=>
    {
        console.log();
        e.preventDefault();
        console.log("making books take time");
        fetch("/book/addBook",
            {
                method:"POST",
                headers:
                    {
                        "Accept":"application/json",
                        "Content-type":"application/json",
                    },
                body: JSON.stringify(
                    {
                        username: this.props.user.IdName,
                        books: e.target.book.value,
                    })
            })
            .then(data=> data.text())
    };

    // grabBookList=()=>
    // {
    //     console.log("getting Book list");
    //     fetch("/book/")
    //         .then(data=> data.json())
    //         .then(response => this.setState({booklist:response}))
    // };

    render() {
        if(this.state.online){
            console.log(this.state.booklist);
        return (
            <div>
                <h2>Home Page</h2>
                <h3>Add A New Book</h3>
                <form onSubmit={this.addABook}>
                    <p>
                        <label htmlFor={"book"}>Add A Book</label>
                        <input id={"book"} name={"book"} type="text"/>
                    </p>
                    <button>Submit</button>
                </form>
                
                <h3>Your Favorite Books</h3>
            </div>
        );
        }
        else
            {
                return (
                    <div>
                        <h2>Please Sign In To view or add books</h2>
                    </div>
                )
            }
    }
}