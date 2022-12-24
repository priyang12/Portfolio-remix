---
TechName: FULL-STACK-MonoRepo
Title: ShopIT E-commerce & Admin
Description: It's a full-stack web application that allows users to create an account, log in, and create an order. The application also allows users to view their order history, and view their cart. The application is built with Node.js, Express, MongoDB, React, Context API, and Styled Component. The application is deployed on Vercel.
Technologies: [Node.js, Express, MongoDB, React, Styled Component]
Tags: [FullStack]
ProjectLink: https://www.shop.web-club.co
AdminLink: http://shop-admin.web-club.co
GithubLink: https://github.com/priyang12/ecommerce-ts
Image: https://ik.imagekit.io/5aalo5l7bu7/Ecommerce_8WgWzew6o.png?ik-sdk-version=javascript-1.4.3&updatedAt=1660117461345
ClientImage: https://ik.imagekit.io/5aalo5l7bu7/Ecommerce_8WgWzew6o.png?ik-sdk-version=javascript-1.4.3&updatedAt=1660117461345
ClientVideo: https://ik.imagekit.io/5aalo5l7bu7/Portfolio/EcommerceClient_9av_ILt4v.mp4?ik-sdk-version=javascript-1.4.3&updatedAt=1668355268526
AdminImage: https://ik.imagekit.io/5aalo5l7bu7/Portfolio/Admin_4pWkBKF7g?ik-sdk-version=javascript-1.4.3&updatedAt=1668887257201
AdminVideo: https://ik.imagekit.io/5aalo5l7bu7/Portfolio/EcommerceAdmin_DDzIsBmjK.mp4?ik-sdk-version=javascript-1.4.3&updatedAt=1668887007286
---

ShopIT is a Fullstack Ecommerce webapp. it's where you can shop the things that you want with out worring about long processes.

it's a monorepo with two frontends and same backend created using turborepo. One is for client to use and place order and other is admin panel for administrator work process. there one comman package for validation created for value validation using **ZOD**.

Client web app it is well tested by react-testing lib. the paypment is powered by paypal. it is a PWA which is installlable and is **semi** workable in **offline** mode. cahceing worked by workbox. Other frontend is a for admin work and which is build using react-admin. it show's interactive ways to handle orders, review and other work. There are end-to-end test for the client apps by cypress.

## Technologies

1. Client
   - React
   - Styled Component
   - react-query
   - workbox
   - @testing-library
2. Admin
   - React
   - React-admin
   - recharts
   - @mui/material
3. Backend
   - Node.js
   - Express.js
   - imagekit
   - mongoose
   - agenda
   - @sendgrid/mail

## Features

- Top products carousel
- Product pagination
- Carousel slider
- Full featured shopping cart
- Product reviews and ratings
- Suggrested Products
- Wishlist Products
- Product search feature
- Save the Cart in User
- Order Placement
- Admin product management
- Admin Order details page
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration
- Database seeder (products & users)
- Admin Update product
- Private and Protected Routes
- User account management
- Products Search
- Forget password
- Backend API Cache
- Others
