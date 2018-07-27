URl
POST Request for user registration :'/user/register'

Header 
Content-Type   application/json

body
{
	"email":"avinash7124@gmail.com", // uniqe 
    "password": "Avksing929",
    "username": "Avinash",
    "contactno":["8122775581"]
}



POST Request for login : '/user/login'

Header 
Content-Type   application/json

body
{
	"email":"avinash7124@gmail.com",
    "password": "Avksing929"
 }

POST Request:to update user '/user/update

Header 
Authorization   Barear <JWT Token>
Content-Type   application/json

body
{
	"username": "Avinash singh",
    "contactno":["8122775581"],
    "address":"c2 BtM  hhh 2nd stage"
}