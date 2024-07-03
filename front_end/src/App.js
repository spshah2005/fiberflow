// Filename - App.js
 
import React,{useState, useEffect}  from "react";
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UploadPage from './Upload';
import GridPage from './Grid';


const App = () => {
    const [input, setInput] = useState(localStorage.getItem('input')||null);
    const [newWidth, setNewWidth] = useState(localStorage.getItem('newWidth') || null);
    const [newHeight, setNewHeight] = useState(localStorage.getItem('newHeight') || null);
    const [kmeans, setKmeans] = useState(localStorage.getItem('kmeans')||null); // Do not persist Blob URL in localStorage
    const [formSubmitted, setFormSubmitted] = useState(JSON.parse(localStorage.getItem('formSubmitted')) || false);

    // useEffect (()=> {
    //     console.log('storage cleared')
    //     localStorage.clear();
    //     console.log(localStorage)
    // }, []);

    useEffect(() => {
      localStorage.setItem('input', input);
    }, [input]);
  
    useEffect(() => {
      localStorage.setItem('newWidth', newWidth); 
    }, [newWidth]);
  
    useEffect(() => {
      localStorage.setItem('newHeight', newHeight);
    }, [newHeight]);
  
    useEffect(() => {
      localStorage.setItem('kmeans', kmeans);
      console.log('kmeans saved ', kmeans)
    }, [kmeans]);
  
    useEffect(() => {
      localStorage.setItem('formSubmitted', JSON.stringify(formSubmitted));
    }, [formSubmitted]);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/"  element={<UploadPage 
                    input={input} 
                    setInput={setInput} 
                    newWidth={newWidth} 
                    setWidth={setNewWidth} 
                    newHeight={newHeight} 
                    setHeight={setNewHeight} 
                    kmeans={kmeans} 
                    setKmeans={setKmeans} 
                    formSubmitted={formSubmitted} 
                    setFormSubmitted={setFormSubmitted}/> }/>

                <Route path="/grid" element={<GridPage 
                    kmeans={kmeans}
                    width = {newWidth}
                    height={newHeight}
                    setKmeans = {setKmeans}
                    setWidth = {setNewWidth}
                    setHeight = {setNewHeight}/>} />

            </Routes>
        </BrowserRouter>
    );
    
}
 

export default App;