REACT_APP_API_HOST=https://localhost:8001 npm run build
surge ${PWD}/build tm-front.surge.sh
rm -rf build
