const fs = require('fs'); // filesystem
const csvr = require('csv-parser')

class ParserCSV {

	constructor(){
		
	}

	//segunda forma con parser-csv
	async parserCSV(filepath){
		let products=[];
		let i = 0;
		let promise = new Promise((resolve, reject) =>{
			fs.createReadStream(filepath)
			.pipe(csvr())
			.on('data', (data) => products.push(data))
			.on('end', () => {
				//console.log(users);
				resolve(products);
			});
		});

		return promise;

	}
	// Generar el JSON a enviar a Rabbit a partir del JSON Productos
	async parserJsonRabbit(jsonProducts) {
		/*let jsonRabbit =  {
			"header":{
		  	  "applicationId":"3"
			},
			"collection":[]
		};*/
		let jsonCollectionList = {
			"collection":[]
		};
		let jsonCollection = {
			"data":{
			  "company":"2992",
			  "item":"999",
			  "sku":811840,
			  "warehouse":"1",
			  "transaction_datetime":"2020-12-16 18:06:49.288+00",
			  "qty":"0",
			  "location":"MX",
			  "transaction_code":"1"
			}
		};
		
		// Actualizando valores a data
		for(let i=0; i<jsonProducts.length; i++) {
			jsonCollection = {
				"data":{
				  "company":"",
				  "item":"999",
				  "sku":0,
				  "warehouse":"1",
				  "transaction_datetime":"2020-12-16 18:06:49.288+00",
				  "qty":"0",
				  "location":"MX",
				  "transaction_code":"1"
				}
			};
			jsonCollection.data.company = jsonProducts[i].storeid;
			jsonCollection.data.sku = jsonProducts[i].sku;
			jsonCollection.data.transaction_code = jsonProducts[i].status;
			let local_datetime = await this.getDateTime();
			jsonCollection.data.transaction_datetime = local_datetime;
			// Agregando al array Collection
			jsonCollectionList.collection.push(jsonCollection);
			
			// console.log("jsonCollection:", jsonCollection);
		}
		
		return jsonCollectionList;
	}

	async getDateTime() {
		// new Date object
		let date_ob = new Date();
		//console.log("Date:",date_ob);
		// current date
		// adjust 0 before single digit date
		let date = ("0" + date_ob.getDate()).slice(-2);
		// current month
		let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
		// current year
		let year = date_ob.getFullYear();
		// current hours
		let hours = ("0" + (date_ob.getHours() )).slice(-2);
		// current minutes
		let minutes = ("0" + (date_ob.getMinutes() )).slice(-2);
		// current seconds
		let seconds = ("0" + (date_ob.getSeconds() )).slice(-2);
		// current mili
		let millis = date_ob.getMilliseconds();

		let local = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds +"."+millis+"+00";

		return local;
	}

}module.exports.ParserCSV = ParserCSV;