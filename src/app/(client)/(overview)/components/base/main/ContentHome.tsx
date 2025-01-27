import { DataFeaturesHome } from "./contant/DataFeaturesHome";
import { HeaderSectionHome } from "./contant/HeaderSectionHome";
import { ImpactSectionHome } from "./contant/ImpactSectionHome";
import TabsContentSectionHome from "./contant/TabsContentSectionHome";
import { FooterHome } from "./FooterHome";

export const ContentHome = () => {
  return (
    <>
      <HeaderSectionHome>
        <DataFeaturesHome />
        <TabsContentSectionHome />
        <ImpactSectionHome />
      </HeaderSectionHome>
      <FooterHome />
    </>
  );
};
