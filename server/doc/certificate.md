
# Generate certificate
https://stackoverflow.com/questions/10175812/how-to-generate-a-self-signed-ssl-certificate-using-openssl
https://stackoverflow.com/questions/11744975/enabling-https-on-express-js

```
sudo openssl req -x509 -nodes -days 3650 -newkey rsa:2048 -keyout ./local.starbor.app.key -out local.starbor.app.cert
```

https://www.baeldung.com/openssl-self-signed-cert
https://arminreiter.com/2022/01/create-your-own-certificate-authority-ca-using-openssl/

```
#1
openssl req -newkey rsa:2048 -keyout local.starbor.app.key -out local.starbor.app.csr
openssl x509 -signkey local.starbor.app.key -in local.starbor.app.csr -req -days 365 -out local.starbor.app.crt
openssl req -x509 -sha256 -days 1825 -newkey rsa:2048 -keyout rootCA.key -out rootCA.crt
openssl x509 -req -CA rootCA.crt -CAkey rootCA.key -in local.starbor.app.csr -out local.starbor.app.pem -days 365 -CAcreateserial -extfile local.starbor.app.ext

#2
openssl req -key local.starbor.app.key -new -x509 -days 365 -out authority.pem
```