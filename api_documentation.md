# API Documentation

**Base URL**: `http://localhost:5000/api/v1`

---

## 🔐 Auth Module

### Login
*   **Method**: `POST`
*   **Endpoint**: `/auth/login`
*   **Request Type**: `JSON`
*   **Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "yourpassword"
    }
    ```

---

## 👤 User Module

### Create Patient
*   **Method**: `POST`
*   **Endpoint**: `/user/create-patient`
*   **Request Type**: `form-data`
*   **Auth Required**: None (Public)
*   **Form Data Keys**:
    *   `data`: (JSON string)
        ```json
        {
          "password": "yourpassword",
          "patient": {
            "name": "Full Name",
            "email": "patient@example.com",
            "address": "Optional Address"
          }
        }
        ```
    *   `file`: (Optional) Image file for profile photo.

### Create Admin
*   **Method**: `POST`
*   **Endpoint**: `/user/create-admin`
*   **Request Type**: `form-data`
*   **Auth Required**: **ADMIN** (Bearer Token)
*   **Form Data Keys**:
    *   `data`: (JSON string)
        ```json
        {
          "password": "yourpassword",
          "admin": {
            "name": "Admin Name",
            "email": "admin@example.com",
            "contactNumber": "01700000000"
          }
        }
        ```
    *   `file`: (Optional) Image file for profile photo.

### Create Doctor
*   **Method**: `POST`
*   **Endpoint**: `/user/create-doctor`
*   **Request Type**: `form-data`
*   **Auth Required**: **ADMIN** (Bearer Token)
*   **Form Data Keys**:
    *   `data`: (JSON string)
        ```json
        {
          "password": "yourpassword",
          "doctor": {
            "name": "Doctor Name",
            "email": "doctor@example.com",
            "contactNumber": "01700000000",
            "address": "Dhaka, Bangladesh",
            "registrationNumber": "REG123456",
            "experience": 5,
            "gender": "MALE", // MALE | FEMALE | OTHER
            "appointmentFee": 1000,
            "qualification": "MBBS, FCPS",
            "designation": "Senior Consultant",
            "currentWorkingPlace": "Optional"
          }
        }
        ```
    *   `file`: (Optional) Image file for profile photo.

### Get All Users
*   **Method**: `GET`
*   **Endpoint**: `/user`
*   **Auth Required**: **ADMIN** (Bearer Token)
*   **Query Params**: `searchTerm`, `role`, `status`, `page`, `limit`, `sortBy`, `sortOrder`.

---

## 👨‍⚕️ Doctor Module

### Create Doctor (Direct)
*   **Method**: `POST`
*   **Endpoint**: `/doctor/create-doctor`
*   **Request Type**: `form-data`
*   Same data structure as `User Module -> Create Doctor`.

---

## 🛠️ Admin Module

### Create Admin (Direct)
*   **Method**: `POST`
*   **Endpoint**: `/admin/create-admin`
*   **Request Type**: `form-data`
*   Same data structure as `User Module -> Create Admin`.
