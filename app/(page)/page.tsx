import React from "react";
import { Navbar } from "../../components/Navbar";
import { getPage } from "../../sanity/actions";
import { Header } from "../../components/Header";
import { SectionText } from "../../components/Section/SectionText";
import { ModelViewer } from "@/components/ModelViewer";

const Page = async () => {
  const page = await getPage();

  if (page == null) {
    return <h3>Something wrong</h3>;
  }

  return (
    <>
      <Navbar logo={page.logo} navItems={page.navItems ?? []} />
      <Header />
      {(page.sections ?? []).map((section) => {
        if (section.type === "text") {
          return <SectionText key={section.id} section={section} />;
        }

        return null;
      })}
      <ModelViewer />
    </>
  );
};

export default Page;
