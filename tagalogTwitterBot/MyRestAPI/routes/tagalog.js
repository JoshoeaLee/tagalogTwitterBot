const express = require('express');
const router = express.Router();
const Word = require('../models/word');


//Getting all 
router.get('/', async (req, res) =>{
    try{
        const words = await (await Word.find()).map(
            word => {
                return {
                    tagalog: word.tagalog,
                    english: word.english,
                    exampleSentence: word.exampleSentence
                }
            }
        );
        res.json(words)
    }catch(e){
        res.status(500).json({message: e.message})
    }
})
//Getting One
router.get('/:wordDate', getWord, (req, res) =>{
    res.json(res.word)
})

//Creating One
router.post('/', async (req, res) =>{
    const word = new Word({
        tagalog: req.body.tagalog,
        english: req.body.english,
        wordDate: req.body.wordDate,
        exampleSentence: req.body.exampleSentence
    })

    try{
        const newUser = await word.save();
        res.status(201).json(newUser);

    }catch(e){
        res.status(400).json({message: e.message});
    }
   
})
//Updating One
router.patch('/:wordDate', getWord,  async (req, res) =>{
         
 if(req.body.tagalog != null){
     res.word.tagalog = req.body.tagalog
 }
 if(req.body.english != null){
     res.word.english = req.body.english
 }

 try{
    const newWord = await res.word.save();
    res.json(newWord);
    }catch(e){
    res.status(400).json({message: e.message})
 }
})

//Deleting One
router.delete('/:wordDate', getWord, async (req, res) =>{
    try{
        await res.word.remove();
        res.json({message: "Deleted Word"})
    }catch(e){
        res.status(500).json({ message: e.message})
    }
    
})

async function getWord(req, res, next){
    let word
    try{
        word = await Word.findOne({wordDate: req.params.wordDate})
            if(word==null)
                return res.status(404).json({message: "Cannot find word"});
    }catch(e){
        return res.status(500).json({ message: e.message})
    }

    res.word = word
    next()
}

module.exports = router;