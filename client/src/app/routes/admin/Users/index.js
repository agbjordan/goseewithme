import React from "react";
import Page from "../../../components/page";

//components
import AdminHeader from "../../../components/Headers/adminHeader";
import AdminUserPanel from "../../../components/Panels/AdminUserPanel";

export default Props => (
  <Page id="admin_users">
    <AdminHeader>
      <AdminUserPanel />
    </AdminHeader>
  </Page>
);
