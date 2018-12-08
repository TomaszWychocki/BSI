#!/bin/bash

rm *.key *.pem *.srl *.crt *.csr

openssl genrsa -out ca.key 2048
openssl req -x509 -new -nodes -key ca.key -sha256 -days 3650 -out ca.pem -config ca.conf 

openssl genrsa -out twychocki.org.key 2048
openssl req -new -config twychocki.org.conf -key twychocki.org.key -out twychocki.org.csr
openssl x509 -req -days 365 -in twychocki.org.csr -CA ca.pem -CAkey ca.key -CAcreateserial -out twychocki.org.crt -extfile twychocki.org.conf -extensions v3_req

openssl genrsa -out twychocki.net.key 2048
openssl req -new -config twychocki.net.conf -key twychocki.net.key -out twychocki.net.csr
openssl x509 -req -days 365 -in twychocki.net.csr -CA ca.pem -CAkey ca.key -CAcreateserial -out twychocki.net.crt -extfile twychocki.net.conf -extensions v3_req