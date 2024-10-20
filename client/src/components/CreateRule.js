// src/components/CreateRule.js
import React, { useState } from 'react';
import { generateTreeHTML } from '../utils/treeUtils'; // Utility function for generating AST Tree

function CreateRule() {
  const [ruleResult, setRuleResult] = useState('');

  const handleCreateRule = async (e) => {
    e.preventDefault();
    const ruleName = e.target.ruleName.value;
    const ruleString = e.target.ruleString.value;
     console.log(ruleName,ruleString);
    const response = await fetch('/api/rules/create_rule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ruleName, ruleString }),
    });
    const result = await response.json();
    console.log(result);
    const treeHTML = generateTreeHTML(result.ruleAST);
    console.log(treeHTML);
    setRuleResult(treeHTML + `\nRule Name: ${result.ruleName}`);
  };
 
  return (
    <section>
      <h2 className="text-blue-400 text-3xl font-semibold mt-8 mb-4">Create Rule</h2>
      <form onSubmit={handleCreateRule} className="mb-4">
        <div className="mb-4">
          <label htmlFor="ruleName" className="block mb-2 text-blue-300">Rule Name:</label>
          <input
            type="text"
            id="ruleName"
            name="ruleName"
            required
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="ruleString" className="block mb-2 text-blue-300">Rule:</label>
          <input
            type="text"
            id="ruleString"
            name="ruleString"
            required
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md"
          />
        </div>
        <button type="submit" className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded-md">
          Create Rule
        </button>
      </form>
      <pre className="whitespace-pre-wrap text-blue-400">{ruleResult}</pre>
    </section>
  );
}

export default CreateRule;
