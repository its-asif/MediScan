import React, { useState, useEffect } from 'react';
import SectionTitle from '../shared/SectionTitle';

const SymptomChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [symptomData, setSymptomData] = useState([]);
  const [possiblePrognosis, setPossiblePrognosis] = useState([]);

  useEffect(() => {
    // Simulating fetching symptom data from a server (replace with actual API call)
    fetch('symptom-data.json')
      .then((response) => response.json())
      .then((data) => setSymptomData(data));
  }, []);

  const handleSymptomChange = (symptom) => {
    // Toggle selected symptoms
    setSelectedSymptoms((prevSelected) => {
      if (prevSelected.includes(symptom)) {
        return prevSelected.filter((s) => s !== symptom);
      } else {
        return [...prevSelected, symptom];
      }
    });
  };

  useEffect(() => {
    // Filter possible prognosis based on selected symptoms
    const filteredPrognosis = symptomData.filter((item) =>
      selectedSymptoms.every((symptom) => item[symptom] === 1)
    );
    setPossiblePrognosis(filteredPrognosis);
  }, [selectedSymptoms, symptomData]);

  return (
    <div className="container mx-auto p-6 pt-0">
        
      <SectionTitle heading={'Symptom Checker'} subHeading={'Check your symptoms and get possible prognosis'} />

      <div className='flex gap-10'>
        <div className="w-1/2 p-10">
            <p className="text-lg mb-2">Select your symptoms:</p>
            <div className="flex flex-col overflow-y-auto " style={{ maxHeight: '400px' }}>
            {symptomData[0] && Object.keys(symptomData[0]).map((symptom) => (
                <label
                key={symptom}
                className="mr-4 mb-2 flex items-center cursor-pointer"
                >
                <input
                    type="checkbox"
                    value={symptom}
                    checked={selectedSymptoms.includes(symptom)}
                    onChange={() => handleSymptomChange(symptom)}
                    className="mr-2"
                />
                {symptom}
                </label>
            ))}
            </div>
        </div>
        <div className='w-1/2 p-10'>
            <h3 className="text-2xl font-bold mb-4">Possible Prognosis:</h3>
            {possiblePrognosis.length > 0 ? (
            <ul className="list-disc pl-6">
                {possiblePrognosis.map((item, index) => (
                <li key={index} className="mb-2">{item.prognosis}</li>
                ))}
            </ul>
            ) : (
            <p>No matching prognosis found.</p>
            )}
        </div>
    </div>
    
    <div className="text-gray-500 text-xs text-right mt-4">
      Data source: <a href="https://github.com/Aniruddha-Tapas/Predicting-Diseases-From-Symptoms/blob/master/Manual-Data/Testing.csv" target="_blank" rel="noopener noreferrer">Github : Aniruddha-Tapas / Predicting-Diseases-From-Symptoms</a>

    </div>

    </div>
  );
};

export default SymptomChecker;