import { FC, Fragment, useMemo, useState } from "react";

import Flex from "../Flex";
import { Pagination } from "../Pagination";
import { HeadingTag } from "../Typography/Heading";

import BlogListItem, { BlogListItemProps } from "./BlogListItem";

const PageSize = 4;

export type BlogListProps = {
  title: string;
  titleTag: HeadingTag;
  items: BlogListItemProps[];
};
/**
 * Contains a title of set size and a list of BlogListItem,
 * with dividers between them.
 * The title tag (h1, h2, ...) is passed as a prop.
 */
const BlogList: FC<BlogListProps> = (props) => {
  const { items } = props;
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData: Array<BlogListItemProps> = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return items.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, items]);

  return (
    <Flex $flexDirection="column">
      {currentTableData.map((item, i) => (
        <Fragment key={`BlogList-BlogListItem-${i}`}>
          <BlogListItem {...item} />
        </Fragment>
      ))}
      <Pagination
        currentPage={currentPage}
        totalCount={items.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </Flex>
  );
};

export default BlogList;
