import { GraphQLObjectType, GraphQLNonNull, GraphQLInputObjectType } from "graphql";
import BigInt from "../src/index";

const BigInt_bigInt = new BigInt("bigInt");

const bigIntQuery = new GraphQLObjectType({
	name: "Query",
	fields: {
		increment: {
			type: new GraphQLNonNull(BigInt_bigInt),
			args: {
				number: { type: new GraphQLNonNull(BigInt_bigInt) }
			},
			resolve(_, args) {
				return global.BigInt(args.number) + global.BigInt(10);
			}
		},
		error: {
			type: new GraphQLNonNull(BigInt_bigInt),
			resolve: () => 1.1
		}
	}
});

const bigIntMutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		increment: {
			type: new GraphQLNonNull(
				new GraphQLObjectType({
					name: "incrementPayload",
					fields: {
						result: { type: new GraphQLNonNull(BigInt_bigInt) }
					}
				})
			),
			args: {
				input: {
					type: new GraphQLNonNull(
						new GraphQLInputObjectType({
							name: "incrementInput",
							fields: {
								num: { type: new GraphQLNonNull(BigInt_bigInt) }
							}
						})
					)
				}
			},
			resolve: (_, args) => {
				return {
					result: global.BigInt(args.input.num) + global.BigInt(10)
				};
			}
		}
	}
});

export { bigIntQuery, bigIntMutation };
