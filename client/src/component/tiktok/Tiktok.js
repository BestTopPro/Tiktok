import axios from 'axios';
import React, { useState } from 'react';

import '../../App.css'

const Tiktok = () => {
    const [data, setData] = useState([]);

    const IsOnlyTiktok = (text) => {
        for(let i = 0; i < text.length; i++){
            if(text[i].includes('?') ||  !text[i].includes('tiktok')) return false;
        }

        return true;
    }

    const handleOkClick = () => {
        const text = document.querySelectorAll('textarea')[0].value;
        const lines = text.split(/\n/);
        const newLines = [];
        lines.forEach((line , index) => {
            if(line.includes("tiktok")) newLines.push({
              name:line.split('?')[0]
            });
        });
        setData(newLines);
    }

    const handleAllClick = () => {
      axios
        .get('http://localhost:5000/')
        .then((res) => {
            setData(res.data);
        })
        .catch(err => {
            throw err;
        })
    }
    const handleAddClick = () => {
      const text = document.querySelectorAll('textarea')[0].value;
      const lines = text.split(/\n/);

      if(IsOnlyTiktok(lines)){
        axios
            .post('http://localhost:5000/' , { data: lines })
            .then((res) => {
                alert('Successfully Inserted!')
                setData(data);
            })
            .catch(err => {
                throw err;
            })
      }
      else{
        alert("Invalid urls!");
      }
    }

    const handleCheckClick = () => {
      const text = document.querySelectorAll('textarea')[0].value;
      const lines = text.split(/\n/);
      const newLines = [];
        lines.forEach((line , index) => {
            if(line.includes("tiktok")) newLines.push(lines[index] = line.split('?')[0]);
        });
        axios
            .post('http://localhost:5000/check' , { data: newLines })
            .then((res) => {
                setData(res.data)
            })
            .catch(err => {
                throw err;
            })
    }

    return (
      <div className=''>
        <div className="sidenav">
          {data.map(elm => (
            <p>{elm.name}</p>
          ))}
        </div>

        <div className="content">
          <textarea>
          </textarea>
          <div className='Buttons'>
            <span onClick={handleOkClick} className='OK'>OK</span>
            <span onClick={handleAddClick} className='Save'>Save</span>
            <span onClick={handleCheckClick} className='Check'>Check</span>
            <span onClick={handleAllClick} className='All'>View</span>
          </div>
        </div> 
      </div>
    )
}

export default Tiktok;
