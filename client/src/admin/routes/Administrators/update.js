import React from 'react';
import Page from '../../components/page';

//components
import AdminHeader from '../../components/Headers/AdminHeader/adminHeader';
import AdminUserPanelUpdate from '../../components/Panels/Administrator/AdminUserPanelUpdate';

export default Props => (
	<Page id="admin_users">
		<AdminHeader>
			<AdminUserPanelUpdate />
		</AdminHeader>
	</Page>
);
