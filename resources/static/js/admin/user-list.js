function createDatatable(msgs){
	return $("#userList")
		.DataTable({
			"searching": true,
			"processing": true,
			"serverSide": true,
			"responsive": true,
			"rowReorder": true,
			"deferLoading": 0,
			"ajax": "./user-list-data",
			"pageLength": 10,
			"lengthMenu": [
				[5, 10, 25, -1],
				[5, 10, 25, "All"]
			],
			"language": {
				"url": '../../datatables/i18n/messages_en.json'
			},
			"dom": '<"top">rt<"bottom"ipl><"clear">',
			"rowId": 'id',
			"columns": [{
					"data": "id", searchable: false
				},
				{
					"data": "login"
				},
				{
					"data": "firstName"
				},
				{
					"data": "lastName"
				},
				{
					//"data": "authorities.[].name"
					"data": "authorities",
					render: function(data, type, row) {
						var roleName = "";
						for (var i=0; i < data.length; i++){
							roleName += msgs['role.' + data[i].name] + ", ";
						}
						return roleName.length > 0 ? roleName.substring(0, roleName.length - 2) : roleName;
					}
				},
				{
					"data": "status",
					render: function(data, type, row) {
						return msgs['user.status.' + data];
					}
				},
				{
					"data": "userSoldToSet", orderable: false, searchable: false,
					render: function(data, type, row) {
						// console.log(data);
						return data ? data[0].kunnr + '<br/>' + data[0].name1 : '';
					}
				},
				{
					"data": "Actions",
					orderable: false,
					searchable: false,
					render: function(data, type, row) {
						return constructActionsColumn(data, type, row, msgs);
					}
				},
				{
					"data": "customerNumber", orderable: false, searchable: false, 
					render: function(data, type, row) { return '';}
				},
				{
					"data": "role", orderable: false, searchable: false, 
					render: function(data, type, row) { return '';}
				}
			],
            columnDefs: [
            	{ targets: [0], "visible": false },
            	{
                    targets: [5],
                    "className": "dt-center"
                },
            	{ targets: [8], "visible": false },
            	{ targets: [9], "visible": false }
            ]
		});
}

function constructActionsColumn(data, type, row, msgs){
	var userId = row.id;
	var s = '';
	
	if (userId){
		if ( row.status == 'C' ){
			s += "<a class='text-success action-link' href='#' data-toggle='modal' data-target='#confirm-approve-decline'" 
				+ " data-user-id='{userId}' data-first-name='{firstName}' data-last-name='{lastName}'" 
				+ " data-action='{actionApprove}' data-action-text='{actionApproveText}'><i class='glyphicon glyphicon-ok'></i>&nbsp;{actionApproveText}</a>&nbsp;";

			s += "<a class='text-danger action-link' href='#' data-toggle='modal' data-target='#confirm-approve-decline'" 
				+ " data-user-id='{userId}' data-first-name='{firstName}' data-last-name='{lastName}'" 
				+ " data-action='{actionDecline}' data-action-text='{actionDeclineText}'><i class='glyphicon glyphicon-remove'></i>&nbsp;{actionDeclineText}</a>&nbsp;";
				
			s = s.replace(/{userId}/g, userId).replace(/{firstName}/g, row.firstName).replace(/{lastName}/g, row.lastName)
				.replace(/{actionApprove}/g, "approve").replace(/{actionApproveText}/g,  msgs['approve'])
				.replace(/{actionDecline}/g, "decline").replace(/{actionDeclineText}/g,  msgs['decline']);
		}
		
		var params = encodeURIComponent($('#searchUserForm').serialize());
		s += "<a class='text-muted action-link' href='../../user/{userId}?fromUrl=../admin/system/user-list?" + params + "'><i class='glyphicon glyphicon-pencil'></i>&nbsp;{editText}</a>";
		s = s.replace(/{userId}/g, userId).replace(/{editText}/g,  msgs['edit']);
	}
	
	return s;
}


