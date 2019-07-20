**Note: Before run this app please make sure MongoDB server is running.

1. Clone this repo and then open CMD and go to root folder and run 'npm install' to download dependencies.
2. run 'node index.js' to start the node server
3. after start server open postman or any other rest api test tool
4. To read and save data in mongodb use below api
    URL: http://localhost:8080/api/readCsv
    METHOD: GET

5. User Registration
    URL: http://localhost:8080/api/user/register
    METHOD: POST
    REQUEST:
        {
            "userid":"test",
            "password":"test"
        }


6. User login
    URL: http://localhost:8080/api/user/login
    METHOD: POST
    REQUEST:{
            "userid":"test",
            "password":"test"
        }

7. Fetch Records 
    URL: http://localhost:8080/api/fetchRows/:skip/:limit
    METHOD:GET
    REQUEST HEADERS:{
        authorization: "Bearer <Paste authorization token which you got after login>"
    }

8. Fetch records with filter 
    URL : http://localhost:8080/api/fetchRows/:skip/:limit?country=:country&&region=:region
    METHOD:GET
     REQUEST HEADERS:{
        authorization: "Bearer <Paste authorization token which you got after login>"
    }
