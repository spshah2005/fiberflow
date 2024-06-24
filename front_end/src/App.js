// Filename - App.js
 
import React from "react";
import './App.css'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            kmeans: "https://t4.ftcdn.net/jpg/03/16/15/47/360_F_316154790_pnHGQkERUumMbzAjkgQuRvDgzjAHkFaQ.jpg"
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e) {
        const fileurl = URL.createObjectURL(e.target.files[0]);
        this.setState({file:fileurl});

        const thisfile = e.target.files[0];
        const formData = new FormData();
        formData.append("image", thisfile)
        console.log(thisfile)
        console.log(formData.getAll("image"));
        fetch("http://127.0.0.1:5000/upload",  {
            method: 'POST', // or 'PUT'
            body: formData // data can be `string` or {object}!
        })
        .then(response => {
            console.log('Fetch response:', response);
            if (response.ok) {
                return response.blob();
            }
            else{
                throw new Error('Network response was not ok.');
            }
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            console.log(url)
            this.setState({kmeans:url});
        })
        .catch(error => {
            console.error('Error:', error)
        });
    }
    render() {
        return (
            <div className="App">
                <h2 style={{fontFamily: 'Dancing Script, cursive'}}>upload an image</h2>
                <input type="file" onChange={this.handleChange} /> <br></br>
                <img src={this.state.file} id="inputImage" alt = '' width="200px" height="200px" HSPACE="20" VSPACE="20"/>
                <img src={this.state.kmeans} id="outputImage" alt = '' width="200px" height="200px" VSPACE="20"/> 
            </div> 
        );
    }     
}
 
export default App;