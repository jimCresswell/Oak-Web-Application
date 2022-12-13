import { FC } from "react";

import Grid, { GridArea, GridProps } from "../Grid";

import TierListItem, { TierListItemProps } from "./TierListItem";

type TierListProps = GridProps & {
  tiers: Omit<TierListItemProps, "subjectSlug" | "keyStageSlug">[];
  subjectSlug: string;
  keyStageSlug: string;
};

/**
 * Clickable learning tier card list.
 *
 * ## Usage
 * Used on a key stage 4 learning tier page
 */
const TierList: FC<TierListProps> = ({
  tiers,
  keyStageSlug,
  subjectSlug,
  ...gridProps
}) => {
  return (
    <Grid $cg={16} {...gridProps}>
      {tiers.map((tier) => (
        <GridArea $mb={16} $colSpan={[12, 4]}>
          <TierListItem
            {...tier}
            subjectSlug={subjectSlug}
            keyStageSlug={keyStageSlug}
            background={"teachersPastelYellow"}
          />
        </GridArea>
      ))}
    </Grid>
  );
};

export default TierList;