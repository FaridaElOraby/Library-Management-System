# Library Management System

This is a simple library management system designed and implemented to manage books and borrowers. The system allows you to perform various actions such as adding books, updating book details, deleting books, listing all books, listing books paginated, searching for books, registering borrowers, updating borrower details, deleting borrowers, and managing the borrowing process.

## Functional Requirements

### Books

Add a book: You can add a book to the system by providing details such as title, author name, ISBN, available quantity, and shelf location.

Update a book: The system allows you to update the details of a book, such as modifying the title, author name, ISBN, available quantity, or shelf location.

Delete a book: You have the option to delete a book from the system if it is no longer needed.

List all books unpaginated: The system provides a functionality to list all the books available in the library. The list can be filtered by title, author name, and/or ISBN.

List all books paginated: The system provides a functionality to list all the books available in the library paginated for better scalability and performance. The list can be filtered by title, author name, and/or ISBN.

Search for a book by id: You can search for a book by its id to quickly find the desired book.

### Clients (Borrowers)

Register a client: You can register a client by providing basic details such as name and email.

Update client's details: The system allows you to update the details of a client, such as modifying their name or email.

Delete a client: You have the option to delete a client from the system if needed.

List all clients unpaginated: The system provides a functionality to list all the registered clients unpaginated.

List all clients paginated: The system provides a functionality to list all the registered clients paginated for better scalability and performance.

### Borrowing Process

Borrowing a book (Check out a book): Clients can check out a book from the library. The system keeps track of which books are checked out and by whom.

Return a book: Clients can return a book they have borrowed. Once returned, the book becomes available for other clients.

View borrowed books: Clients can view the books they currently have checked out.

Track due dates: The system keeps track of due dates for borrowed books and provides a list of books that are overdue.

List all borrowed books with history unpaginated: The system provides a functionality to list all the borrowed books' history from the start of the system until now unpaged.

List all borrowed books with history: The system provides a functionality to list all the borrowed books' history from the start of the system until now paginated for better scalability and performance.

## Technologies Used

This library management system is implemented using the following technologies:

Backend Framework: Node.js
Database: Postgres
ORM (Object-Relational Mapping): Sequelize
Validation and Sanitization: Joi

## Installation and Setup

To run this library management system locally, follow these steps:

1. Clone the repository: git clone https://github.com/FaridaElOraby/Library-Management-System.git
2. Install the dependencies: npm install
3. Create a new Postgres database and update the database configuration by replacing the connection string in the .env file.
4. Start the application: npm start; the server runs on port 3000 and can be changed by replacing the port in the .env file.
5. Make sure you have Node.js and Postgres installed on your machine before proceeding with the installation.

## API Reference

The API endpoints for interacting with the library management system are as follows:

### Books

GET /books/all: Get a list of all books unpaged.
GET /books/all: Get a list of all books paginated.
POST /books: Add a new book.
GET /books/:id: Get details of a specific book.
PUT /books/:id: Update details of a specific book.
DELETE /books/:id: Delete a specific book.

### Clients

GET /clients/all: Get a list of all clients unpaged.
GET /clients: Get a list of all clients paginated.
POST /clients: Register a new client.
GET /clients/:id: Get details of a specific client.
PUT /clients/:id: Update details of a specific client.
DELETE /clients/:id: Delete a specific client.

### Borrowing Process

GET /clients/all: Get a list of the history of all borrowing transactions unpaged.
GET /clients: Get a list of the history of all borrowing transactions paginated.
POST /borrowing/checkout: Check out a book.
POST /borrowing/return/id: Return a specific book by providing the borrowing record id.
GET /borrowing/borrowed-books/:clientId: Get a list of books currently borrowed by a borrower.
GET /borrowing/overdue-books: Get a list of books that are overdue.

Please refer to the API documentation or code implementation for more details on the request/response format and required parameters for each endpoint.
