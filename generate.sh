#!/bin/sh

rm -rf target
mkdir target

mkdir target/tmp

node ./build/combine src/main/js target/tmp/src.js

for f in ./levels/*
do
  name=`echo $f | sed -e 's/^.*\///g'`
  echo "###############################################################################################################"
  echo "Processing level: $name"

  node ./build/base64images.js "$f/gfx" target/tmp/images-vfs.js
  node ./build/combine -DnoWarnings=true -DnoComments=true src/main/resources/header.html target/tmp/images-vfs.js target/tmp/src.js "$f/$name.js" src/main/resources/footer.html "target/$name.html"

  echo "level $name DONE"
  echo "###############################################################################################################"
  echo ""
done

rm -rf target/tmp

cp -R script target/script
cp -R css target/css
