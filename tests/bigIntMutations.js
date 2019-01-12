const bigIntValidMutation = `
mutation test(
	$inputOne: incrementInput!,
	$inputTwo: incrementInput!,
	$inputThree: incrementInput!
  ) {
	one: increment(input: $inputOne) { result }
	two: increment(input: $inputTwo) { result }
	three: increment(input: $inputThree) { result }
  }
`;

const bigIntValidVariables = {
	inputOne: { num: 2147483646 },
	inputTwo: { num: 9223372036854775807 },
	inputThree: { num: 3333333333333333333333333333333 }
};

const bigIntErrorMutation = `
mutation test(
	$inputOne: incrementInput!,
	$inputTwo: incrementInput!,
	$inputThree: incrementInput!
  ) {
	one: increment(input: $inputOne) { result }
	two: increment(input: $inputTwo) { result }
	three: increment(input: $inputThree) { result }
  }`;

const bigIntErrorVariables = {
	inputOne: { num: "" },
	inputTwo: { num: 1.1 },
	inputThree: { num: "1" }
};

export { bigIntValidMutation, bigIntErrorMutation, bigIntValidVariables, bigIntErrorVariables };
