#!/bin/bash

set -euo pipefail

export OWD=$PWD

echo "Uploading downloads to the public download CDN"
cd frontend/static/downloads
aws s3 sync --acl "public-read" . s3://com.sudra-routes.downloads/

cd $OWD

cd backend
source venv/bin/activate
sudo find . -type d -name '__pycache__' -exec rm -rf '{}' ';' || true
sudo find . -type f -iname '*.pyc' -exec rm '{}' ';' || true

echo "Deploying backend to Lambda"
zappa update production
zappa manage production migrate
