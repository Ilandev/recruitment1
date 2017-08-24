let express = require('express');
let app = express();
let path = require('path');
let ejs = require('ejs');
let request = require('request');
app.listen('3500',()=>{
	console.log('server started');
	
});


app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
//app.engine('html',require('ejs').renderFile)


app.get('/character/:name',(req,res)=>{
	var fetchNames = function(cb){
	request('https://swapi.co/api/people/',function(err,resp,body){
		var obj = JSON.parse(body)
		var obj1 = {};
		for(i in obj.results)
		{
			console.log(obj.results[i].name);
			if(obj.results[i].name.toString().toLowerCase().indexOf(req.param('name')) != -1)
			{
					//res.end('ggg'+JSON.stringify(obj.results[i]));	
					obj1 = obj.results[i];
					cb(obj1);
					
			}
		}
		
	})
	}
	fetchNames(function(obbb){
		var arr = [];
		arr.push(obbb)
		console.log('dsdds')
		console.log(arr)
		console.log('dsdds')
		res.render('home.ejs', { people: arr })
	})
});


app.get('/characters',(req,res)=>{
	var fetchNames = function(cb){
	request('https://swapi.co/api/people/',function(err,resp,body){
		var obj = JSON.parse(body)
		
		if(req.param('sort') == 'mass')
		obj.results.sort(function(a,b){return parseInt(a.mass)-parseInt(b.mass)})
		else if(req.param('sort') == 'height')
			obj.results.sort(function(a,b){return parseInt(a.height)-parseInt(b.height)})
		else if(req.param('sort') == 'name')
			obj.results.sort(function(a,b){return a.name > b.name})
		cb(obj.results)
	})
	}
	fetchNames(function(obbb){
		var arr = [];
		arr.push(obbb)
		console.log('dsdds')
		console.log(arr)
		console.log('dsdds')
		res.render('home.ejs', { people: obbb })
	})
})

app.get('/planets',(req,res)=>{
	var planetDetails = {}'
	var async  = require('async');
	var fetchNames = function(cb1){
		
	request('https://swapi.co/api/planets/',function(err,resp,body){
		var obj = JSON.parse(body)
		var func = function(planet,cb)
		{
			
			var residents = function(resident,cb2)
			{
				request(resident,function(err,resp,body){
					if(err)
						cb2(null);
					else{
						var resid = JSON.parse(body);
						
					}
				})
				
			}
			async.eachSeries(planet.residents,residents,function(err){
				
			})
			
			cb(null);
		}
		async.eachSeries(obj.results,func,function(err){
			
		cb1(obj.results)	
		})
		
	})
	}
	fetchNames(function(obbb){
		var arr = [];
		arr.push(obbb)
	
		res.render('home.ejs', { people: obbb })
	})
})