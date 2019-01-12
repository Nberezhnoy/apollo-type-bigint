import { GraphQLObjectType, GraphQLNonNull, GraphQLInputObjectType } from "graphql";
import BigInt from "../src/index";

const BigInt_safe = new BigInt("safe");

const safeQuery = new GraphQLObjectType({
	name: "Query",
	fields: {
		increment: {
			type: new GraphQLNonNull(BigInt_safe),
			args: {
				number: { type: new GraphQLNonNull(BigInt_safe) }
			},
			resolve(_, args) {
				return args.number + 1;
			}
		},
		error: {
			type: new GraphQLNonNull(BigInt_safe),
			resolve: () => 1.1
		}
	}
});

const safeMutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		increment: {
			type: new GraphQLNonNull(
				new GraphQLObjectType({
					name: "incrementPayload",
					fields: {
						result: { type: new GraphQLNonNull(BigInt_safe) }
					}
				})
			),
			args: {
				input: {
					type: new GraphQLNonNull(
						new GraphQLInputObjectType({
							name: "incrementInput",
							fields: {
								num: { type: new GraphQLNonNull(BigInt_safe) }
							}
						})
					)
				}
			},
			resolve: (_, args) => {
				return {
					result: args.input.num + 1
				};
			}
		}
	}
});

export { safeQuery, safeMutation };
