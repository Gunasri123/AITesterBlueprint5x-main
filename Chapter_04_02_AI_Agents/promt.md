# Project: Intelligent QA Documentation Generator

## R – Role

You are a Senior QA Automation Architect and Full-Stack Developer with approximately 15 years of experience in software testing, test strategy development, test planning, test case design, Jira integration, AI-powered application development, and React-based application architecture.

You have extensive experience in:
- Software Testing Life Cycle (STLC).
- Test Strategy and Test Plan preparation.
- Functional, regression, integration, API, and non-functional testing.
- Requirement analysis and test case design.
- Jira REST API integration.
- AI-powered document generation.
- React, JavaScript, Python/Node.js backend development.
- Document generation and formatting (DOCX and PDF).
- Building lightweight, user-friendly enterprise applications.

Your responsibility is to design and implement a production-quality, lightweight React-based AI application that automates QA documentation activities.

## I – Instructions

Build an **Intelligent QA Documentation Generator** that provides three primary capabilities:

1. Intelligent Test Plan Generator.
2. Intelligent Test Strategy Generator.
3. Intelligent Test Case Generator.

The application must integrate with Jira, retrieve ticket information automatically, analyze requirements, and generate structured QA documentation using the templates provided in the project.

### 1. Project Setup and Architecture

Before implementation:

- Inspect the existing project structure.
- Review the `design` folder and understand the provided UI designs.
- Review the `Test Plan`, `Test Strategy`, and `Test Case` folders.
- Identify and understand all existing document templates.
- Review the `.env` file for existing configuration variables.
- Understand the existing dependencies and project setup before making changes.

Create the following project structure inside the `implementation` folder:

```text
implementation/
│
└── source/
    │
    ├── frontend/
    │   ├── src/
    │   ├── public/
    │   └── package.json
    │
    ├── backend/
    │   ├── routes/
    │   ├── services/
    │   ├── controllers/
    │   ├── utils/
    │   └── package.json
    │
    └── README.md
```

Use a clean separation between frontend and backend responsibilities.

The frontend must use React. Select a lightweight backend technology appropriate for the existing project.

Do not unnecessarily modify or delete existing project files.

### 2. Jira Integration

The application must allow users to enter a Jira ticket ID.

Expected workflow:

1. User enters a Jira ticket ID.
2. Application connects to Jira using the configured credentials.
3. Application retrieves the relevant Jira ticket information.
4. AI analyzes the ticket description, acceptance criteria, requirements, attachments, and other available relevant information.
5. The application identifies missing requirements, ambiguities, assumptions, and dependencies.
6. Based on the selected document type, AI generates the appropriate QA document using the corresponding template.

Read existing Jira configuration from the `.env` file.

Configuration may include:
- Jira URL.
- Jira email ID.
- Jira API token.

Important security requirements:
- Never expose Jira API tokens or credentials in frontend code.
- Keep sensitive configuration on the backend.
- Never hardcode credentials.
- Do not print secrets in logs.
- Provide secure configuration management.

### 3. Intelligent Test Plan Generator

Generate a detailed test plan using the existing Test Plan template.

The generator must:
- Understand Jira requirements.
- Identify testing scope.
- Identify functional and non-functional scenarios where applicable.
- Identify dependencies and risks.
- Identify assumptions.
- Identify missing information.
- Generate test scenarios based on available requirements.
- Identify entry and exit criteria.
- Provide resource allocation and timelines where sufficient information is available.

**Mandatory Test Plan structure:**

The generated test plan must retain exactly these eight sections:

1. Scope & Objectives.
2. Gaps & Questions.
3. Test Scenarios.
4. Test Data & Environment.
5. Risks & Assumptions.
6. Entry/Exit Criteria.
7. Resource Allocation.
8. Timelines/Sprint Details.

Include a separate HUMAN REVIEW GATE indicating that the generated document is a draft and requires QA review and approval.

Do not arbitrarily remove, rename, or merge these sections.

### 4. Intelligent Test Strategy Generator

Generate a comprehensive test strategy using the existing Test Strategy template.

The generator must:
- Analyze the available project requirements.
- Identify the overall testing approach.
- Define testing levels and testing types.
- Identify automation opportunities.
- Identify test environments.
- Define test data management.
- Identify tools and technologies where known.
- Identify risk-based testing considerations.
- Define defect management and reporting approaches.
- Identify assumptions and missing information.

Follow the existing Test Strategy template exactly. Do not invent project-specific information that is not available in the source requirements.

### 5. Intelligent Test Case Generator

Generate detailed test cases using the existing Test Case template.

The generator must:
- Analyze Jira requirements and acceptance criteria.
- Identify positive test scenarios.
- Identify negative test scenarios.
- Identify boundary-value scenarios where applicable.
- Identify validation scenarios.
- Identify edge cases.
- Identify integration scenarios where applicable.
- Avoid duplicate test cases.
- Maintain traceability to Jira requirements and acceptance criteria.

Follow the existing Test Case template and retain its defined fields and structure.

### 6. PRD and Requirement Document Support

The application must support two different requirement input methods.

**Option A: Jira-based requirements**

Users provide a Jira ticket ID, and the application automatically retrieves the ticket details.

**Option B: Document-based requirements**

Users can upload a PRD or requirement document in DOCX format.

There may also be situations where the business team does not provide a formal PRD. In such cases, QA engineers may prepare their own requirement document.

Therefore, the application must allow users to upload QA-prepared requirement documents as well.

The AI must extract and analyze the document content and use it as the source for generating the selected QA document.

Do not make PRD upload mandatory when sufficient Jira information is available.

### 7. Insufficient Information and Requirement Clarification

When generating documents, the AI may encounter fields where sufficient information is unavailable.

Do not fabricate information to fill these gaps.

Instead:
- Clearly identify missing information.
- Explain why the information is required.
- Display the missing fields in an identifiable manner.
- Allow users to provide additional information later.
- Update the generated document using the newly supplied information.

Provide two ways to handle incomplete documents:

**Option A: Download and edit**

Users can download the generated document, edit it externally, and use the application for subsequent document management where supported.

**Option B: Provide information within the application**

Users can enter missing information directly into the application.

The AI should then:
1. Understand the additional information.
2. Map it to the appropriate document section.
3. Update only the relevant content.
4. Preserve the remaining document content.
5. Allow users to review the updated document.

Maintain the original Jira ticket or requirement document as the source of traceability.

### 8. Document Editing and Approval

Every generated document must support the following workflow:

1. Generate document.
2. Preview document.
3. Edit document.
4. Save changes.
5. Approve document.
6. Download approved document.

Users must be able to modify generated content before approval.

The application must clearly distinguish between:
- Draft.
- Pending Review.
- Approved.

Do not automatically mark AI-generated documents as approved.

Approval must require an explicit user action.

### 9. Document Download and Formatting

Provide download functionality for all three generated document types:

- Test Plan.
- Test Strategy.
- Test Cases.

The downloaded documents must be professionally formatted and suitable for enterprise QA documentation.

Requirements:
- Generate editable DOCX documents.
- Support PDF export where practical.
- Maintain consistent font family and font sizes.
- Maintain heading hierarchy.
- Use proper paragraph spacing.
- Use consistent margins.
- Format tables correctly.
- Preserve numbering and bullet points.
- Prevent content from being cut off.
- Maintain page breaks where appropriate.
- Include document title and relevant Jira ticket information.
- Include document version and review status where applicable.

The downloaded document must follow the corresponding template rather than simply exporting the browser screen.

## C – Context

This project is intended to reduce manual QA documentation effort using AI.

Currently, QA engineers spend considerable time:
- Reading Jira tickets.
- Understanding acceptance criteria.
- Preparing test plans.
- Preparing test strategies.
- Writing detailed test cases.
- Identifying missing requirements.
- Updating documents based on new information.
- Formatting and maintaining QA documents.

The objective is to automate these activities while keeping the QA engineer involved in reviewing and approving the generated documents.

The project already contains:

- A `design` folder containing the UI reference designs.
- A `Test Plan` folder containing the Test Plan template.
- A `Test Strategy` folder containing the Test Strategy template.
- A `Test Case` folder containing the Test Case template.
- An `.env` file containing existing configuration values.

Treat these existing resources as the primary reference.

Do not create a completely different design or invent new document structures when templates are already available.

## E – Examples

### Example 1: Generate a Test Plan from Jira

Input:

Jira ID: `QA-1234`

Expected workflow:

1. User enters `QA-1234`.
2. Application retrieves the Jira ticket.
3. AI analyzes the description and acceptance criteria.
4. AI identifies missing information.
5. AI generates a test plan using the existing template.
6. User previews the generated document.
7. User edits the content if necessary.
8. User approves the document.
9. User downloads the formatted DOCX or PDF.

### Example 2: Generate Test Cases from a PRD

Input:

User uploads `Product_Requirements.docx`.

Expected workflow:

1. Application extracts document content.
2. AI analyzes the requirements.
3. AI identifies functional and negative scenarios.
4. AI generates test cases using the existing Test Case template.
5. User reviews and edits the test cases.
6. User approves and downloads the document.

### Example 3: Provide Missing Information Later

Suppose the generated test plan identifies insufficient information for the test environment.

Expected workflow:

1. AI identifies the missing environment details.
2. User provides the environment information through the application.
3. AI updates the relevant Test Data & Environment section.
4. Other sections remain unchanged unless affected by the new information.
5. User reviews and approves the updated document.

### Example 4: Navigate Between Main Page and Settings

1. User enters a Jira ID.
2. Application generates a test plan.
3. User navigates to Settings.
4. User checks or updates configuration.
5. User navigates back to the Main Page.
6. Previously generated test plan must still be available.

The generated document must not disappear simply because the user navigates to another page.

## P – Persona

The primary users of this application are:

**QA Engineers**
- Retrieve requirements from Jira.
- Generate test plans and test cases.
- Review and update AI-generated content.
- Download QA documentation.

**QA Leads**
- Generate and review test strategies.
- Validate testing scope and approach.
- Review risks, assumptions, and test coverage.
- Approve generated documentation.

**QA Managers**
- Review overall QA documentation.
- Ensure consistency across documents.
- Review and approve documents before they are finalized.

The application must be simple enough for a manual tester to use without requiring programming or AI expertise.

## O – Output

Deliver a fully functional, lightweight React-based web application named:

**QAForge – Intelligent QA Documentation Generator**

### 1. Main Application UI

Follow the provided design folder as the primary UI reference.

The application must have:

- A clean navigation bar.
- Main Page navigation.
- Settings navigation.
- A Jira ticket input field.
- Requirement document upload.
- Document type selection.
- Generate button.
- Document preview area.
- Edit functionality.
- Approve functionality.
- Download functionality.
- Clear functionality.

### 2. Navigation and Layout

Implement the following UI improvements:

- Place Main Page and Settings buttons on the right side of the navigation bar.
- Use neutral and professional colours.
- Avoid an overly dark or black-heavy interface.
- Use consistent spacing and typography.
- Give every page a meaningful title.
- Keep the document preview window independently scrollable.
- Keep the Jira input and document generation controls accessible without requiring users to scroll to the bottom of the page.

### 3. Document Persistence

When a user generates a document and navigates to Settings, the generated document must remain available when returning to the Main Page.

Implement appropriate state management and persistence.

Provide a Clear button that allows users to explicitly clear the current document and start a new generation workflow.

Navigating between pages must never automatically clear generated content.

### 4. Settings Page

Implement the Settings page based on the provided design.

It must allow users to configure and manage:
- Jira URL.
- Jira email ID.
- Jira API token.
- AI configuration, if required by the selected AI provider.

Requirements:
- Display appropriate configuration fields.
- Mask sensitive credentials.
- Provide save and validation functionality.
- Never expose secrets in frontend responses.
- Read existing configuration from the `.env` file where applicable.
- Ensure settings changes do not remove the currently generated document.

### 5. Document Workspace

The document workspace must support:

- Document preview.
- Independent scrolling.
- Editing.
- Saving.
- Approval.
- Download.
- Updating incomplete sections.
- Clear document action.

Provide a user-friendly way to move between multiple generated documents.

### 6. Final Deliverables

The final implementation must include:

1. Fully functional React frontend.
2. Backend with appropriate API endpoints.
3. Jira integration.
4. AI-powered document generation.
5. DOCX requirement document upload and processing.
6. Test Plan generation.
7. Test Strategy generation.
8. Test Case generation.
9. Missing-information clarification workflow.
10. Document editing and approval workflow.
11. DOCX and PDF download functionality.
12. Settings page.
13. Proper error handling.
14. README with setup and execution instructions.

## T – Tone

The application must have a professional, clean, modern, and enterprise-friendly appearance.

The AI-generated QA documentation must use:

- Professional QA terminology.
- Clear and precise language.
- Consistent formatting.
- Structured headings.
- Meaningful descriptions.
- Actionable test scenarios.
- Unambiguous test steps.
- No unnecessary repetition.
- No fabricated requirements or assumptions presented as facts.

The AI must behave like an experienced QA architect rather than a generic text generator.

---

## Additional Implementation Guidelines

Before writing code:

1. Inspect all existing folders and files.
2. Understand the supplied UI design.
3. Read all three document templates.
4. Review the existing `.env` configuration.
5. Prepare an implementation plan.

During development:

- Implement the frontend and backend in separate folders.
- Use reusable React components.
- Keep Jira integration logic separate from document generation logic.
- Use reusable document-generation services.
- Follow clean coding practices.
- Handle API failures and invalid Jira IDs.
- Validate uploaded documents.
- Avoid unnecessary dependencies.
- Ensure the application can be started locally.

### Important Development Rules

- Do not implement only a static UI or mockup.
- Do not use hardcoded Jira responses as actual integration.
- Do not invent missing requirement information.
- Do not replace the supplied templates with arbitrary formats.
- Do not expose API tokens.
- Do not remove existing project configurations.
- Do not mark generated documents as approved automatically.
- Do not overwrite generated document content without user confirmation.

### Definition of Done

The project is considered complete only when:

- A valid Jira ID can retrieve actual Jira information.
- A DOCX requirement document can be uploaded and processed.
- All three document types can be generated.
- Existing templates are followed.
- Missing information can be supplied later.
- Generated documents can be edited.
- Users can explicitly approve documents.
- DOCX and PDF downloads are properly formatted.
- Settings navigation preserves generated documents.
- The document preview is independently scrollable.
- The application works end-to-end locally.
- README contains complete setup and execution instructions.

**First analyze the existing project and design. Then propose the implementation plan. Once the plan is clear, proceed with implementation in the `implementation/source` folder.**