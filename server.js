
var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var mongoose = require('mongoose');


app.use(express.static(__dirname+'/client'));

app.use(bodyParser.json());

var port = process.env.PORT || 3000;

Genre =require('./models/genre');

Book =require('./models/book');


mongoose.connect('mongodb://localhost/bookstore');



app.listen(port,function(){
   console.log('our app is running');
});


app.get('/', function(req, res){


	res.send('Please use /api/books or /api/genres');

});



app.get('/api/genres', function(req, res)
{

	Genre.getGenres(function(err, genres)
{
		
if(err)
{

			throw err;
		}


		res.json(genres);
	
	});

});



app.post('/api/genres', function(req, res)
{

	var genre = req.body;
	
Genre.addGenre(genre, function(err, genre)
{

		if(err)
{

			throw err;

		}
	
	res.json(genre);

	});

});


app.put('/api/genres/:_id', function(req, res)
{

	var id = req.params._id;

	var genre = req.body;

	Genre.updateGenre(id, genre, {}, function(err, genre){
	
	if(err)
         {

	throw err;
	
	}
		
res.json(genre);
	
});

});


app.delete('/api/genres/:_id', function(req, res)
{

	var id = req.params._id;
	
Genre.removeGenre(id, function(err, genre)
{
		
      if(err){
		
	throw err;
	
	}
	
	res.json(genre);

	});

});



app.get('/api/books', function(req, res)
{
	
Book.getBooks(function(err, books)
{
		
if(err)
{
			
throw err;
		
}
	
	res.json(books);
	
});

 });



app.get('/api/books/:_id', function(req, res)
{
	
Book.getBookById(req.params._id, function(err, book){
	
	if(err){
		
	throw err;

		}
		
res.json(book);

	});

});


app.post('/api/books', function(req, res){

	var book = req.body;

	Book.addBook(book, function(err, book){
		
if(err){
			
throw err;
		
}

		
res.json(book);

	});

});


app.put('/api/books/:_id', function(req, res){
	var id = req.params._id;
	var book = req.body;
	Book.updateBook(id, book, {}, function(err, book){
		if(err){
			throw err;
		
}

		res.json(book);
	
});

});


app.delete('/api/books/:_id', function(req, res){

	var id = req.params._id;

	Book.removeBook(id, function(err, book){
		
if(err){
	
		throw err;

		}
	
	res.json(book);

	});

});

