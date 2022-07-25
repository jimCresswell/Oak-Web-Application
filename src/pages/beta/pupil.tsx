import { FC } from "react";

import { DEFAULT_SEO_PROPS } from "../../browser-lib/seo/Seo";
import Grid from "../../components/Grid";
import GridArea from "../../components/Grid/GridArea";
import Layout from "../../components/Layout";
import { Heading } from "../../components/Typography";

const PupilHome: FC = () => {
  return (
    <Layout seoProps={DEFAULT_SEO_PROPS} $background={"grey1"}>
      <Grid $cg={16} $rg={[16, 48, 80]}>
        <GridArea $colSpan={[12, 12, 8]}>
          <Heading
            $fontSize={48}
            tag={"h1"}
            $mt={64}
            data-testid="home-page-title"
          >
            Pupil Home
          </Heading>
        </GridArea>
      </Grid>
    </Layout>
  );
};

export default PupilHome;
