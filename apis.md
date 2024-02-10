# API Documentation

## Overview

The Library Management System API provides a way to manage library operations, including handling books, managing users, and tracking book loans. This RESTful API allows for operations such as adding new books, updating book information, registering users, and checking in and out books.

## Base URL

http://localhost:3000/api

The port can be changed by changing the port environment variable.

## Headers

All requests should include the Content-Type header set to application/json.

## Endpoints

### Books

#### List All Books (Unpaginated)

GET /books/all

Query Parameters: </br>
Supports filtering by title, author_name, and ISBN based on regex pattern.

```
{
   title: String, optional.
   ISBN: String, optional,
   author_name: String, optional.
}
```

Success Response: 200 OK with an array of books.

```
[
    {
        id: String,
        title: String,
        ISBN: String,
        author_name: String,
        available_quantity: Integer,
        shelf_location:  String,
    }
]
```

#### List Books (Paginated)

GET /books

Query Parameters: </br>
page: Required, integer, must be >= 1.
pageSize: Required, integer, must be >= 1.
Supports optional filtering by title, author_name, and ISBN.

```
{
   title: String, optional.
   ISBN: String, optional,
   author_name: String, optional.
   page: Integer, required.
   pageSize: Integer, required.
}
```

Success Response: 200 OK with an array of books within the specified page.

```
[
    {
        id: String,
        title: String,
        ISBN: String,
        author_name: String,
        available_quantity: Integer,
        shelf_location:  String,
    }
]
```

#### Create a New Book

POST /books

Request Body (required): <br/>

```
{
    title: String, required.
    ISBN: String, required, must match the ISBN regex pattern.
    available_quantity: Integer, required.
    shelf_location: String, required.
    author_name: String, required.
}
```

Success Response: 201 Created with the created book object.

```
{
    id: String,
    title: String,
    ISBN: String,
    available_quantity: Integer,
    shelf_location: String,
    author_name: String,
}
```

#### Get a Book by ID

GET /books/:id

URL Parameters: id (UUID of the book)

Success Response: 200 OK with the book object.

```
{
    id: String,
    title: String,
    ISBN: String,
    available_quantity: Integer,
    shelf_location: String,
    author_name: String,
}
```

#### Update a Book by ID

PUT /books/:id

URL Parameters: id (UUID of the book)

Request Body (optional fields): <br/>

```
{
    title: String, optional.
    ISBN: String, optional, must match the ISBN regex pattern.
    available_quantity: Integer, optional.shelf_location: String, optional.
    author_name: String, optional.
}
```

Success Response: 204 No Content with no body.
parameters validatio

#### Delete a Book by ID

DELETE /books/:id

URL Parameters: id (UUID of the book)

Success Response: 204 No Content with no body.
validation fails

### Clients (Borrowers)

#### List All Clients (Unpaginated)

Endpoint: GET /clients/all

Description: Retrieves all client records without pagination.

Parameters: None

Success Response: 200 OK with an array of client objects.

```
[
    {
        id: String,
        name: String,
        email: String,
        registeredAt: Date

    }
]
```

### List Clients (Paginated)

Endpoint: GET /clients

Description: Retrieves clients with pagination.

Query Parameters: <br/>
page: Required, integer, specifies the page number.
pageSize: Required, integer, specifies the number of records per page.

```
{
   page: Integer, required.
   pageSize: Integer, required.
}
```

Success Response: 200 OK with an array of paginated client objects.

```
[
    {
        id: String,
        name: String,
        email: String,
        registeredAt: Date

    }
]
```

### Create a New Client

Endpoint: POST /clients

Description: Creates a new client record.

Request Body:

```
{
  name: String, required.
  email: String, required.
}
```

Success Response: 201 Created with the created client object.

```
{
    id: String,
    name: String,
    email: String,
    registeredAt: Date

}
```

### Get a Client by ID

Endpoint: GET /clients/:id

Description: Retrieves a specific client by their UUID.

URL Parameters: id: The UUID of the client.

Success Response: 200 OK with the client object.

```
{
    id: String,
    name: String,
    email: String,
    registeredAt: Date

}
```

#### Update a Client by ID

Endpoint: PUT /clients/:id

Description: Updates an existing client record by UUID.

URL Parameters: id: The UUID of the client.

Request Body:

```
{
  name: String, optional.
  email: String, optional.
}
```

Success Response: 200 OK with the updated client object.

```
{
    id: String,
    name: String,
    email: String,
    registeredAt: Date

}
```

### Delete a Client by ID

Endpoint: DELETE /clients/:id

Description: Deletes a specific client by their UUID.

URL Parameters:
id: The UUID of the client.

Success Response: 200 OK with the deleted client object.

```
{
    id: String,
    name: String,
    email: String,
    registeredAt: Date

}
```

### Borrowing

### List All Borrowing Records (Unpaginated)

Endpoint: GET /borrowing/all

Description: Retrieves all borrowing records without pagination.

Parameters: None

Success Response: 200 OK with an array of borrowing records.

```
[
    {
        id: String,

        book: {
        id: String,
        title: String,
        ISBN: String,
        author_name: String,
        available_quantity: Integer,
        shelf_location:  String,
        },

        clients: {
            id: String,
            name: String,
            email: String,
            registeredAt: String
        },

        borrowedAt: Date,
        returnedAt: Date,
        dueDate: Date,
        status: String,
    }
]
```

### List All Borrowing Records (Paginated)

Endpoint: GET /borrowing

Description: Retrieves borrowing records with pagination.

Query Parameters:
page: Required, integer, specifies the page number.
pageSize: Required, integer, specifies the number of records per page.

```
{
    page: Integer, required.
    pageSize: Integer, required.
}

```

Success Response: 200 OK with an array of paginated borrowing records.

```

[
    {
        id: String,

        book: {
        id: String,
        title: String,
        ISBN: String,
        author_name: String,
        available_quantity: Integer,
        shelf_location:  String,
        },

        clients: {
            id: String,
            name: String,
            email: String,
            registeredAt: String
        },

        borrowedAt: Date,
        returnedAt: Date,
        dueDate: Date,
        status: String,
    }

]

```

### List Overdue Books

Endpoint: GET /borrowing/overdue-books

Description: Retrieves a list of overdue borrowing records.

Parameters: None

Success Response: 200 OK with an array of overdue borrowing records.

```

[
    {
        id: String,

        book: {
        id: String,
        title: String,
        ISBN: String,
        author_name: String,
        available_quantity: Integer,
        shelf_location:  String,
        },

        clients: {
            id: String,
            name: String,
            email: String,
            registeredAt: String
        },

        borrowedAt: Date,
        returnedAt: Date,
        dueDate: Date,
        status: String,
    }

]

```

### List Borrowed Books by Client ID

Endpoint: GET /borrowing/borrowed-books/:clientId

Description: Retrieves borrowing records for a specific client.

URL Parameters:
clientId: Required, UUID of the client.

Success Response: 200 OK with an array of borrowing records for the specified client.

```

[
    {
        id: String,

        book: {
        id: String,
        title: String,
        ISBN: String,
        author_name: String,
        available_quantity: Integer,
        shelf_location:  String,
        },

        clients: {
            id: String,
            name: String,
            email: String,
            registeredAt: String
        },

        borrowedAt: Date,
        returnedAt: Date,
        dueDate: Date,
        status: String,
    }

]

```

### Check Out a Book

Endpoint: POST /borrowing/checkout

Description: Records a new borrowing event when a client checks out a book.

Request Body:

```

{
    bookId: String, required.
    clientId: String, required.
}

```

Success Response: 201 Created with the created borrowing record.

```

{
    id: String,

    book: {
    id: String,
    title: String,
    ISBN: String,
    author_name: String,
    available_quantity: Integer,
    shelf_location:  String,
    },

    clients: {
        id: String,
        name: String,
        email: String,
        registeredAt: String
    },

    borrowedAt: Date,
    returnedAt: Date,
    dueDate: Date,
    status: String,

}

```

### Return a Book

Endpoint: POST /borrowing/return/:borrowRecordId

Description: Records the return of a borrowed book.

URL Parameters:
borrowRecordId: Required, UUID of the borrowing record.

Success Response: 200 OK with the updated borrowing record marked as returned.

```

{
    id: String,

    book: {
    id: String,
    title: String,
    ISBN: String,
    author_name: String,
    available_quantity: Integer,
    shelf_location:  String,
    },

    clients: {
        id: String,
        name: String,
        email: String,
        registeredAt: String
    },

    borrowedAt: Date,
    returnedAt: Date,
    dueDate: Date,
    status: String,

}

```

## Error Handling

Errors will return a JSON object with an error key describing the nature of the error. For validation errors, a detailed message explaining the validation failure will be provided.

```

{
    error: "Error message here"
}

```

## Validation

Validation is performed using Joi schemas. Ensure request bodies and query parameters conform to the expected formats, especially for fields with regex patterns (like ISBN).
