import React from 'react';
import Page from '../../components/page';

//components
import AdminHeader from '../../components/Headers/AdminHeader/adminHeader';
import TravellerPanel from '../../components/Panels/Travellers/TravellersPanelUpdate';

export default Props => (
	<Page id="travellerUpdatePanel">
		<AdminHeader>
			<TravellerPanel />
		</AdminHeader>
	</Page>
);
