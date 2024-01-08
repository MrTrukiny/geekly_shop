# Geekly Media Shop E-Commerce

Welcome to this amazing app built using TypeScript, React, Express and SQLite.

## Steps to run locally
- First of all, make sure to have the following:
  - Node.js > 18
  - .env files created in both client and server folders (following the .env.examples). I'm sharing my sandbox API so you can use Paypal functionality.

- Located on the root of the app, run in Terminal `npm run dev`. This command will immediately run client and server and will create a database with some migration seeds. You can go to http://localhost:5173 and see the magic.

## Seeds
- 6 products with all their information.
- 2 users:
  - email: geekly_admin@email.com password: Test1234*
  - User: geekly_user@email.com password: Test1234*

## Paypal
You can use my Paypal sandbox personal credentials to run mock payments using the real Paypal API.
- email: sb-wakos29048563@personal.example.com password: JE>&5olo


## Functionalities
- As a User:
  - See All Products, Search Products, see Product Details, Add and remove products from Cart, Purchase Products.
  - See Profile, see Orders and their information.
  - Add Reviews to Products.
- As and Admin:
  - All the capabilities of a regular User, plus:
    - See All products, edit them, and delete them.
    - See All Orders and mark them as delivered.
    - See all Users, edit them and delete them.


### Missing things
- Unit and Integration tests.
- Client and Server validations on forms.
- Some other things that I really would change if this was a real life application.


### Last Words
Thank you for this opportunity, I enjoyed to do this e-commerce app. It was a good refresher.
