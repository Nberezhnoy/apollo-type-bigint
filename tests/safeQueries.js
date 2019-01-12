const safeValidQuery = `{
	one: increment(number: 1)
	two: increment(number: ${Number.MAX_SAFE_INTEGER - 1})
}`;

const safeErrorQuery = `{
	one: increment(number: "1")
	two: increment(number: "")
	three: increment(number: 1.1)
	four: increment(number: ${Number.MAX_SAFE_INTEGER + 1})
}`;

const safeReturnFloat = `{
	one: error
}`;

export { safeValidQuery, safeErrorQuery, safeReturnFloat };
