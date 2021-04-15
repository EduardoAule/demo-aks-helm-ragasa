# demo-aks-helm-ragasa
# App Node JS
Aplicación que expone dos endpoints:
/ -> Regresa un status Ok.
/blobs -> Regresa una lista de archivos de un StorageAccount.

# Instalación
Dentro del proyecto:
```
  npm install
```
# Ejecución
```
  npm run dev
```

# Validación
Hacer un GET a url/
Usar Postman o Insomnia:
![Screenshot_20210415_114209](https://user-images.githubusercontent.com/5600076/114913524-e9791e80-9de6-11eb-9670-4fac571b2a79.png)

# AKS
1. Realizar el proceso de construcción de la imagen.
2. Subirla al ACR.
3. Creación del Chart como se muestra en el video.
4. Personalización del Chart.
5. Creación e instalación del myacr.yaml:
   https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
6. Hacer el despligue de la app con Helm, estar dentro del dir. k8s:
```
   helm install --set service.port=3000,image.tag=v1 app-api-rest ./app-api-rest
```
   ![Screenshot_20210415_124005](https://user-images.githubusercontent.com/5600076/114914319-c4d17680-9de7-11eb-83ac-00f63c4adfa1.png)

7. Exponer el Service para consultarlo con Postman/Insomnia:
   ```
   kubectl port-forward svc/app-api-rest 3000:3000
   ```
   
   ![Screenshot_20210415_124608](https://user-images.githubusercontent.com/5600076/114914992-a5871900-9de8-11eb-8edb-fec6946cd2cd.png)

8. Validación:

   ![Screenshot_20210415_124803](https://user-images.githubusercontent.com/5600076/114915262-f4cd4980-9de8-11eb-818f-c944a6e40097.png)
   
9. Loguarse al ACR usando Helm:
   ```
   helm registry login xxxxxx.azurecr.io --username miusuario --password xxxxxxxxxxxxxxxx
   ```
   Dentro del dir k8s donde esta el chart:
   ```
   helm chart save . chart-app-api-rest:v1
   helm chart save . rmragasa.azurecr.io/helm/chart-app-api-rest:v1
   helm chart push rmragasa.azurecr.io/helm/chart-app-api-rest:v1
   ```
   Para distinguir los Chart de las Imagenes de Aplicación, usamos un prefijo "helm/chart".
   
   
