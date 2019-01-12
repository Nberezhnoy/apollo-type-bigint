import { graphql, GraphQLSchema } from "graphql";

import { expect } from "chai";

import { bigIntQuery, bigIntMutation } from "./bigIntSchema";
import { safeQuery, safeMutation } from "./safeSchema";
import { bigIntValidQuery, bigIntErrorQuery, bigIntReturnFloat } from "./bigIntQueries";
import {
	bigIntValidMutation,
	bigIntValidVariables,
	bigIntErrorMutation,
	bigIntErrorVariables
} from "./bigIntMutations";

import {
	safeValidMutation,
	safeValidVariables,
	safeErrorMutation,
	safeErrorVariables
} from "./safeMutations";

import { safeValidQuery, safeErrorQuery, safeReturnFloat } from "./safeQueries";

const bigIntSchema = new GraphQLSchema({
	query: bigIntQuery,
	mutation: bigIntMutation
});
const safeSchema = new GraphQLSchema({
	query: safeQuery,
	mutation: safeMutation
});

describe("Test BigInt schema", () => {
	it("Test valid Query", async function() {
		let result = await graphql(bigIntSchema, bigIntValidQuery);
		expect(result.data).to.be.deep.equals({
			one: "11",
			two: "9223372036854775817"
		});
		expect(result.errors).to.be.undefined;
	});

	it("Test error Query", async function() {
		let result = await graphql(bigIntSchema, bigIntErrorQuery);
		expect(result.errors[0].message).to.be.equal(
			"Expected type BigInt!, found \"1\"; BigInt cannot represent non-integer value: 1"
		);
		expect(result.errors[1].message).to.be.equal(
			"Expected type BigInt!, found \"\"; BigInt cannot represent non-integer value: "
		);
		expect(result.errors[2].message).to.be.equal(
			"Expected type BigInt!, found 1.1; BigInt cannot represent non-integer value: 1.1"
		);
		expect(result.errors).to.be.lengthOf(3);
	});

	it("Test error when return non Int value", async function() {
		let result = await graphql(bigIntSchema, bigIntReturnFloat);
		expect(result.errors[0].message).to.be.equal(
			"The value 1.1 cannot be converted to a BigInt because it is not an integer"
		);
		expect(result.errors).to.be.lengthOf(1);
	});

	it("Test valid Mutation", async function() {
		let result = await graphql(bigIntSchema, bigIntValidMutation, null, null, bigIntValidVariables);
		expect(result.data.one.result).to.be.a("string");
		expect(result.data.two.result).to.be.a("string");
		expect(result.data.three.result).to.be.a("string");
		expect(result.errors).to.be.undefined;
	});

	it("Test error Mutation", async function() {
		let result = await graphql(bigIntSchema, bigIntErrorMutation, null, null, bigIntErrorVariables);
		expect(result.errors[0].message).to.be.equal(
			"Variable \"$inputOne\" got invalid value { num: \"\" }; Expected type BigInt at value.num; The value cannot be converted from BigInt because it is empty string"
		);
		expect(result.errors[1].message).to.be.equal(
			"Variable \"$inputTwo\" got invalid value { num: 1.1 }; Expected type BigInt at value.num; The number 1.1 cannot be converted to a BigInt because it is not an integer"
		);
		expect(result.errors[2].message).to.be.equal(
			"Variable \"$inputThree\" got invalid value { num: \"1\" }; Expected type BigInt at value.num; The value 1 cannot be converted to a BigInt because it is not an integer"
		);
		expect(result.errors).to.be.lengthOf(3);
	});
});

describe("Test Safe schema", () => {
	it("Test valid Query", async function() {
		let result = await graphql(safeSchema, safeValidQuery);
		expect(result.data).to.be.deep.equal({ one: 2, two: 9007199254740991 });
		expect(result.errors).to.be.undefined;
	});

	it("Test error Query", async function() {
		let result = await graphql(safeSchema, safeErrorQuery);
		expect(result.errors[0].message).to.be.equal(
			"Expected type BigInt!, found \"1\"; BigInt cannot represent non-integer value: 1"
		);
		expect(result.errors[1].message).to.be.equal(
			"Expected type BigInt!, found \"\"; BigInt cannot represent non-integer value: "
		);
		expect(result.errors[2].message).to.be.equal(
			"Expected type BigInt!, found 1.1; BigInt cannot represent non-integer value: 1.1"
		);
		expect(result.errors[3].message).to.be.equal(
			"Expected type BigInt!, found 9007199254740992; BigInt number should be in the range from -(2^53) + 1 to 2^53 - 1"
		);

		expect(result.errors).to.be.lengthOf(4);
	});
	it("Test error when return non Int value", async function() {
		let result = await graphql(safeSchema, safeReturnFloat);
		expect(result.errors[0].message).to.be.equal("BigInt cannot represent non-integer value: 1.1");
		expect(result.errors).to.be.lengthOf(1);
	});
	it("Test valid Mutation", async function() {
		let result = await graphql(safeSchema, safeValidMutation, null, null, safeValidVariables);
		expect(result.data.one.result).to.be.deep.equal(2);
		expect(result.data.two.result).to.be.deep.equal(9007199254740991);
		expect(result.data.three.result).to.be.deep.equal(1111111111223);
		expect(result.errors).to.be.undefined;
	});

	it("Test error Mutation", async function() {
		let result = await graphql(safeSchema, safeErrorMutation, null, null, safeErrorVariables);
		expect(result.errors[0].message).to.be.equal(
			"Variable \"$inputOne\" got invalid value { num: \"\" }; Expected type BigInt at value.num; BigInt cannot represent non-integer value: "
		);
		expect(result.errors[1].message).to.be.equal(
			"Variable \"$inputTwo\" got invalid value { num: 1.1 }; Expected type BigInt at value.num; BigInt cannot represent non-integer value: 1.1"
		);
		expect(result.errors[2].message).to.be.equal(
			"Variable \"$inputThree\" got invalid value { num: \"1\" }; Expected type BigInt at value.num; BigInt cannot represent non-integer value: 1"
		);
		expect(result.errors).to.be.lengthOf(3);
	});
});
