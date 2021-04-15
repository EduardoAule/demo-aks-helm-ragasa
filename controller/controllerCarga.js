const { StorageBlob } = require("../service/storageBlob.js");
const sblob = new StorageBlob();


class ControllerCarga {

	constructor(){}
	
	async readStorage() {
		let res = await sblob.listBlobs();
		console.log(res);
				
		return res;
	}
	
	async createSubdir(){
		let res = await sblob.createSubdir();
		console.log(res);
		return res;
	}

}
module.exports.ControllerCarga = ControllerCarga;