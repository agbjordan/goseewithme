import React from 'react';
import Page from '../../components/page';

//components
import AdminHeader from '../../components/Headers/adminHeader';
import TravellerPanel from '../../components/Panels/Travellers/TravellersPanel';

export default Props => (
	<Page id="travellerPanel">
		<AdminHeader>
			<TravellerPanel />
		</AdminHeader>
	</Page>
);
