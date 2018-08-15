var joinSubParams = function(paramVal,target, targetVal){
	targetVal = " " ? targetVal.replace(/\s+/g, "") : targetVal;

		joinedParameter =  updateJoinedParameters(
		paramVal,
		target, 
		targetVal);

		return joinedParameter;
};

var updateSubParams = function(paramVal, appendedParam){
	paramVal = " " ? paramVal.replace(/\s+/g, "") : paramVal;

	var updatedParameter = paramVal += "-" + appendedParam;
	return updatedParameter;
}
