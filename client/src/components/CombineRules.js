// src/components/CombineRules.js
import React, { useState } from 'react';
import { generateTreeHTML } from '../utils/treeUtils'; // Utility function for generating AST Tree

function CombineRules() {
  const [rules, setRules] = useState([{ rule: '', operator: 'AND' }]);
  const [combineResult, setCombineResult] = useState('');

  const handleCombineRules = async (e) => {
    e.preventDefault();
    const ruleInputs = rules.map(rule => rule.rule);
    const operator = e.target.operator1.value;
    console.log(ruleInputs,operator);
    const response = await fetch('/api/rules/combine_rules', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rules: ruleInputs, op: operator }),
    });
    const result = await response.json();
    console.log(result);
    const treeHTML = generateTreeHTML(result.ruleAST);
    setCombineResult(treeHTML + `\nRule Name: ${result.ruleName}`);
  };

  const addRuleField = () => {
    setRules([...rules, { rule: '', operator: 'AND' }]);
  };

  return (
    <section>
      <h2 className="text-blue-400 text-3xl font-semibold mt-8 mb-4">Combine Rules</h2>
      <form onSubmit={handleCombineRules}>
        {rules.map((_, index) => (
          <div key={index} className="mb-4">
            <label htmlFor={`combine-rule${index + 1}`} className="block mb-2 text-blue-300">
              Rule {index + 1}:
            </label>
            <input
              type="text"
              id={`combine-rule${index + 1}`}
              className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md mb-2"
              required
              value={rules[index].rule}
              onChange={(e) => {
                const updatedRules = [...rules];
                updatedRules[index].rule = e.target.value;
                setRules(updatedRules);
              }}
            />
            <label htmlFor={`operator${index + 1}`} className="block mb-2 text-blue-300">Operator:</label>
            <select
              id={`operator${index + 1}`}
              className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md"
              onChange={(e) => {
                const updatedRules = [...rules];
                updatedRules[index].operator = e.target.value;
                setRules(updatedRules);
              }}
              value={rules[index].operator}
            >
              <option value="AND">AND</option>
              <option value="OR">OR</option>
            </select>
          </div>
        ))}
        <button type="button" onClick={addRuleField} className="bg-green-600 hover:bg-green-800 text-white py-2 px-4 rounded-md">
          Add Another Rule
        </button>
        <button type="submit" className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded-md ml-4">
          Combine Rules
        </button>
      </form>
      <pre className="whitespace-pre-wrap text-blue-400">{combineResult}</pre>
    </section>
  );
}

export default CombineRules;
