# mypwd=$(pwd)
# echo $mypwd
# pwd
# $mypath= pwd
# echo $mypath

cd ../ra-back/
./run-ra-back.sh

cd ../ra-front/
./run-ra-front.sh

cd ../ra-database/
./run-ra-database.sh

cd ../docs/
./run-ra-docs.sh

cd ../ra-barrier/
./run-ra-barrier.sh


cd ../ra-storage/
./run-ra-storage.sh

