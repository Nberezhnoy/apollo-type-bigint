const bigIntValidQuery = `{
	one: increment(number: 1)
	two: increment(number: 9223372036854775807)
}`;

const bigIntErrorQuery = `{
	one: increment(number: "1")
	two: increment(number: "")
	three: increment(number: 1.1)
}`;

const bigIntReturnFloat = `{
	one: error
}`;

export { bigIntValidQuery, bigIntErrorQuery, bigIntReturnFloat };
