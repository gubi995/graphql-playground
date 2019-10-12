const express = require('express');
const qraphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type Query {
        hello: String
        users(index: Int): User
    }

    type User {
        id: Int
        name: String
    }
`);

const users = [
    {
        id: 1,
        name: 'First user'
    },
    {
        id: 2,
        name: 'Second user'
    },
    {
        id: 3,
        name: 'Third user'
    }
];

const root = {
    hello: () => 'Hello world!',
    users: ({ index }) => {
        return users.find(user => user.id == index);
    }
};

const app = express();

app.use(
    '/qraphql',
    qraphqlHTTP({
        schema,
        rootValue: root,
        graphiql: true
    })
);

app.listen(4000, () => console.log('Now browse to localhost:4000/qraphql'));
