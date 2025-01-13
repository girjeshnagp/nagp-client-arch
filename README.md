# Insurance Micro-Frontend Application

This is a micro-frontend-based application for an insurance company, built using Angular and Webpack Module Federation. The application consists of a container app and several micro-frontends (MFEs) that provide different functionalities like insurance policy details, premium payments, and more.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [Step 1: Install Dependencies](#step-1-install-dependencies)
  - [Step 2: Serve the Application Locally](#step-2-serve-the-application-locally)
  - [Step 3: Access the Application](#step-3-access-the-application)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [Build the Application](#build-the-application)
- [Contributing](#contributing)

## Technologies Used

- Angular (version 19.0.7)
- Webpack Module Federation
- Node.js (version 22.12.0)
- Sass for styling
- RxJS for reactive programming
- Message Service for notification management
- Micro-Frontend Architecture

## Prerequisites

Ensure that you have the following installed on your system:

- Node.js (version 22.12.0)
- npm (comes with Node.js)
- Angular CLI (version 19.0.7)

### Install Node.js

You can download and install Node.js from the official website: [Node.js Official Website](https://nodejs.org).

To verify that Node.js and npm are installed, you can run the following commands in your terminal:

```bash
node -v
npm -v
```

You should see the version `22.12.0` for Node.js.

### Install Angular CLI

To install Angular CLI globally, use the following command:

```bash
npm install -g @angular/cli@19.0.7
```

## Setup Instructions

### Step 1: Install Dependencies

To set up the project locally, first clone the repository:

```bash
git clone <repository-url>
cd <repository-folder>
```

Then, navigate into the root directory of the container app or any of the micro-frontends and run the following command to install the necessary dependencies:

```bash
npm install
```

This will install all required packages for the project.

Step 2: Serve the Application Locally
The next step is to serve the container application and its micro-frontends. You will need to serve the individual micro-frontends (like insurance-policy-details and insurance-premium-payment) as well.

To serve the container app and micro-frontends, run the following command in each application folder:

```bash
ng serve --open
```

By default, this will serve the application on [http://localhost:4200](http://localhost:4200).

You can also serve each micro-frontend separately if they are configured to run independently. For example:

```bash
cd insurance-container
ng serve --open
```

Repeat the above for each of the micro-frontend directories (`insurance-policy-details`, `insurance-premium-payment`).

### Step 3: Access the Application

Once the applications are running locally, you can open the following URLs in your browser to access them:

- **Container App**: [http://localhost:4200](http://localhost:4200)
- **Micro-Frontends (if served independently)**:
  - Policy Details: [http://localhost:4201](http://localhost:4201)
  - Premium Payment: [http://localhost:4202](http://localhost:4202)

The container app will handle routing and dynamically load the appropriate micro-frontends.

## Running Tests

To run the unit tests for the container app or any micro-frontend, use the following command:

```bash
ng test
```

To run the end-to-end tests:

```bash
Copy code
ng e2e
```

## Build the Application

To build the entire application for production, use:

```bash
ng build --prod
```