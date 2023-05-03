 echo "Processing deploy.sh"
    # Set EB BUCKET as env variable
    EB_BUCKET=elasticbeanstalk-us-east-1-341266217751
    # Set the default region for aws cli
    aws configure set default.region us-east-1
    # Log in to ECR
    eval $(aws ecr get-login --no-include-email --region us-east-1)
    # Build docker image based on our production Dockerfile
    docker build -t cicd .
    # tag the image with the GitHub SHA
    docker tag cicd:latest public.ecr.aws/z2f9g1i6/cicd:$GITHUB_SHA
    # Push built image to ECS
    docker push public.ecr.aws/z2f9g1i6/cicd:$GITHUB_SHA
    # Use the linux sed command to replace the text '<VERSION>' in our Dockerrun file with the GitHub SHA key
    sed -i='' "s/<VERSION>/$GITHUB_SHA/" Dockerrun.aws.json
    # Zip up our codebase, along with modified Dockerrun and our .ebextensions directory
    zip -r cicd1.zip Dockerrun.aws.json
    # Upload zip file to s3 bucket
    aws s3 cicd1.zip s3://$EB_BUCKET/cicd1.zip
    # Create a new application version with new Dockerrun
    aws elasticbeanstalk create-application-version --application-name Testing-App --version-label $GITHUB_SHA --source-bundle S3Bucket=$EB_BUCKET,S3Key=cicd1.zip
    # Update environment to use new version number
    aws elasticbeanstalk update-environment --environment-name Testing-App-env --version-label $GITHUB_SHA