import React from 'react';
import Page from '../../components/page';

//components
import AdminHeader from '../../components/Headers/AdminHeader/adminHeader';
import TravellerPanel from '../../components/Panels/Travellers/TravellersPanelCreate';

export default Props => (
	<Page id="travellerCreatePanel">
		<AdminHeader>
			<TravellerPanel />
		</AdminHeader>
	</Page>
);
