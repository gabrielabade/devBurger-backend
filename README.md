database.js

alterar para o seu database

criar database docker
docker-compose.yml
DOCKER_DEFAULT_PLATFORM=linux/amd64

logs para debug
docker logs -f <container-name>

migração
npx sequelize db:migrate

how to start

yarn - install dependences

yarn dev - start aplication



routes:

post    /users
    curl 'http://localhost:3002/users' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "name": "teste2",
        "email": "teste@teste2",
        "password": "teste232"
    }'

admin
curl 'http://localhost:3002/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "teste2",
	"email": "teste@teste2",
    "password": "teste232",
    "admin": "True"
}'

Post    /sessions
    curl 'http://localhost:3002/sessions' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "email": "teste@teste2",
        "password": "teste232"
    }'

Get    /categories
    curl 'http://localhost:3002/categories' \
    --header 'Authorization: Bearer {{token}}'

Post    /categories/:id
    curl 'http://localhost:3002/categories' \
    --header 'Authorization: Bearer {{token}}' \
    --form 'file=@"/home/folkz/Downloads/wallpaperflare.com_wallpaper.jpg"' \
    --form 'name="breakin"'

Put    /categories
    curl --request PUT 'http://localhost:3002/categories/1' \
    --header 'Authorization: Bearer {{token}}' \
    --form 'file=@"/home/folkz/Downloads/breaking-bad-rv-interior.jpg"' \
    --form 'name="breaking-bad"'


Get    /products
    curl 'http://localhost:3002/products' \
    --header 'Authorization: Bearer {{token}}'

Post    /products
    curl 'http://localhost:3002/products' \
    --header 'Authorization: Bearer {{token}}' \
    --form 'name="walter"' \
    --form 'description="serotonina + paste"' \
    --form 'price="12"' \
    --form 'id="2"' \
    --form 'category_id="1"' \
    --form 'file=@"/home/folkz/Downloads/eu.jpg"'

Put    /products/:id
    curl --request PUT 'http://localhost:3002/products/8' \
    --header 'Authorization: Bearer {{token}}' \
    --form 'name="meth"' \
    --form 'description="serotonina + pastel"' \
    --form 'price="12.90"' \
    --form 'file=@"/home/folkz/Downloads/deu_bom___logo_preta.png"'

GET    /orders
    curl 'http://localhost:3002/orders' \
    --header 'Authorization: Bearer {{token}}'

POST    /orders
    curl 'http://localhost:3002/orders' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer {{token}}' \
    --data '{
    "products": [
        {
        "id": 1,
        "quantity": 1
        },
        {
        "id": 2,
        "quantity": 2
        }
    ]
    }'

PUT    /orders/:id
    curl --request PUT 'http://localhost:3002/orders/670a739a6602b78630d1507f' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer {{token}}' \
    --data '{
    "status": "Entregue"
    }'

