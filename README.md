# onboarding

## Objectives: 
The main objective of this repository is to write code for ***Voucher Management System*** using `Node.js, Express.js, React and Mysql for DB and Objection as ORM`. Voucher Management System main objective is to take vouchers from the company and give the vouchers to the users(one per user).

## Entities:
- Company: This contrains the company details
- Vochers: All the vouchers and each voucher is having a Foreign Key which is reference to the Company
- User: User schema having the details of the users.
- RedeemedBy: This contains two Foreign key, 1) user who redeemed it 2) voucher which was redeemed by the user

## Functional Requirements:

### User Management:
- User roles and permissions management (admin, manager, staff, etc.).
- User authentication and authorization.

### Voucher Creation(Only admin users):
- Ability to create various types of vouchers


## Non - Function Requirements:

### Security:
- **User Authentication:** Define authentication mechanisms for users and administrators.
- **Data Security:** Ensure that voucher data is encrypted and protected from unauthorized access and the hashing of the passwords. 

### Usability:
- **User Interface Design:** Ensure a user-friendly and intuitive interface for both administrators and end-users.
- **Proper Message:** Proper error messages or proper warning 

