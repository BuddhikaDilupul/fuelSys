
## API Reference

#### Get all items

```http
  GET /api/employees/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-------` | `-------` | ** return all employees **|

#### Get employee data

```http
  GET /api/employee/${empid}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of employee to fetch |


#### POST employee data

```http
  POST /api/employee/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| :-------  | `string` | **Required**.                     |


#### Update employee data

```http
  PUT /api/employee/${empid}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | Required.Id of employee to update |


#### Delete employee data

```http
  DELETE /api/employee/${empid}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | Required.Id of employee to Delete |



## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`MONGO_URL`
