# API Documentation 

## Overview 

This API provides endpoints for managing users, categories, products, and orders. 

## Getting Started 

## Prerequisites 
- Docker
- Docker Compose
- Node.js
- Yarn 

## Installation
```bash
# Clone the repository
git clone [repository-url]
# Navigate to the project directory
cd [project-directory]
# Install dependencies
yarn install
# Set up the database
docker-compose up -d
# on linux
DOCKER_DEFAULT_PLATFORM=linux/amd64DOCKER_DEFAULT_PLATFORM=linux/amd64DOCKER_DEFAULT_PLATFORM=linux/amd64
# Run migrations
npx sequelize db:migrate
# Start the application
yarn dev
```

# API Endpoints 
## Users 
## Create User 

```bash
curl 'http://localhost:3002/users' \
--header 'Content-Type: application/json' \
--data-raw '{
"name": "John Doe",
"email": "john@example.com",
"password": "password123"
}'
```

## Create Admin User

```bash
curl 'http://localhost:3002/users' \
--header 'Content-Type: application/json' \
--data-raw '{
"name": "Admin User",
"email": "admin@example.com",
"password": "adminpass123",
"admin": "True"
}'
```

## Authentication
## Create Session 

```bash
curl 'http://localhost:3002/sessions' \
--header 'Content-Type: application/json' \
--data-raw '{
"email": "john@example.com",
"password": "password123"
}'
```

## Categories 
## Get Categories 

```bash
curl 'http://localhost:3002/categories' \
--header 'Authorization: Bearer {{token}}'
```
## Create Category 

```bash
curl 'http://localhost:3002/categories' \
--header 'Authorization: Bearer {{token}}' \
--form 'file=@"/path/to/image.jpg"' \
--form 'name="Category Name"'
```
## Update Category 

```bash
curl --request PUT 'http://localhost:3002/categories/1' \
--header 'Authorization: Bearer {{token}}' \
--form 'file=@"/path/to/new-image.jpg"' \
--form 'name="Updated Category Name"'
```
## Products 
## Get Products 

```bash
curl 'http://localhost:3002/products'
```
## Create Product

```bash
curl 'http://localhost:3002/products' \
--header 'Authorization: Bearer {{token}}' \
--form 'name="Product Name"' \
--form 'description="Product Description"' \
--form 'price="19.99"' \
--form 'category_id="1"' \
--form 'file=@"/path/to/product-image.jpg"'
```

## Update Product 

```bash
curl --request PUT 'http://localhost:3002/products/1' \
--header 'Authorization: Bearer {{token}}' \
--form 'name="Updated Product Name"' \
--form 'description="Updated Product Description"' \
--form 'price="29.99"' \
--form 'file=@"/path/to/updated-product-image.jpg"'
```

## Orders 
## Get Orders 

```bash
curl 'http://localhost:3002/orders' \
--header 'Authorization: Bearer {{token}}'
```

## Create Order

```bash
curl 'http://localhost:3002/orders' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{token}}' \
--data '{
"products": [
{
"id": 1,
"quantity": 2
},
{
"id": 2,
"quantity": 1
}
]
}'
```

## Update Order Status 

```bash
curl --request PUT 'http://localhost:3002/orders/ORDER_ID' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{token}}' \
--data '{
"status": "Delivered"
}'
```
<!-- ## Contributing 
Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests to us. 
##  License 
This project is licensed under the [LICENSE NAME] - see the LICENSE.md file for details -->
