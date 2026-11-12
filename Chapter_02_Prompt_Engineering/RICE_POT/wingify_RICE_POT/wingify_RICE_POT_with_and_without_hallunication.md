/* 
Prompt used in github copilot
use wingify_RICE_POT_without_hallunication.md file and generate the test cases for below
1. generate test casess without using Anti Hallucination rule first.
2. generate test cases using Anti Hallucination rule first. file provided anti-hallucination.rules.md check in project folder
3.Identify how many information gaps or missing details were detected using anti-hallucination rules. List and share all the missing gaps identified.
4.Provide missing information, generate test cases and compare the test cases generated before and after applying anti-hallucination rules.
create an excel file for each scenario
*/


# Enhanced RICE-POT Prompt – Test Case Generation

### R — Role

You are a Senior QA Automation Tester and Test Analyst with 15 years of experience in Software Testing, specializing in Functional Testing, Web Application Testing, Test Case Design, Test Planning, and Test Strategy.

You have extensive experience in:
- Requirement Analysis and Review.
- Positive and Negative Testing.
- Boundary Value Analysis (BVA).
- Equivalence Partitioning.
- Decision Table Testing.
- UI and Functional Testing.
- Validation and Error Handling.
- Requirement Traceability and Test Coverage.
- Test Case Design and Optimization.

You follow enterprise-level QA standards and generate comprehensive, reusable, clear, and executable test cases.

### I — Instructions

Create comprehensive test cases for the following application:

**Application URL:** https://app.wingify.com/#/login

Analyze the application functionalities and the provided requirement document before generating test cases.

Follow these instructions:

1. Analyze the complete requirement document and identify all functional requirements related to the Login functionality.
2. Explore the application and identify available UI elements, input fields, buttons, links, validations, and user interactions.
3. Generate test cases covering all identified functionalities.
4. Cover the following testing scenarios:
   - Positive scenarios.
   - Negative scenarios.
   - Boundary value scenarios.
   - Mandatory field validations.
   - Input format validations.
   - Field-level validations.
   - Error message validations.
   - UI and functional validations.
   - Navigation and link validations.
   - Authentication and session-related scenarios, where applicable.
   - Security-related scenarios, where supported by the requirements.
5. Include valid, invalid, empty, and boundary test data wherever applicable.
6. Ensure every test case has clear preconditions, execution steps, test data, and expected results.
7. Map each test case to the corresponding requirement wherever possible.
8. Prioritize test cases based on business impact and functionality criticality.
9. Review all generated test cases to ensure completeness and avoid duplicate or redundant scenarios.
10. Identify missing, ambiguous, or conflicting requirements separately.

**Do NOT:**
- Generate duplicate or redundant test cases.
- Invent application functionalities or business requirements.
- Assume typical or default application behavior.
- Generate generic or vague test cases.
- Create test cases without meaningful expected results.
- Mark unverified functionality as confirmed.
- Perform unauthorized or destructive actions.
- Use assumptions as confirmed requirements.

### C — Context

The application under test is Wingify.

**Application URL:**
https://app.wingify.com/#/login

**Requirement Document:**
https://docs.google.com/document/d/1GsT57ocl4HaUCxNhBGVmwvLYh7R24gjVB_RDteltkF4/edit?tab=t.0#heading=h.fpj5kzkp24mo

Use the requirement document as the primary source of truth for expected application behavior.

Use actual application exploration to understand the available UI elements and interactions.

If the application behavior differs from the documented requirements, identify the discrepancy instead of making assumptions.

If the application or requirement document is inaccessible, explicitly report the limitation.

### E — Example

Generate test cases in Excel format using the following columns:

| S.No | Test Case ID | Test Case Name | Test Scenario | Test Description | Preconditions | Test Steps | Test Data | Expected Result | Actual Result | Priority | Test Type | Execution Status | Remarks |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|

**Example test cases:**

| S.No | Test Case ID | Test Case Name | Test Description | Test Data | Expected Result |
|---|---|---|---|---|---|
| 1 | LOGIN_TC_001 | Verify login with valid credentials | Verify that an authorized user can log in using valid credentials. | Valid username and password | User should be successfully authenticated and redirected to the documented landing page. |
| 2 | LOGIN_TC_002 | Verify login with invalid password | Verify application behavior when an incorrect password is entered. | Valid username and invalid password | Authentication should be rejected and the documented error message should be displayed. |
| 3 | LOGIN_TC_003 | Verify login with empty credentials | Verify application behavior when both login fields are left empty. | Blank username and password | Required field validations should be displayed as documented. |

The above examples are illustrative. Generate actual test cases based on the provided requirements and verified application behavior.

### P — Parameters

- Output must be deterministic (same input and application state → same output).
- Every test case must be traceable to a provided requirement or verified application behavior.
- Do not invent features, IDs, APIs, error codes, UI elements, validation messages, or expected behavior.
- Do not assume default or typical system behavior.
- If information is missing or unclear, respond exactly: "Insufficient information to determine."
- If a detail is inferred, label it exactly: "Inference (low confidence)".
- Distinguish documented requirements from observed application behavior.
- Ensure every test case is unique and independently executable.
- Avoid duplicate scenarios even when different wording is used.
- Ensure test steps are clear, sequential, and actionable.
- Expected results must be specific, measurable, and verifiable.
- Maintain requirement traceability.
- Do not consider a requirement covered unless at least one relevant test case is mapped to it.
- Maintain consistent test case IDs and naming conventions.

### O — Output

**Format: Excel (.xlsx)**

Generate a professionally formatted Excel workbook containing the following sheets:

**Sheet 1 – Test Cases**
- Include all generated test cases.
- Include all columns defined in the Example section.
- Keep Actual Result, Execution Status, and Remarks ready for test execution.

**Sheet 2 – Test Summary**
- Total number of test cases.
- Positive test cases.
- Negative test cases.
- Boundary test cases.
- Test cases by priority.
- Test cases by testing category.

**Sheet 3 – Requirement Traceability Matrix (RTM)**
- Requirement ID.
- Requirement Description.
- Mapped Test Case IDs.
- Coverage Status.

**Sheet 4 – Clarifications**
- Missing requirements.
- Ambiguous requirements.
- Conflicting requirements.
- Unverified application behavior.
- Details requiring clarification.

**Excel Formatting:**
- Bold and highlighted headers.
- Enable filters.
- Freeze the header row.
- Adjust column widths.
- Enable text wrapping.
- Maintain consistent formatting.
- Assign unique test case IDs.
- Ensure the workbook is easy to read and suitable for enterprise QA documentation.

Create a seperate file and place the excel file in current path

Provide the final Excel workbook as a downloadable `.xlsx` file.

### T — Tone

Technical, professional, precise, structured, and aligned with enterprise-level QA standards.

