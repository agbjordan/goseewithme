import React from 'react';
import Page from '../../components/page';

import LoginHeader from '../../components/Headers/loginHeader';
import LoginForm from '../../components/Forms/LoginForms/AdminLoginForm';

export default () => (
	<Page id="admin_inbox">
		<LoginHeader>
			<LoginForm />
		</LoginHeader>
	</Page>
);
