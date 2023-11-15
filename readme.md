# Aws-lambda-token
Repositorio de un lambda para generar un token en base a validaciones

## Descripcion General
- Se diseño un lambda con javascript que simule la generacion de un token en base a los datos enviados para una tarjeta de credito, cumpliendo ciertas validaciones

## 1° SERVERLESS
- Se instalo una dependencia llamada serverless que ayudara a poder levantar nuestro lambda en nuestro y local y del mismo modo poder desplegarlo en aws
- El comando usado fue ***npm install -g serverless***
- Luego de ello creamos el proyecto para el lambda con el siguiente comando ***serverless create --template aws-nodejs --path aws-lambda-api***
- Abrimos el proyecto en un editor de codigo como visual studio code, en donde estaran dos archivos, el handler.js y el serverless.yml
- En el serverless yml, sque es un archivo de configuracion donde vemos todas nuestras funciones lambdas, ayuda a empaquetar las funciones y subirlas a aws
- En un inicio el archivo handler.js ya viene un codigo predeterminado que arroja un response, para ejecutarlo en local usamos el siguiente comando ***sls invoke local -f hello***, En esta caso la palabra Hello es el nombre de la funcion que se creo

## 2° NODE JS
- Ejecutamos en la terminal del proyecto el comando ***npm init -y***

## 2° AWS REGISTRO
- Vamos a crear una cuenta gratuita de aws para poder subir nuestro lambda y poder usar mas servicios disponibles como **API GATEWAY** y **IAM**

## 3° IAM
- Es necesario crear usuario para poder conectarnos desde el terminal a la consola de AWS
- Vamos al servicio IAM y creamos un nuevo usuario con permisos de administrador
- Una vez creado el usuario creamos una clave de acceso, dirigiendonos al usuario creado > Credenciales de seguridad > Claves de acceso
- Apuntamos nuestro **Acces key ID**, **Secret acces key**  y el nombre del usuario creado en un block de notas que eso nos servira

## 4° LAMBDAS
- Regresamos a nuestra terminal local y ejecutamos el siguiente comando ***sls config credentials --provider aws --key "ACCES KEY ID" --secret "SECRET ACCES KEY" --profile "NOMBRE DEL USUARIO CREADO"**
- Una vez tengamos configurado, ejecutamos el siguiente comando ***sls deploy --stage dev --verbose** , que servirá para poder desplegar el lambda local al aws
- Nos dirigimos a la consola de AWS y tendria que estar la funcion lambda que creamos

## 5° API GATEWAY
- Sea el caso que cuando desplegamos el lambda al aws, nos redirige a una url, es porque automaticamente se generp
- Caso contrario vamos al servico API GATEWAY y creamos una nueva api y la integramos con el lambda desplegado
- Abrimos postman y probamos que a url este funcionando

## 6° VISUAL STUDIO CODE 
- En el local clonamos el repositorio que esta subido aqui mismo
- Recuerda ejecutar el comando ***npm install*** para cargar las dependencias
- Desplegamos el proyecto en aws con el comando que mas arriba mencionamos
- Abrimos postman y probamos poniendo el body request que se solicita
- En el response tendria que mostrar un token con 15 minutos de duracion
