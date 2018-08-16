var joinSubParams = function(paramVal,target, targetVal){
		joinedParameter =  updateJoinedParameters(
		paramVal,
		target, 
		targetVal);
		return joinedParameter;
};

var updateSubParams = function(paramVal, appendedParam){
	var updatedParameter = paramVal += "-" + appendedParam;
	return updatedParameter;
}