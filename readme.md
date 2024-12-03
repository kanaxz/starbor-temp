
# Star citizen universe

Everything you need for star citizen

## Setup

```node setup.js```



# data extractor

https://github.com/richardthombs/scunpacked
https://github.com/dolkensp/unp4k
unp4k.exe "C:\Program Files\Roberts Space Industries\StarCitizen\LIVE\data.p4k"
unforge.exe "C:\temp\unp4k-v3.13.21\Data"

## Authors 
Sacha Perret  
Cedric Dessalles

# wsl port forwarding

https://superuser.com/questions/1131874/how-to-access-localhost-of-linux-subsystem-from-windows

express
netsh interface portproxy add v4tov4 listenport=8000 listenaddress=0.0.0.0 `
    connectport=8000 connectaddress=$($(wsl hostname -I).Trim());

webpack
netsh interface portproxy add v4tov4 listenport=8080 listenaddress=0.0.0.0 `
   connectport=8080 connectaddress=$($(wsl hostname -I).Trim());

test branche