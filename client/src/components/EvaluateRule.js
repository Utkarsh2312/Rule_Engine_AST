// src/components/EvaluateRule.js
import React, { useState } from 'react';

function EvaluateRule() {
  const [evaluateResult, setEvaluateResult] = useState('');

  const handleEvaluateRule = async (e) => {
    e.preventDefault();
    const ast = e.target.ast.value;
    const data = e.target.data.value;
    console.log(ast,data);
    const response = await fetch('/api/rules/evaluate_rule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ast, data: JSON.parse(data) }),
    });
    const result = await response.json();
    console.log(result);
    setEvaluateResult(JSON.stringify(result, null, 2));
  };

  return (
    <section>
      <h2 className="text-blue-400 text-3xl font-semibold mt-8 mb-4">Evaluate Rule</h2>
      <form onSubmit={handleEvaluateRule}>
        <div className="mb-4">
          <label htmlFor="evaluate-ast" className="block mb-2 text-blue-300">Rule Name:</label>
          <input
            type="text"
            id="evaluate-ast"
            name="ast"
            required
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="evaluate-data" className="block mb-2 text-blue-300">Data JSON:</label>
          <textarea
            id="evaluate-data"
            name="data"
            required
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md"
            rows={5}
          />
        </div>
        <button type="submit" className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded-md">
          Evaluate Rule
        </button>
      </form>
      <pre className="whitespace-pre-wrap text-blue-400 mt-4">{evaluateResult}</pre>
    </section>
  );
}

export default EvaluateRule;
