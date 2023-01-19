# tagalogTwitterBot

A program in Node.js which retrieves data from a MongoDB database I've deployed and created a RESTful API(Express.js) for. 

It then uses the Twitter API and AWS Lambda to tweet me a new word in Tagalog from the database everyday at a specific time.

Whilst I could have used the GET by date method I had in my API (shown within the code), I decided to just directly
hook up my MongoDB database to my Lambda function because I found it to be quicker which made testing easier.

Technologies Used include : MongoDB, Express.js, Node.js, AWS Lambda, Amazon CloudWatch Events, 3rd Party API

Check it out : https://twitter.com/JoshTagalogBot 

<img width="598" alt="Screenshot 2023-01-19 at 11 21 34 PM" src="https://user-images.githubusercontent.com/114985386/213417280-bde8ae72-e686-4aac-a869-e320f159e72e.png">
