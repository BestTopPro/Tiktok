import axios from 'axios';
import React, { useState } from 'react';

import '../../App.css'

const Tiktok = () => {
  const [data, setData] = useState([]);

  const IsOnlyTiktok = (text) => {
    for (let i = 0; i < text.length; i++) {
      if (text[i].includes('?') || !text[i].includes('tiktok')) return false;
    }

    return true;
  }

  const handleOkClick = () => {
    const text = document.querySelectorAll('textarea')[0].value;
    const lines = text.split(/\n/);
    const newLines = [];
    lines.forEach((line, index) => {
      if (line.includes("tiktok")) newLines.push({
        name: line.split('?')[0]
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

    if (IsOnlyTiktok(lines)) {
      axios
        .post('http://localhost:5000/', { data: lines })
        .then((res) => {
          alert('Successfully Inserted!')
          setData(data);
        })
        .catch(err => {
          throw err;
        })
    }
    else {
      alert("Invalid urls!");
    }
  }

  const handleCheckClick = () => {
    const text = document.querySelectorAll('textarea')[0].value;
    const lines = text.split(/\n/);
    const newLines = [];
    lines.forEach((line, index) => {
      if (line.includes("tiktok")) newLines.push(lines[index] = line.split('?')[0]);
    });
    axios
      .post('http://localhost:5000/check', { data: newLines })
      .then((res) => {
        setData(res.data)
      })
      .catch(err => {
        throw err;
      })
  }

  return (
    <div className=''>
      <div>
        <div className="relative flex flex-col items-center pt-16 pb-16 ml-auto mr-auto bg-white lg:flex-row lg:py-3 xl:py-48 md:px-8 max-w-screen-2xl">
          <div className="items-center justify-center w-full h-full lg:w-1/2 lg:justify-start lg:bottom-0 lg:left-0 lg:items-center">
            {data.map(elm => (
              <p className="flex-grow w-auto h-12 pt-3 pb-3 pl-4 pr-4 mb-2 text-xs font-normal text-black transition duration-200 bg-white border-2 border-gray-300 rounded-md shadow-sm appearance-none md:mr-2 focus:border-blue-700 focus:outline-none focus:shadow-outline">
                {elm.name}
              </p>
            ))}
            </div>
          <div className="relative flex justify-end max-w-xl ml-auto mr-auto xl:pr-32 lg:max-w-screen-xl">
            <div className="lg:pr-5 lg:max-w-lg lg:mb-16">
              <div className="max-w-xl mb-6">
                <p className="inline-block pt-1 pb-1 pl-3 pr-3 mb-4 text-xs font-semibold tracking-wider text-pink-200 uppercase bg-pink-500 rounded-2xl">INput your text below</p>
              </div>
              <div className="flex flex-col md:flex-row">
                <textarea type="text" className="flex-grow w-auto h-48 pt-3 pb-3 pl-4 pr-4 mb-2 text-xs font-normal text-black transition duration-200 bg-white border-2 border-gray-300 rounded-md shadow-sm appearance-none h-96 h-72 md:mr-2 focus:border-blue-700 focus:outline-none focus:shadow-outline" placeholder="Email Address" />
              </div>
              <div className="flex items-center mt-4">
                <button onClick={handleOkClick} className="inline-flex items-center justify-center h-12 pl-6 pr-6 mr-6 font-semibold tracking-wide text-white transition duration-200 bg-blue-700 rounded-md shadow-md text-medium hover:bg-blue-900 focus:shadow-outline focus:outline-none" >OK</button>
                <button onClick={handleAddClick} className="inline-flex items-center justify-center h-12 pl-6 pr-6 mr-6 font-semibold tracking-wide text-white transition duration-200 bg-blue-700 rounded-md shadow-md text-medium hover:bg-blue-900 focus:shadow-outline focus:outline-none" >Save</button>
                <button onClick={handleCheckClick} className="inline-flex items-center justify-center h-12 pl-6 pr-6 mr-6 font-semibold tracking-wide text-white transition duration-200 bg-blue-700 rounded-md shadow-md text-medium hover:bg-blue-900 focus:shadow-outline focus:outline-none" >Check</button>
                <button onClick={handleAllClick} className="inline-flex items-center justify-center h-12 pl-6 pr-6 mr-6 font-semibold tracking-wide text-blue-700 transition duration-200 bg-transparent rounded-md shadow-md text-medium hover:bg-blue-50 focus:shadow-outline focus:outline-none">View</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tiktok;
