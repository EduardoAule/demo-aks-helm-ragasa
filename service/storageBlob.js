const { BlobServiceClient, 
	StorageSharedKeyCredential
} = require('@azure/storage-blob');

const { storage } = require('../config');

// Use StorageSharedKeyCredential with storage account and account key
// StorageSharedKeyCredential is only avaiable in Node.js runtime, not in browsers
const sharedKeyCredential = new StorageSharedKeyCredential(storage.AZURE_STORAGE_ACCOUNT, storage.AZURE_STORAGE_ACCESS_KEY);
const blobServiceClient = new BlobServiceClient(
  `https://${storage.AZURE_STORAGE_ACCOUNT}.blob.core.windows.net`,
  sharedKeyCredential
);
// Create the BlobServiceClient object which will be used to create a container client
const containerClient = blobServiceClient.getContainerClient(storage.CONTAINER);

class StorageBlob {
	constructor() {

    }
    async listBlobs() {
		let i = 1;
		let list_blobs = { "blobs": []};
		// let iter = await blobServiceClient.listContainers();
        // for await (const container of iter) {
        //     console.log(`Container ${i++}: ${container.name}`);
		// }
		let iter = containerClient.listBlobsFlat();
		for await (const blob of iter) {
			// console.log(`Blob ${i++}: ${blob.name}`);
			list_blobs.blobs.push(blob.name);
		}
		// console.log("iter:",iter);
		return list_blobs;
    }

	// filepath: nombre del archivo que tendra la descarga
	async downloadFile(local_filepath, blob_filename) {
		
		const blobClient = containerClient.getBlobClient( blob_filename );
		// Get blob content from position 0 to the end
		// In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
		//Desde el scheduler obtener __dirname y pasar el path de donde se guardara
		// console.log("pathfile:",filepath);
		let downloadBlockBlobResponse = await blobClient.downloadToFile(local_filepath);
		// console.log("Downloaded blob content:", downloadBlockBlobResponse.contentLength);
		
		return downloadBlockBlobResponse.contentLength;

	}

	async deleteBlob(filename) {
		
		const blobClient = containerClient.getBlobClient(filename);
		//let res = await containerClient.deleteBlob(storage.FILENAME);
		let res = await blobClient.deleteIfExists();
		
		return res;
	}

	async createSubdir(){
		const content = "Eduardo y Valeria";
  		const contentByteLength = Buffer.byteLength(content);
		let blobName = "prefix2/";

		let blockBlobClient = containerClient.getBlockBlobClient(blobName);
		let uploadBlobResponse = await blockBlobClient.upload(content, contentByteLength);
		console.log(`Uploaded block blob ${blobName} successfully`, uploadBlobResponse.requestId);

		return uploadBlobResponse;
	}

} module.exports.StorageBlob = StorageBlob;

