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
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(event) {
        event.preventDefault();
        const form_image = document.getElementById('img_input');
        const fileurl = URL.createObjectURL(form_image.files[0]);
        this.setState({file:fileurl})

        const form = event.target;
        const formData = new FormData(form);

        fetch("http://127.0.0.1:5000/upload",  {
            method: 'POST', // or 'PUT'
            body: formData// data can be `string` or {object}!
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
            <body>
            <div className="App">
                <h2 style={{fontFamily: 'Dancing Script, cursive'}}>pic to tapestry</h2>
                <form id="form" onSubmit={this.handleSubmit}>
                    <fieldset id="tapestry_info">
                        <legend>insert info on how you want to format your tapestry</legend>
                        <br></br>
                        <div id="width">
                            <label htmlFor="width_input">how many stitches wide? </label>
                            <input required name="width" type="number" id="width_input"></input>
                        </div>
                        <br></br>
                        <div id="height">
                            <label htmlFor="height_input">how many stitches high? </label>
                            <input required name="height" type="number" id="height_input"></input>
                        </div>
                        <br></br>
                        <div id="image">
                            <label htmlFor="img_input">upload your image </label>
                            <input required name="image" type="file" id="img_input"></input>
                        </div>
                        <br></br>
                        <input type="submit"></input>
                    </fieldset>
                </form>
                <br></br>
                <img src={this.state.file} id="inputImage" alt = ''  />
                <img src={this.state.kmeans} id="outputImage" alt = ''  /> 
            </div> 
            </body>
        );
    }    
    
}
 
export default App;