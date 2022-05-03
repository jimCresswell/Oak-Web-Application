import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";

import Breadcrumbs from "../../components/Breadcrumbs";
import Layout from "../../components/Layout/Layout";
import LessonHeader from "../../components/LessonHeader/LessonHeader";
import { LessonId } from "../../hooks/useBookmarks";
import graphqlApi from "../../node-lib/graphql";

import styles from "./[lessonSlug].module.css";

const Lesson: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (
  props
) => {
  const { lesson } = props;

  return (
    <Layout>
      <Breadcrumbs
        breadcrumbs={[
          { href: "/", label: "[key-stage]" },
          { href: "/", label: "Subjects" },
          { href: "/", label: "[subject-name]" },
          { href: "/", label: "[unit-name]" },
        ]}
      />
      <LessonHeader {...lesson} />
      <div className={styles["primary-buttons"]}></div>
    </Layout>
  );
};

export default Lesson;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await graphqlApi.allLessons();
  const paths = res.lessons.map((l) => ({ params: { lessonSlug: l.slug } }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<
  {
    lesson: { id: LessonId; slug: string; title: string };
  },
  { lessonSlug: string }
> = async ({ params }) => {
  if (!params || !params.lessonSlug) {
    throw new Error("No params which we thought were there");
  }

  const { lessonSlug } = params;

  const res = await graphqlApi.lessonsBySlug({ slug: lessonSlug });
  const [lesson] = res.lessons;

  if (!lesson) {
    // @TODO consistently figure a way to handle 404s etc
    throw new Error("404 Not found");
  }

  return {
    props: {
      lesson,
    },
  };
};
