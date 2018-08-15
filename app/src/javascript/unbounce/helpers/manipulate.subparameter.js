var joinSubParams = function(paramVal,target, targetVal){
	targetVal = " " ? targetVal.replace(/ +?/g, '') : targetVal;

		joinedParameter =  updateJoinedParameters(
		paramVal,
		target, 
		targetVal);

		return joinedParameter;
};

var updateSubParams = function(paramVal, appendedParam){
	paramVal = " " ? paramVal.replace(/ +?/g, '') : paramVal;

	var updatedParameter = paramVal += "-" + appendedParam;
	return updatedParameter;
}

