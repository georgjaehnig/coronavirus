#!/bin/bash
DIR=`dirname "$0"`
cd $DIR
cd COVID-19
git pull --quiet
cd ..
/usr/bin/node index.js
