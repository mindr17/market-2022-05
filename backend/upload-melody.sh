#!/bin/bash
PROJECT_NAME="melody"
HOST="melody"
BACKEND_DIR="/root/backend"

echo "Uploading"
rsync --files-from=rsync-files -r --delete . $HOST:$BACKEND_DIR || exit 2

echo "Restarting process"
ssh $HOST pm2 reload server || exit 4
# ssh $HOST pm2 reload frontend || exit 4
# ssh $HOST pm2 reload backend || exit 4

echo "DONE"