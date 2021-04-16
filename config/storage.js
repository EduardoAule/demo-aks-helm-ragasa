module.exports = {
    AZURE_STORAGE_ACCOUNT: process.env.AZURE_STORAGE_ACCOUNT || "STORAGE_NAME",
    AZURE_STORAGE_ACCESS_KEY: process.env.AZURE_STORAGE_ACCESS_KEY || "TU-ACCESS-KEY",
    CONTAINER: process.env.CONTAINER || "CONTAINER-NAME",
    FILENAME: process.env.FILENAME || "productos_wms.csv",
    PATH_FILENAME: process.env.PATH_FILENAME || "inventario/productos_wms.csv",
}
