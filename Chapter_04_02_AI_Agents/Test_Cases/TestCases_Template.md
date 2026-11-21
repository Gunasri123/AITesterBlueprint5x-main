
# Test Case Document

> **Status:** DRAFT — Pending Review  
> **Project Name:** [Project Name]  
> **Application Name:** [Application Name]  
> **Module:** [Module Name]  
> **Test Cycle / Release:** [Release Version]  
> **Prepared By:** [QA Engineer]  
> **Created Date:** [DD-MM-YYYY]  
> **Last Updated:** [DD-MM-YYYY]

---

## 1. Test Case Overview

| Field | Description |
|---|---|
| Test Case ID | Unique identifier (e.g., TC_LOGIN_001) |
| Test Case Title | Brief description of the test case |
| Requirement ID | Associated requirement / user story ID |
| Module | Application module |
| Feature | Feature being tested |
| Test Scenario ID | Associated test scenario ID |
| Test Type | Functional / Integration / Regression / Smoke / Security / Performance |
| Test Priority | Critical / High / Medium / Low |
| Test Severity | Critical / High / Medium / Low (if applicable) |
| Test Category | Positive / Negative / Boundary / Edge Case |
| Automation Status | Automatable / Manual / Automated |
| Test Designed By | QA Engineer |
| Test Designed Date | DD-MM-YYYY |
| Reviewed By | Reviewer Name |
| Review Status | Pending / Approved / Rejected |

---

## 2. Preconditions

List all conditions that must be satisfied before executing the test case.

- [Precondition 1]
- [Precondition 2]
- [Precondition 3]

Example:
- User must have a valid registered account.
- Application must be accessible.
- User must be on the login page.

---

## 3. Test Environment

| Field | Details |
|---|---|
| Environment | QA / SIT / UAT / Staging |
| Application Version | [Build / Version] |
| Operating System | [Windows / macOS / Android / iOS] |
| Browser / Device | [Chrome / Firefox / Safari / Device Model] |
| Database | [Database Name / Version, if applicable] |
| Test URL | [Application URL] |

---

## 4. Test Data

| Data ID | Test Data Description | Test Data Value |
|---|---|---|
| TD_001 | Valid Username | [Username] |
| TD_002 | Valid Password | [Password] |
| TD_003 | Invalid Username | [Invalid Username] |

> **Note:** Do not store actual passwords, API secrets, or sensitive production information in test case documents.

---

## 5. Test Steps and Expected Results

| Step No. | Test Steps / Actions | Test Data | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| 1 | [Action to perform] | [Test Data] | [Expected outcome] | [Observed outcome] | Not Run |
| 2 | [Action to perform] | [Test Data] | [Expected outcome] | [Observed outcome] | Not Run |
| 3 | [Action to perform] | [Test Data] | [Expected outcome] | [Observed outcome] | Not Run |

---

## 6. Execution Details

| Field | Details |
|---|---|
| Executed By | [QA Engineer] |
| Execution Date | [DD-MM-YYYY] |
| Execution Environment | [QA / SIT / UAT] |
| Build Version | [Version] |
| Execution Status | Not Run / Pass / Fail / Blocked / Not Applicable |
| Defect ID | [JIRA Defect ID, if applicable] |
| Execution Comments | [Additional observations] |

---

## 7. Postconditions

List the expected system state after executing the test case.

- [Postcondition 1]
- [Postcondition 2]

Example:
- User should be successfully logged in.
- User session should be created.

---

## 8. Defect Details (If Applicable)

| Field | Details |
|---|---|
| Defect ID | [BUG-001] |
| Defect Summary | [Defect Description] |
| Severity | Critical / High / Medium / Low |
| Priority | P1 / P2 / P3 / P4 |
| Defect Status | New / Assigned / Fixed / Retest / Closed |
| Evidence | [Screenshot / Video / Logs] |

---

## 9. Test Evidence

Attach or reference supporting execution evidence.

- Screenshot: [File Path / Link]
- Video Recording: [File Path / Link]
- API Request / Response: [File Path / Link]
- Execution Logs: [File Path / Link]

---

## 10. Test Case Review and Approval

| Role | Name | Status | Date |
|---|---|---|---|
| Test Case Author | [Name] | Completed | [Date] |
| QA Reviewer | [Name] | Pending | [Date] |
| QA Lead | [Name] | Pending | [Date] |

---

# Test Case Writing Guidelines

1. Every test case must have a unique Test Case ID.
2. Test cases must be traceable to a requirement or user story.
3. Test case titles should clearly describe the functionality being validated.
4. Each test case should validate one specific objective wherever practical.
5. Test steps must be clear, simple, and reproducible.
6. Expected results must be measurable and unambiguous.
7. Include positive, negative, boundary, and edge-case scenarios where applicable.
8. Avoid hardcoding sensitive information in test data.
9. Define preconditions and postconditions wherever required.
10. Review test cases before execution.
11. Keep actual results and execution status separate from expected results.
12. Update test cases whenever requirements or application behaviour change.

---

# Sample Test Cases — Login Module

## TC_LOGIN_001 — Verify Login With Valid Credentials

| Field | Details |
|---|---|
| Test Case ID | TC_LOGIN_001 |
| Test Case Title | Verify login with valid credentials |
| Requirement ID | REQ_LOGIN_001 |
| Module | Authentication |
| Feature | User Login |
| Test Type | Functional |
| Test Priority | High |
| Test Category | Positive |
| Automation Status | Automatable |
| Preconditions | User must have a registered and active account. |

### Test Data

| Field | Value |
|---|---|
| Username | valid_user |
| Password | ValidPassword123 |

### Test Steps

| Step No. | Test Steps | Expected Result |
|---|---|---|
| 1 | Navigate to the application login page. | Login page should be displayed. |
| 2 | Enter a valid username. | Username should be accepted. |
| 3 | Enter a valid password. | Password should be accepted and masked. |
| 4 | Click the Login button. | User should be authenticated successfully. |
| 5 | Verify the landing page. | User should be redirected to the dashboard. |

### Execution Status

**Status:** Not Run

---

## TC_LOGIN_002 — Verify Login With Invalid Password

| Field | Details |
|---|---|
| Test Case ID | TC_LOGIN_002 |
| Test Case Title | Verify login with an invalid password |
| Requirement ID | REQ_LOGIN_001 |
| Module | Authentication |
| Feature | User Login |
| Test Type | Functional |
| Test Priority | High |
| Test Category | Negative |
| Automation Status | Automatable |
| Preconditions | User must have a registered and active account. |

### Test Data

| Field | Value |
|---|---|
| Username | valid_user |
| Password | InvalidPassword123 |

### Test Steps

| Step No. | Test Steps | Expected Result |
|---|---|---|
| 1 | Navigate to the application login page. | Login page should be displayed. |
| 2 | Enter a valid username. | Username should be accepted. |
| 3 | Enter an invalid password. | Password should be accepted as input. |
| 4 | Click the Login button. | Login should be rejected. |
| 5 | Verify the error message. | Appropriate authentication error should be displayed. |

### Execution Status

**Status:** Not Run

---

**End of Test Case Document**
