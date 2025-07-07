# Nesto QA - Cypress Test Suite

Automated end-to-end tests for the [Nesto QA App](https://app.qa.nesto.ca/login), focusing on **sign-up** and **login** flows using Cypress and TypeScript.

---

## Test cases
### Login usecases
#### API test cases
* TC01: Login with valid user
* TC02: Fails when logging in with invalid users
#### UI test cases
* TC01: Loads the login page with all required fields
* TC02: Shows validation errors when submitting empty form'
* TC03: Displays error on invalid credentials
* TC04: Logs in with signed up user
* TC05: Logs in successfully with valid credentials
* TC06: Should not allow script injection in email field
* TC07: Should not allow script injection in password field
* TC08: Should navigate to forgot password page

---

### Sign up usecases
#### API test cases
* TC01: Signs up a unique user
* TC02: Sign up fails when signing up same user again'
#### UI test cases
* TC01: Should load the signup page
* TC02: Should show validation errors when submitting empty form
* TC03: Should validate email format
* TC04: Should successfully sign up a new user
* TC05: Should throw validation error is password and confirm password don't match
* TC06: Should throw errors if too many characters are added to First name and Last Name
* TC07: Should throw errors if password doesn't meet policy

---

## Getting Started

### Clone the repo

```bash
git clone https://github.com/priyankajshi/nesto-cypress-tests.git
```

### Containerized Runs

#### Prerequisite
Docker on local machine

#### Create an image 
```bash
docker build -t nesto-cypress-tests:latest .
```

#### Run Tests
Run the following command to run the tests using docker containers

* Credentials are passed as environment variable (Please use a valid username and password)
* Volume is set to copy test reports, screenshots and videos it should be present in local 
   $PWD/cypress/*

```bash
docker run --rm \
  -e CYPRESS_username='test@yopmail.com' \ 
  -e CYPRESS_password='TestUser@1234' \
  -v $PWD/cypress/reports:/e2e/cypress/reports \
  -v $PWD/cypress/screenshots:/e2e/cypress/screenshots \
  -v $PWD/cypress/videos:/e2e/cypress/videos \
  nesto-cypress-tests:latest
```

### Running tests on local machine

#### Prerequisite
* Node.js (version 14 or higher is recommended)
Check with: node -v

* npm (comes with Node.js) or yarn
Check with: npm -v or yarn -v

* Cypress installed
Install with:
```bash
npm install cypress --save-dev
```

* Supported browser (Cypress comes with Electron, but you can use Chrome, Edge, Firefox, etc.)

#### Install dependencies
```bash
npm ci
```

### Run Tests
Headed (interactive):
```bash
npx cypress open
```

Headless (CI-friendly):
```bash
npx cypress run
```

#### Format code
```bash
npx prettier --write "cypress/**/*.{ts,js}"
```
#### Check style
```bash
npm run lint
```

### Test Result Reporting
* Mochawesome is used for test report generation and HTML and JSON test reports are stored inside folder cypress/reports/mochawesome
* Videos are under cypress/videos
* Screenshots are under cypress/screenshots

### Tech Stack
* Cypress
* TypeScript
* Page Object Model
* CI-ready with Jenkinsfile

### Security
Using environment variables username and password for credentials

### Maintainers
Priyanka Joshi