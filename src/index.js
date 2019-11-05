import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";

export default class GraphQLBigInt extends GraphQLScalarType {
	constructor(mode = "bigInt") {
		const MAX_INT = Number.MAX_SAFE_INTEGER;
		const MIN_INT = Number.MIN_SAFE_INTEGER;

		const safeDescription =
			"The `BigInt` scalar type represents non-fractional signed whole numeric values." +
			"BigInt can represent values between -(2^53) + 1 and 2^53 - 1.";
		const bigIntDescription =
			"The `BigInt` scalar type represents non-fractional signed whole numeric values." +
			"BigInt can represent values between -(2^63) + 1 and 2^63 - 1.";

		const bitIntParseLiteral = function(ast) {
			if (ast.kind === Kind.INT) {
				return global.BigInt(ast.value);
			} else {
				throw new TypeError(`BigInt cannot represent non-integer value: ${ast.value}`);
			}
		};

		const parseBigIntValue = function(value) {
			if (value === "") {
				throw new TypeError("The value cannot be converted from BigInt because it is empty string");
			}
			if (typeof value !== "number" && typeof value !== "bigint" && typeof value !== "string") {
				throw new TypeError(
					`The value ${value} cannot be converted to a BigInt because it is not an integer`
				);
			}

			try {
				return global.BigInt(value);
			} catch {
				throw new TypeError(
					`The value ${value} cannot be converted to a BigInt because it is not an integer`
				);
			}
		};

		const serializeBigIntValue = function(value) {
			if (value === "") {
				throw new TypeError("The value cannot be converted from BigInt because it is empty string");
			}
			try {
				return global.BigInt(value.toString()).toString();
			} catch {
				throw new TypeError(
					`The value ${value} cannot be converted to a BigInt because it is not an integer`
				);
			}
		};

		const safeParseLiteral = function(ast) {
			if (ast.kind === Kind.INT) {
				const number = Number(ast.value);
				if (number <= MAX_INT && number >= MIN_INT) {
					return number;
				} else {
					throw new TypeError("BigInt number should be in the range from -(2^53) + 1 to 2^53 - 1");
				}
			} else {
				throw new TypeError(`BigInt cannot represent non-integer value: ${ast.value}`);
			}
		};

		const safeValue = function(value) {
			if (typeof value !== "number") {
				throw new TypeError(`BigInt cannot represent non-integer value: ${value}`);
			}
			const number = Number(value);
			if (number > MAX_INT || number < MIN_INT) {
				throw new TypeError("BigInt number should be in the range from -(2^53) + 1 to 2^53 - 1");
			}
			const int = Math.floor(number);
			if (int !== number) {
				throw new TypeError(`BigInt cannot represent non-integer value: ${value}`);
			}
			return number;
		};

		super({
			name: "BigInt",
			description: mode === "bigInt" ? bigIntDescription : safeDescription,
			parseValue: mode === "bigInt" ? parseBigIntValue : safeValue,
			serialize: mode === "bigInt" ? serializeBigIntValue : safeValue,
			parseLiteral: mode === "bigInt" ? bitIntParseLiteral : safeParseLiteral
		});
	}
}
