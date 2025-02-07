import { PropsWithChildren, useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useProfile } from "../../hooks";
import Sidebar from "../../components/Sidebar";
import { PageContainer } from "../../components/PageContainer";
import AdminHeader from "../../components/page/dashboard/AdminHeader";

const PrivateRoute = (props: PropsWithChildren) => {
  const { loading, userProfile } = useProfile();
  const sideNavRef = useRef<HTMLElement | null>(null);
  const [smallNav, setSmallNav] = useState(true);

  const toggleHide = (e: any) => {
    e.preventDefault();
    if (sideNavRef.current === null) return;
    if (sideNavRef.current.classList.contains("hide")) {
      setSmallNav(false);
    } else {
      setSmallNav(true);
    }
    sideNavRef.current.classList.toggle("hide");
  };

  if (!userProfile && loading) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <Sidebar
        toggleHide={toggleHide}
        sideNavRef={sideNavRef}
        smallNav={smallNav}
      />
      <PageContainer>
        <AdminHeader />
        {props.children}
      </PageContainer>
    </>
  );
};

export default PrivateRoute;
