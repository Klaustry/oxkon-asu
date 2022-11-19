SERVER_IP=$SERVER_IP
SERVER_FOLDER="sud.domen.com"

echo "Deploying to ${SERVER_FOLDER}"
##ssh root@${SERVER_IP} "rm -rf /var/www/html/${SERVER_FOLDER}/*"

scp -r * user@host:/mnt/main/dockers/oxkon-asu
ssh user@host "cd /mnt/main/dockers/oxkon-asu; docker-compose up -d --build;"

#rsync -avzh *  :/var/www/${SERVER_FOLDER}/

echo "Finished copying the build files"


