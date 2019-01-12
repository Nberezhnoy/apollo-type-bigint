const safeValidMutation = `
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

const safeValidVariables = {
	inputOne: { num: 1 },
	inputTwo: { num: Number.MAX_SAFE_INTEGER - 1 },
	inputThree: { num: 1111111111222 }
};

const safeErrorMutation = `
mutation test(
	$inputOne: incrementInput!,
	$inputTwo: incrementInput!,
	$inputThree: incrementInput!
  ) {
	one: increment(input: $inputOne) { result }
	two: increment(input: $inputTwo) { result }
	three: increment(input: $inputThree) { result }
  }`;

const safeErrorVariables = {
	inputOne: { num: "" },
	inputTwo: { num: 1.1 },
	inputThree: { num: "1" }
};

export { safeValidMutation, safeValidVariables, safeErrorMutation, safeErrorVariables };
