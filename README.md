# Salesforce Home Task

## Introduction

This repository contains the solutions for a Salesforce assignment. The solution consists two Lightning Web Components (LWC) and a few custom Apex classes that works with the components.

## Components

### 1. caseActivityLog

- **Description:** A Custom LWC component that renders a list of every change that has been occurred on a specific Case
- **Purpose:** Tracking changed made to a Case.
- **Usage:** Navigate to the Case List view, Select a Case and open its record page, there you will see the Activity Log componenet. modify the Case from somewhere in that page (Details standard Comp) and it will automatically Refresh the list and show the updated list of activities, when the list grows, max size hits and the component becomes scrollable.

### 2. accountDetails

- **Description:** Another custom LWC component that lets you quickly edit Account fields and associate a contact with the account by checking one of the contacts in the table. the table shows only unassociated contact.
- **Usage:** Navigate to the Account list view, Select an Account out of the list and open its record page, the componenet will appear there, you can modify the fields according to your needs and also mark a contact from the table in that same component that you would like to associate with that account, after submitting you will get a sucess messege indicating that changed has been occured.
- Test- to ensure the contact was indeed associated with that account you can either refresh the page and see that the contact is not appearing in the unassociated contacts table which means it indeed got associated, or execute this SQQL query using the query editor in the developer console inside salesforce: (SELECT Name FROM Contact WHERE AccountId = 'someID') . replace the someId with the actual account Id you wanted the contact to be associated to (easiest way in my opinion is copy and paste the ID from the URL of the Account record page).

## Installation

1. Clone this repository to your local machine.
2. Deploy the Salesforce components to your Salesforce environment using the Salesforce CLI or Salesforce Extension for Visual Studio Code.
3. Navigate to the appropriate Salesforce page to view or interact with the components.

## Author

Dan Yanuka
