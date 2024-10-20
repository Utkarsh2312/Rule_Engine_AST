// src/App.js
import React from 'react';
import Header from './components/Header';
import CreateRule from './components/CreateRule';
import CombineRules from './components/CombineRules';
import EvaluateRule from './components/EvaluateRule';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
      <div className="w-full max-w-3xl p-8 bg-transparent rounded-md">
        <Header />
        <CreateRule />
        <CombineRules />
        <EvaluateRule />
      </div>
    </div>
  );
}

export default App;
