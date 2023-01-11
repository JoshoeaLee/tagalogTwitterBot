//Import MongoDB
const MongoClient = require('mongodb').MongoClient;
const DATABASE_URI = "mongodb+srv://dbUser:eWZMkKGjIBzmjsmT@tagalogdb.i0lneoz.mongodb.net/?retryWrites=true&w=majority";

//Import Twitter API
const {TwitterApi} = require('twitter-api-v2');


/**
 * @returns Twitter Client which can be used to tweet things on twitter
 */
 function getTwitterClient(){
    const twitterClient =  new TwitterApi({
        appKey: "ATdLxlnfLXI6PgtvoEBSGMGrH",
        appSecret: "7peTYT3g17h5DweQbX9nPrsAIhRNuTkSu01hcsPjpPak7FHVEo",
        accessToken: "1609798675974488066-F6jwEVKCda8kmjmtg0mtWR5SnIjF7C",
        accessSecret: "4si05Qd7duCVqhk1PWvWqIObZ0rKMe6t7wnUeEkkVobQI"
    })
    
    //Make the twitterClient into one which read and writes
    const rwClient =  twitterClient.readWrite
    
    return rwClient;

}


/**
 * @returns The Tagalog word of the day to tweet out
 */
async function getWord(){

console.log('testing');

//Connect to my MongoDB database
const client = await MongoClient.connect(DATABASE_URI);
//Specifying database and collection
const collection =  client.db("test").collection("words");

//Get current date
//https://stackoverflow.com/questions/8559147/how-can-i-get-date-in-application-run-by-node-js
var todaysDate = new Date();
const dateString = todaysDate.toISOString().slice(0,10);

//Get specific word
const wordy = await collection.findOne({wordDate: dateString});
    
client.close();
return wordy;
}

async function tweet(twitterClient, wordOfTheDay){
    try{
        tweetString = `Hey @joshoealee\nToday's tagalog word of the day is ${wordOfTheDay.tagalog}\nMeaning: ${wordOfTheDay.english}\nExample:${wordOfTheDay.exampleSentence}\n\nText mum and wear sunscreen.`


        await twitterClient.v2.tweet(tweetString);
        twitterClient.close();
       
    }catch(e){
        console.error(e)
    }
}

//Commit

exports.handler = async (event, context) =>{

    //Yeah I need to look this up
    context.callbackWaitsForEmptyEventLoop = false;

    const wordToTweet = await getWord();
    const twitClient = getTwitterClient();
    await tweet(twitClient, wordToTweet);

    const response = {
        statusCode: 200,
        body: "Tweet tweeted"
    };

    return response;
}