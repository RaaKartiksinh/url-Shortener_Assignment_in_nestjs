
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## system requirements

 - [ Install Node js](https://nodejs.org/en)
 - [ Install mongodb](https://www.mongodb.com/docs/manual/installation/)
 

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## Quick Startt
your back end start on 
```bash
http://localhost:3000/

```

## Routes and payload

- #### Add user
```bash
Route :
  http://localhost:3000/auth/signup  Or
   http://localhost:3000/auth/login

payload:
   {
     "name":"demo",
     "email": "demo@gmail.com",
     "password": "123456"
   }

```
In response you
You will get a token and you have to save the token.


- #### set Headers
```bash
 set Headers : 
   key     Authorization
   value   Bearer <Your_Token>
  
  Note : Bearer<Space><Your_Token>
```

- #### Create short url
  set header and you access this route
```base
 Route :
   http://localhost:3000/urlshort/add

 payload:
     {
      "user_id": "65f422687f3f25fd70c4f436",
       "original_urlame": "https://www.google.com/search?q=om&oq=om&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQIxgnMgwIAhAjGCcYgAQYigUyCggDEAAYsQMYgAQyEwgEEC4YgwEYxwEYsQMY0QMYgAQyCggFEAAYsQMYgAQyCggGEAAYsQMYgAQyBggHEEUYPNIBBzQxMmowajeoAgCwAgA&sourceid=chrome&ie=UTF-8"
    }
```


- #### get short url
  set header and you access this route
```base
 Route :
   http://localhost:3000/g/<your_Rendom_String>

``` 
  search this url automatically redirect to Original url

  - #### Get user all url

When the user wants to see his full URL then he will go to this route
  ```base
   Route:
     http://localhost:3000/usershorturl/<mongoose_UserId>
   example:
     http://localhost:3000/usershorturl/65f422687f3f25fd70c4f436
  ```

  - #### Analytics
  ```base
  Route:
    http://localhost:3000/analytics/get/<mongoose_shorten_url_id>?startTime=<Start_Time>&endTime=<End_Time>
example:
    http://localhost:3000/analytics/get/65f684882cbd881037eb7d73?startTime=2024-03-17T00:00:00&endTime=2024-03-17T23:59
  ```
  - ## project description
  - I don't know how to make nest Js project, but I have made one for the first time Therefore there are many flaws in it.
  - I'm using Nest.js with MongoDB as my database, and I'm leveraging Mongoose (an ODM library) for managing data. Plus, I'm implementing caching using cache-manager to boost performance.

  - #### project requirements :-
     -Implement shortening algorithms optimized for efficient storage and retrieval, capable of handling high volumes of requests with minimal latency at scale.

- i make a three collection 
  -     1. user         {
                         name :"ram",
                         email :"ram@gmail.com",
                         password :<bcrypt>
                         }
     this collection is simpal

  -     2. urlshoters    {
                          original_urlame :<Original URl >,
                          shorten_url "KHwMdtz",   // b62 to generate random string
                         expiry_date : mongodb ttl time for auto delet in 2 years,
                         }
 
- shorten_url :
  The `urlshorters` collection stores original URLs, corresponding shortened URLs generated using base62 encoding, and expiry dates for automatic deletion after 2 years. When a user creates a shortened URL, a random string is generated using base62 encoding. This string is then used as the shortened URL. 

  When a request is made with a shortened URL, the application searches the `urlshorters` collection for the corresponding document. If a match is found, the original URL is retrieved, and the user is redirected to the specified website.


      3. urlshoters                  {
                          userId :<userId >,
                          shorten_url_id <short Id >,  
                         browser :  <browser Name>,
                         isMobile: <Boolian>
                         time:< time to create data>
                    }

 -  Every time a request is made with a shortened URL, the application creates a new document in the `urlshorters` collection to record the redirect request for historical purposes. This allows for tracking of usage and analytics related to the shortened URLs

 -  The analytics result gives an array of lists. I filter and count the total clicks by taking the length of the array. I determine whether the device is mobile (true) or desktop (false) to understand which devices are being used for the search. Lastly, I iterate through the array to create an object containing the browser names and increment the count of each browser by one.



 - ### cache-manager like redis:
  - frist request find data for mongo database and store data in to ram 
  this data expri time is 1 Day and automatic renove for ram 
  i am not remon this ` Backend ren make Memori lick` to ram is full
  and second resqusr response to cache 