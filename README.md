### Get extract data

wget http://download.geofabrik.de/europe/romania-latest.osm.pbf

### Pre-process the extract data

docker run -t -v "${PWD}:/data" ghcr.io/project-osrm/osrm-backend osrm-extract -p /opt/car.lua /data/romania-latest.osm.pbf || echo "osrm-extract failed"

### Generate stuff

docker run -t -v "${PWD}:/data" ghcr.io/project-osrm/osrm-backend osrm-partition /data/romania-latest.osrm || echo "osrm-partition failed"
docker run -t -v "${PWD}:/data" ghcr.io/project-osrm/osrm-backend osrm-customize /data/romania-latest.osrm || echo "osrm-customize failed"

### Start docker on port 4000

docker run -t -i -p 4000:5000 -v "${PWD}:/data" ghcr.io/project-osrm/osrm-backend osrm-routed --algorithm mld /data/romania-latest.osrm

### Make a request

curl "http://127.0.0.1:4000/route/v1/driving/13.388860,52.517037;13.385983,52.496891?steps=true"
