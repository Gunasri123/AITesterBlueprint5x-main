const fs = require('fs');
const path = require('path');

const TYPES = {
  plan: { name: 'Test Plan', file: 'Test_plan/TestPlan_Template.md' },
  strategy: { name: 'Test Strategy', file: 'Test_Strategy/TestStrategy_Templte.md' },
  cases: { name: 'Test Cases', file: 'Test_Cases/TestCases_Template.md' },
};

// Prefer the project's original templates (local); fall back to the bundled copy (Vercel).
const ORIGINAL = path.resolve(__dirname, '../../../..');
const BUNDLED = path.join(__dirname, '../templates');

function loadTemplate(type) {
  const orig = path.join(ORIGINAL, TYPES[type].file);
  return fs.readFileSync(fs.existsSync(orig) ? orig : path.join(BUNDLED, path.basename(TYPES[type].file)), 'utf8');
}

const httpError = (status, message) => Object.assign(new Error(message), { status });

module.exports = { TYPES, loadTemplate, httpError };
