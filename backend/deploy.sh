#!/bin/sh

#BEGIN optimiztion (part 1)
#optimiztion: backup node_modules, install fresh node_modules before deployment for optimal artifact size
TEMP_DIR=`mktemp -d 2>/dev/null || mktemp -d -t 'mytmpdir'`
mv node_modules $TEMP_DIR
#END optimiztion  (part 1)

yarn
serverless deploy

#BEGIN optimiztion (part 2)
rm -rf node_modules
mv $TEMP_DIR/node_modules ./node_modules
rmdir $TEMP_DIR
#END optimiztion (part 2)
