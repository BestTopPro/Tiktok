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
        {/* <div className="sidenav">
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
        </div> */}
    <div class="grid grid-cols-4 gap-4">
        <div>01</div>
        <div>09</div>
        <button type="button" class="blur-sm ring-2 ring-blue-500 rounded-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ...">
          Hover me
        </button>
    </div>
    {/* <div className='bg-[#3598DB] flex overflow-y-auto min-h-screen'>
      <div className='pt-28 px-6 bg-yellow-200'>
        <div className='flex flex-col gap-6'>
          <div className='text-white'>dfgdfgsfgsrgv</div>
        </div>
      </div>
      <div className='pt-28 px-6 bg-cyan-200'>
        <div className='flex flex-col gap-6'>
          <div className='text-white'>dfgdfgsfgsrgv</div>
        </div>
      </div>
      <div className='pt-28 px-6 bg-red-200'>
        <div className='flex flex-col gap-6'>
          <div className='text-white'>dfgdfgsfgsrgv</div>
        </div>
      </div>
    </div> */}
      </div>
    )
}

export default Tiktok;