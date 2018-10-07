import React from "react";
import Page from "../../../components/page";

//components
import AdminHeader from "../../../components/Headers/adminHeader";
import AdminUserPanelCreate from "../../../components/Panels/AdminUserPanelCreate";

export default Props => (
  <Page id="admin_users">
    <AdminHeader>
      <AdminUserPanelCreate />
    </AdminHeader>
  </Page>
);
