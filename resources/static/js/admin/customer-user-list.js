function constructActionsColumn(data, type, row, msgs, currentUserId) {
	var userId = row.id;
	var s = '';
	
	if (userId) {
        s += "<a class='text-muted action-link' href='../../user/" + userId + "?fromUrl=../admin/customer/user-list'><i class='glyphicon glyphicon-pencil'></i>&nbsp;" + msgs['edit'] + "</a> &nbsp;";
        
        if ( userId != currentUserId ){
            s += "<a class='text-danger action-link' href='#' data-href='./delete/" + userId + "' data-toggle='modal' data-target='#confirm-delete'"
            	+ " data-first-name='" + row.firstName + "' data-last-name='" + row.lastName + "'><i class='glyphicon glyphicon-remove'></i>&nbsp;"
        		+ msgs['delete'] + "</a>";
        }
    } 

	return s;
}

$('#confirm-delete').on('show.bs.modal', function(e) {
	var relatedTarget = $(e.relatedTarget);
	var currentTarget = $(e.currentTarget);
	
    currentTarget.find('#firstName').text(relatedTarget.data('first-name'));
    currentTarget.find('#lastName').text(relatedTarget.data('last-name'));
    currentTarget.find('#btnDelete').attr('href', relatedTarget.data('href'));  
});

