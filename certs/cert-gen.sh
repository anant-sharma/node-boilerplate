#!/bin/bash
 
#Required
domain=chipserver.ml
commonname=$domain
 
#Change to your company details
country=IN
state=IN
locality=NOIDA
organization=Chipserver
organizationalunit=IT
email=anantatnet@gmail.com
 
#Optional
password=password
 
echo "Generating key request for $domain"
 
#Generate a key
openssl genrsa -des3 -passout pass:$password -out certs/server.key 2048 -noout
 
#Remove passphrase from the key. Comment the line out to keep the passphrase
echo "Removing passphrase from key"
openssl rsa -in certs/server.key -passin pass:$password -out certs/server.key
 
#Create the request
echo "Creating CSR"
openssl req -new -key certs/server.key -out certs/server.csr -passin pass:$password \
    -subj "/C=$country/ST=$state/L=$locality/O=$organization/OU=$organizationalunit/CN=$commonname/emailAddress=$email"

#Create crt
echo "Creating CRT"
openssl x509 -req -sha256 -days 365 -in certs/server.csr -signkey certs/server.key -out certs/server.crt
