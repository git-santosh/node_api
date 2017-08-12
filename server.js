var fs = require('fs');
var axios = require('axios');
var express = require('express');
var path = require('path');
const app = express();

app.use(express.static('images')); 
app.set('port', process.env.PORT || 3000);
console.log(path.join(__dirname+'/index.html'));
app.get('/',function(req,res){
	res.sendFile(path.join(__dirname+'/index.html'));
}) 
app.get('/bookmark',function(req,res){
axios.get('http://devapi.saved.io/bookmarks',{
params:{
	devkey:'N0VhworuxO2WnRqbgutaOb5l876VTNEn',
    key:'VC1NclDbCyYWIzspXcVyI8KDTnAEiT3N',
    limit:5
}
}).then(function(response){
    //console.log(generateSuccessOutput(res));
    var json = generateSuccessOutput(response);
	res.json({'html':json});
	}).catch(function(Error){
        console.log('Error');
		res.json({'html':generateErrorOutput(Error)});
		
	});
})
app.listen(app.get('port'),function(){
    console.log('Express is running on http://localhost/'+app.get('port'));
});

function generateSuccessOutput(res){
    return '<h4> Result </h4>' +
    '<h5> Status </h5>' + '<pre>'+ res.status + ' ' + res.statusText  + '</pre>' +
    '<h5> Header </h5>' +
    '<pre>'+JSON.stringify(res.headers ,null ,'\t') +'</pre>'+
    '<h5> Data </h5>' +'<pre>'  + JSON.stringify(res.data ,null ,'\t') + '</pre>';
}
function generateErrorOutput(err){
    return '<h4> Result </h4>' +
    '<h5> Status </h5>' +'<pre>'+err.message + '</pre>' +
    '<h5> Status </h5>' + '<pre>'+ err.response.status + ' ' + err.response.statusText  + '</pre>' +
    '<h5> Header </h5>' +
    '<pre>'+JSON.stringify(err.response.headers ,null ,'\t') +'</pre>'+
    '<h5> Data </h5>' +'<pre>'  + JSON.stringify(err.response.data ,null ,'\t') + '</pre>';
}