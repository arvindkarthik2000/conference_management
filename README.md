 # Arvind Karthik
 # axk0231@mavs.uta.edu

#  Conference Management System

This is a **Conference Management System** built using **React** and **Nextjs**. Follow the steps below to set up and run the project.

---

## Prerequisites

Ensure you have the following installed:

- **Node.js** 
- **npm** (comes with Node.js)

---

## Steps
 
1. Install Dependencies
    Use npm to install the required packages:
    npm ci

2. Running the Project
    Run the following command:
    npm run dev

3. update db credentials in lib/db.js

4. Access the Application
    Open your browser and visit:
    http://localhost:3000

5. run tables.sql to create all tables

6. run data.sql to insert the data into all the tables.

7. User Login Details
    Signup and login to become a user.

8. Admin Login Details
    signup as admin@gmail.com and set password as admin. then run the following sql query to change admin@gmail.com from user to admin
    update users set is_admin = 1 where email= 'admin@gmail.com';

9. UTA Cloud Hosting Address
    https://axk0231.uta.cloud

