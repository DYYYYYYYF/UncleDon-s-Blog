#!/bin/bash

# build vue application
npm run build
echo 'Complete build vue application'

cd blog 
pwd

# build vue-press blog app
npm run build
echo 'Complete build blog'

cp dist/* ../public -r
echo 'Complete copy public/blog'
