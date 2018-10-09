import React from 'react';
import Page from '../../components/page';

//components
import AdminHeader from '../../components/Headers/AdminHeader/adminHeader';
import AdminUserPanel from '../../components/Panels/Administrator/AdminUserPanel';

export default Props => (
	<Page id="admin_users">
		<AdminHeader>
			<AdminUserPanel />
		</AdminHeader>
	</Page>
);
