
import React, { useState } from 'react';
import './styles/Title.css'
import './styles/styles.css'
import GetInputs from './components/getInputs/getInputs';
import Loader from './components/loaderAnimation/loader';
import TaskReport from './components/tastReport/taskReport'


function App() {
  const [categories, setCategories] = useState(['Shaman King']);

  const onAddCategory = (newCategory: string) => {
  if (categories.includes(newCategory)) return;
  setCategories([newCategory, ...categories]);
  };

  return (
    <>
    <div className='page'>
        <div className='max-w-5xl'>
          <h1 className='tracking-in-expand-fwd-top '>Welcome to SpaceEoD!</h1>
          <br/>
          <GetInputs/>
          <br/>
        </div>  
      </div>    
    </>
  );
}

export default App;





