const is_Empty = val =>
	val === undefined || //undefined
	val === null || //null
	(typeof val === 'object' && Object.keys(val).length === 0) || //empty object
	(typeof val === 'string' && val.trim().length === 0); //empty string

export default is_Empty;
