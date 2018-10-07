import React from "react";
import Page from "../../../components/page";

//components
import AdminHeader from "../../../components/Headers/adminHeader";
import AdminUserPanelUpdate from "../../../components/Panels/AdminUserPanelUpdate";

export default Props => (
  <Page id="admin_users">
    <AdminHeader>
      <AdminUserPanelUpdate />
    </AdminHeader>
  </Page>
);
