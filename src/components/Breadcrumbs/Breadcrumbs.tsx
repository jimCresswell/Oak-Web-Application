import { FC } from "react";
import Link from "next/link";
import styled from "styled-components";

import { BreadcrumbJsonLd } from "../../browser-lib/seo/getJsonLd";
import Icon from "../Icon";
import UL from "../Typography/UL";
import ellipsis from "../../styles/ellipsis";
import flex from "../../styles/utils/flex";

const BreadcrumbsNav = styled.nav`
  display: flex;
  min-width: 0;
`;

const BreadcrumbUL = styled(UL)`
  ${flex};
`;

const BreadcrumbsLi = styled.li`
  display: flex;
  align-items: center;
  min-width: 0;
  flex-shrink: 0;

  &:last-of-type {
    flex-shrink: 2;
  }
`;

const BreadcrumbConstrainer = styled.div`
  ${ellipsis}
`;

export type Breadcrumb = {
  href: string;
  label: string;
  disabled?: boolean;
};
export type BreadcrumbsProps = {
  breadcrumbs: Breadcrumb[];
};
const Breadcrumbs: FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
  return (
    <>
      <BreadcrumbJsonLd itemListElements={breadcrumbs} />
      <BreadcrumbsNav aria-label="Breadcrumb">
        <BreadcrumbUL $reset $minWidth={0} $flexWrap={"nowrap"}>
          {breadcrumbs.map((breadcrumb, i) => {
            const { href, label, disabled } = breadcrumb;
            return (
              <BreadcrumbsLi key={`${i}-${href}`}>
                {i !== 0 && (
                  <Icon
                    name="ChevronRight"
                    size={20}
                    $color={"teachersHighlight"}
                  />
                )}
                <BreadcrumbConstrainer>
                  {disabled ? <>{label}</> : <Link href={href}>{label}</Link>}
                </BreadcrumbConstrainer>
              </BreadcrumbsLi>
            );
          })}
        </BreadcrumbUL>
      </BreadcrumbsNav>
    </>
  );
};

export default Breadcrumbs;
