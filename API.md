# Introduction

This doc describes the working of the backend API for Immersis. Functionalities like logging in, get lyrics, video ID, music permalink are controlled by this API.

# Endpoints

## Authorization endpoints

```http
POST /auth
```

### Request Body

| Parameter       | Type   | Description           |
| :-------------- | :----- | :-------------------- |
| firstName       | string | First Name            |
| lastName        | string | Last Name             |
| email           | string | Email address         |
| password        | string | User Password         |
| confirmPassword | string | Confirm User Password |

```http
POST /auth/login
```

### Request Body

| Parameter | Type   | Description   |
| :-------- | :----- | :------------ |
| email     | string | Email address |
| password  | string | User Password |

```http
GET /auth/logout
```

### Request Body

Null

```http
GET /auth/loggedin
```

### Request Body

Null

```http
POST /auth/forgot
```

### Request Body

| Parameter | Type   | Description   |
| :-------- | :----- | :------------ |
| email     | string | Email address |

```http
POST /auth/reset/:token
```

### Request Body

| Parameter | Type   | Description  |
| :-------- | :----- | :----------- |
| password  | string | New Password |

## Authorization Responses

| Status Code | Description             |
| :---------- | :---------------------- |
| 200         | `OK`                    |
| 400         | `BAD REQUEST`           |
| 403         | `Invalid CSRF`          |
| 500         | `INTERNAL SERVER ERROR` |

## Resource endpoints

```http
GET /resource/search
```

### Request Body

| Parameter | Type   | Description  |
| :-------- | :----- | :----------- |
| q         | string | search query |

```http
GET /resource/lyrics
```

### Request Body

| Parameter | Type   | Description    |
| :-------- | :----- | :------------- |
| title     | string | title of song  |
| artist    | string | artist of song |

```http
GET /resource/audio
```

### Request Body

| Parameter | Type   | Description    |
| :-------- | :----- | :------------- |
| title     | string | title of song  |
| artist    | string | artist of song |

```http
GET /resource/video
```

### Request Body

| Parameter | Type   | Description  |
| :-------- | :----- | :----------- |
| q         | string | search query |

```http
GET /resource/searchHistory
```

### Request Body

Null

## Resource Responses

| Status Code | Description             |
| :---------- | :---------------------- |
| 200         | `OK`                    |
| 500         | `INTERNAL SERVER ERROR` |
