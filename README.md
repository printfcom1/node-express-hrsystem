# System HR API

This API service provides endpoints for managing employee data in a human resources system.

## Installation

- Clone the repository: `git clone https://github.com/printfcom1/HRsystem.git`
- Install dependencies: `npm install`

## Usage

- Start the server: `npm start`
- Access the API endpoints using a tool like Postman or cURL.

## API Endpoints

- `POST /systemHR/GetPassword`: Retrieves the password for a user.
- `GET /systemHR/GetDataEmployeeAll`: Retrieves data for all employees (requires authentication).
- `GET /systemHR/GetDataEmployee/:employee_id/:name`: Retrieves data for a specific employee (requires authentication).
- `DELETE /systemHR/DeleteDataEmployee`: Deletes employee data (requires authentication).
- `POST /systemHR/AddDataEmployee`: Adds new employee data (requires authentication).
- `PUT /systemHR/UpdateDataEmployee`: Updates existing employee data (requires authentication).

## Authentication

This API uses authentication middleware to protect certain endpoints. To access the protected endpoints, include a valid authentication token in the request headers.

## postman link

https://api.postman.com/collections/17387376-5b7cf85f-ef85-49fa-a4d6-009855f63f23?access_key=PMAT-01H52G0GW2RY3ND5EY5KWS9774
