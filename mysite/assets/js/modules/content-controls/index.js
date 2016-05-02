import $ from 'jquery'

function prepopulateFormFields() {
	var queryParams = getQueryParams(document.location.search);
	$(".content-grid__controls__program-filter").val(queryParams.program_id);
	$("#content-grid__controls__date-filter").val(queryParams.date);
}

function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

$( document ).ready(function() {
	$(prepopulateFormFields);
});