// Filename - App.js
 
import React from "react";
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UploadPage from './Upload';
import GridPage from './Grid';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputFile: null,
            kmeans: null,
            newHeight: null,
            newWidth: null
            }
    }
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/"  element={<UploadPage input= {this.state.inputFile} newWidth={this.state.newWidth} newHeight={this.state.newHeight} kmeans={this.state.kmeans}/>} />
                    <Route path="/grid" element={<GridPage />} />
                </Routes>
            </BrowserRouter>
        );
    }    
    
}
 

export default App;