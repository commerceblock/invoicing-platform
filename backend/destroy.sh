#!/bin/sh

echo "destroying $ENV_NAME"

# Empty deployment Bucket
DEPLOYMENT_BUCKET_PREFIX=$ENV_NAME-serverless
DEPLOYMENT_BUCKET=$(aws s3 ls | grep "$DEPLOYMENT_BUCKET_PREFIX" | sed "s;.*$DEPLOYMENT_BUCKET_PREFIX;$DEPLOYMENT_BUCKET_PREFIX;")
echo "Emptying $DEPLOYMENT_BUCKET bucket"
aws s3 rm --recursive s3://$DEPLOYMENT_BUCKET

# Delete stack
echo "Deleting $ENV_NAME stack"
aws cloudformation delete-stack --stack-name $ENV_NAME

echo "automated destruction process is completed."
cat << EOF

###########################################################################################################
###########################################################################################################
###########################################################################################################

####### WARNING: persistancy resources need to be deleted manually                                  #######
#######                  USE YOUR OWN DISCRETION!                                                   #######

###########################################################################################################
###########################################################################################################
###########################################################################################################
EOF
