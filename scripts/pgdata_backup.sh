
if [ -f .env ]; then
  export $(echo $(cat .env | sed 's/#.*//g'| xargs) | envsubst)
fi


echo "INFO:  SH SCRIPT $PWD/scripts/pgdata_backup.sh STARTED..."

readonly DUMP_NAME="DUMP_$POSTGRES_DB-$(date +%m-%d-%YT%H:%M:%S)"

echo "\n"
echo "INFO: EXECUTING BACKUP ON DATABASE $POSTGRES_DB ... \n"
docker exec -i $POSTGRES_CONTAINER_NAME /bin/bash -c "PGPASSWORD=$POSTGRES_PASSWORD pg_dump --username $POSTGRES_USER ${POSTGRES_DB}" > $DUMP_NAME.sql;
echo "INFO: DUMP $DUMP_NAME.sql generated. \n"

echo "INFO: UPLOADING DUMP TO S3 $DUMP_NAME.sql ...\n"
zip $DUMP_NAME.zip $DUMP_NAME.sql
rm -rf $DUMP_NAME.sql
aws s3 mv "$DUMP_NAME".zip s3://$AWS_BUCKET_NAME/pgdata_dumpies/$DUMP_NAME.zip > ./.logs/$DUMP_NAME.txt
echo "INFO:  LOGS CREATED ON $PWD/.logs/$DUMP_NAME.txt"
echo "INFO:  BACKUP FINISHED!\n"