import { GraphQLServer } from 'graphql-yoga';

const typeDefs = `
	type Query {
		greeting(name: String, position: String): String!
		hello: String!
		name: String!
		me: User!
		grades: [Int!]!
		addMany(numbers: [Float!]!): Float!
	}

	type User {
		id: ID!
		name: String!
		email: String!
		age: Int
	}
`;

const resolvers = {
	Query: {
		greeting(_: any, args: any) {
			if (args.name && args.position) {
				return `Hello, ${args.name}!. You are my go to ${args.position}`;
			}

			return 'Hello!';
		},
		hello() {
			return 'Hello GraphQL!';
		},
		name() {
			return 'My name is Boilerplate';
		},
		me() {
			return {
				id: 'abc123',
				name: 'Boilerplate',
				email: 'boiler@plate.in',
				age: 23,
			};
		},
		grades() {
			return [10, 12, 14, 16];
		},
		addMany(_: any, args: any) {
			if (args.numbers.length === 0) {
				return 0;
			}

			return args.numbers.reduce((result: number, value: number) => {
				return result + value;
			}, 0);
		},
	},
};

export const server = new GraphQLServer({
	typeDefs,
	resolvers,
});
