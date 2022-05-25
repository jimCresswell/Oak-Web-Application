import { FC, useEffect, useCallback } from "react";

import {
  useBookmarkedLessonAddMutation,
  useBookmarkedLessonRemoveMutation,
  useBookmarkedLessonsLazyQuery,
} from "../../browser-lib/graphql/generated/apollo";
import truthy from "../../utils/truthy";
import { useUser } from "../Auth";

import {
  bookmarksContext,
  useBookmarksCache,
  LessonId,
  BookmarksContext,
} from ".";

/**
 *
 * BookmarksProvider is to be used for any lesson bookmark activity in the app.
 * Note: since bookmarks are added to state locally rather than refetching (which
 * is slower and more requests), it's important to note that sort order is
 * important. Currently in the query it is set to order_by: { created_at: desc },
 * meaning latest first.
 */
const BookmarksProvider: FC = ({ children }) => {
  const user = useUser();

  const [bookmarks, setBookmarks] = useBookmarksCache();
  const [addBookmarkMutation, { loading: adding }] =
    useBookmarkedLessonAddMutation();
  const [removeBookmarkMutation, { loading: removing }] =
    useBookmarkedLessonRemoveMutation();

  const [fetchBookmarks, { data, loading: fetching, error, refetch }] =
    useBookmarkedLessonsLazyQuery({
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "network-only",
      notifyOnNetworkStatusChange: true,
    });

  const loading = fetching || removing || adding;

  useEffect(() => {
    if (user) {
      fetchBookmarks();
    }
  }, [user, fetchBookmarks]);

  useEffect(() => {
    /**
     * @todo: we filter by truthy here. In future we will want to monitor this,
     * and likely action it. If a bookmark has a null lesson, it's likely that the lesson
     * is no longer available, or that there was an error connecting to the curriculum
     * data.
     *
     */
    if (data?.bookmarkedLessons) {
      setBookmarks(
        data.bookmarkedLessons
          .map(({ lesson }) => lesson)
          .filter(truthy)
          .map((lesson) => ({ lesson }))
      );
    }
  }, [data, setBookmarks]);

  const refetchBookmarks = useCallback(async () => {
    if (refetch) {
      await refetch();
    }
  }, [refetch]);

  const addBookmark = useCallback(
    async (lessonId: LessonId) => {
      if (!user) {
        // @TODO bugsnag
        return console.warn("Add bookmark called without user in scope");
      }
      // Attempt add bookmark to database
      const res = await addBookmarkMutation({ variables: { lessonId } });
      const bookmark = res.data?.insert_bookmarkedLessons_one;
      if (!bookmark || !bookmark.lesson) {
        // @TODO bugsnag
        return;
      }
      const lesson = bookmark.lesson;
      // @todo Optimistically add bookmark. Assumption made here that sort order is by createdAt DESC
      setBookmarks((bookmarks) => [{ lesson: lesson }, ...bookmarks]);
      refetchBookmarks();
    },
    [user, addBookmarkMutation, refetchBookmarks, setBookmarks]
  );

  const removeBookmark = useCallback(
    async (lessonId: LessonId) => {
      if (!user) {
        // @TODO bugsnag
        return console.warn("Remove bookmark called without user in scope");
      }
      // Optimistically remove bookmark
      setBookmarks((bookmarks) =>
        bookmarks.filter((bookmark) => bookmark.lesson.id !== lessonId)
      );
      // Attempt remove bookmark from database
      await removeBookmarkMutation({
        variables: { lessonId, userId: user.id },
      });
      // Refetch to ensure consistency
      refetchBookmarks();
    },
    [user, removeBookmarkMutation, refetchBookmarks, setBookmarks]
  );

  const isBookmarked = useCallback(
    (lessonId: LessonId) => {
      return bookmarks.some((bookmark) => bookmark.lesson.id === lessonId);
    },
    [bookmarks]
  );

  const value: BookmarksContext = {
    bookmarks,
    loading,
    error: error ? "Sorry, we could not load your bookmarks" : null,
    addBookmark,
    removeBookmark,
    refetchBookmarks,
    isBookmarked,
  };
  return (
    <bookmarksContext.Provider value={value}>
      {children}
    </bookmarksContext.Provider>
  );
};

export default BookmarksProvider;