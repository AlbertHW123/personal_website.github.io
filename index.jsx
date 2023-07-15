import React from 'react';
import ReactDOM from 'react-dom';
import MainApp from './MainApp';

ReactDOM.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>,
  document.getElementById('root')
);

import React, { useState } from 'react';
import SectionOne from './components/SectionOne';
import SectionTwo from './components/SectionTwo';
import SectionThree from './components/SectionThree';
import SectionFour from './components/SectionFour';
import SectionFive from './components/SectionFive';
import SectionSix from './components/SectionSix';

const MainApp = () => {
  const [content, setContent] = useState('');
  const [introType, setIntroType] = useState('personal');
  const [introOptionIndex, setIntroOptionIndex] = useState(0);
  const [resumeType, setResumeType] = useState('education');

  const handlePersonalIntroClick = () => {
    // similar to your jsonFetchRequest(), this is simplified
    // replace 'url' with your actual API endpoint
    fetch(`/question/${introType}/${introOptionIndex}`)
      .then(response => response.json())
      .then(data => setContent(data))
      .catch(error => setContent(`Error: ${error}`));
  };

  const handleResumeClick = () => {
    // similar to your textFetchRequest(), this is simplified
    // replace 'url' with your actual API endpoint
    fetch(`/resume/${resumeType}`)
      .then(response => response.text())
      .then(data => setContent(data))
      .catch(error => setContent(`Error: ${error}`));
  };

  return (
    <div>
      <SectionOne handlePersonalIntroClick={handlePersonalIntroClick} handleResumeClick={handleResumeClick} />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <SectionFive />
      <SectionSix content={content} />
    </div>
  );
};

export default MainApp;
