import React from 'react';
import logo from './fiberflow_logo.png';
import header from './title.png'

const UploadPage= (props) => {
    function handleSubmit(event) {
        event.preventDefault();
        const form_image = document.getElementById('img_input');
        const fileurl = URL.createObjectURL(form_image.files[0]);
        props.setInput(fileurl);
        props.setWidth(Number(document.getElementById('width_input').value));
        props.setHeight(Number(document.getElementById('height_input').value));
        props.setFormSubmitted(false);
        props.setKmeans(logo);
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
            props.setKmeans(url)
            props.setFormSubmitted(true);
        })
        .catch(error => {
            console.error('Error:', error)
        });
    }
    return (
        <div className="App">
            <div class="title_container">
                <img src={header} alt='' class="title"/>
            </div>
            <div className="form_section">
                <form id="form" onSubmit={handleSubmit}>
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
                        <div id="k_means">
                            <label htmlFor="k">how many colors would you like to use? </label>
                            <input required name="k" type="number" id="k"></input>
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
            </div>

            <div className="parent">
                <div className="child1">
                    <h3>input image</h3>
                    <img src={props.input} className="inputImage" alt = ''  />
                </div>
                <div className="child2">
                    <h3>output image</h3>
                    <img src={props.kmeans} className="outputImage" alt = ''  /> 
                </div>
            </div>

            <div className="next_options">
                {props.formSubmitted && <button id="download_image">Download</button>}
            </div>
        </div> 
    );
 }

export default UploadPage;