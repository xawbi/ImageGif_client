"use client";
import { FC, useEffect, useState } from "react";
import { FileDTO } from "@/api/dto/file.dto";
import { useInView } from "react-intersection-observer";
import { Spinner } from "@/components/ui/spinner";
import { getPublicFiles, getUserPublicFiles } from "@/api/public";
import PublicFiles from "@/components/public/PublicFiles";
import { UserDTO } from "@/api/dto/user.dto";
import { getFavorites, getFavoritesPublic } from "@/api/favorite";
import { getUserFiles } from "@/api/file";
import UserFiles from "@/components/profile/UserFiles";

interface pageProps {
  initialFilesPublic: FileDTO[];
  user?: UserDTO;
  selectedSortCookie?: string | undefined;
  page: string
  userId?: number
  pageFilter?: string
}

const LoadMore: FC<pageProps> = ({ selectedSortCookie, initialFilesPublic, user, page, userId, pageFilter }) => {
  const [files, setFiles] = useState<FileDTO[]>(initialFilesPublic);
  const [pageLoaded, setPageLoaded] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const { ref, inView } = useInView()

  useEffect(() => {
    const postCacheString = sessionStorage.getItem('postCache');
    if (postCacheString) {
      const postCache = JSON.parse(postCacheString);
      if (postCache.posts) {
        setFiles(postCache.posts)
      }
    } else {
      setFiles(initialFilesPublic)
      setPageLoaded(1)
      setHasMore(true)
    }
  }, [selectedSortCookie, initialFilesPublic])

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const loadMoreFiles = async () => {
    await delay(300);
    const nextPage = pageLoaded + 1;
    let newFiles: FileDTO[] = []
    if (page === 'userPubic' && userId) {
      newFiles = await getPublicFiles(String(userId), '', 'newest', nextPage);
    } else if (page === 'favoritesPubic' && userId) {
      newFiles = await getFavoritesPublic(userId, nextPage)
    } else if (page === 'favoritesUser' && selectedSortCookie) {
      newFiles = await getFavorites(nextPage, selectedSortCookie)
    } else if (page === 'publicUser' && selectedSortCookie && user) {
      newFiles = await getPublicFiles(String(user.id), '', selectedSortCookie, nextPage);
    } else if (page === 'public') {
      newFiles = await getPublicFiles('', '', selectedSortCookie, nextPage)
    } else if (pageFilter === 'all') {
      newFiles = await getUserFiles('', nextPage, selectedSortCookie)
    } else if (pageFilter === 'gifs') {
      newFiles = await getUserFiles('gifs', nextPage, selectedSortCookie)
    } else if (pageFilter === 'pending') {
      newFiles = await getUserFiles('sent', nextPage, selectedSortCookie)
    } else if (pageFilter === 'photos') {
      newFiles = await getUserFiles('photos', nextPage, selectedSortCookie)
    }
    const newFilesAndInitial = [...initialFilesPublic, ...newFiles]
    if (newFiles.length > 0 && hasMore) {
      let updatedPostCache = { streamPage: 4 }
      if (page === 'userPubic' || page === 'favoritesPubic' || page === 'public') {
        const postCacheString = sessionStorage.getItem('postCache')
        const postCache = postCacheString ? JSON.parse(postCacheString) : {}
        const updatedPosts = postCache.posts ? [...postCache.posts] : []
        newFilesAndInitial.forEach((newFile) => {
          const existingPostIndex = updatedPosts.findIndex((post) => post.id === newFile.id)
          if (existingPostIndex === -1) updatedPosts.push(newFile)
        });
        updatedPostCache = { ...postCache, posts: updatedPosts, streamPage: nextPage };
      }
      if (updatedPostCache.streamPage > 3) {
        sessionStorage.removeItem('postCache');
        setFiles((prevFiles: FileDTO[]) => [...prevFiles, ...newFiles])
        setPageLoaded(nextPage);
      } else {
        sessionStorage.setItem('postCache', JSON.stringify(updatedPostCache));
        setFiles((prevFiles: FileDTO[]) => [...prevFiles, ...newFiles.filter((file) => !prevFiles.some((prevFile) => prevFile.id === file.id))]);
        setPageLoaded(nextPage);
      }
    } else {
      setHasMore(false);
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      if (windowHeight + scrollTop >= documentHeight - 100 && !loading && hasMore) {
        setLoading(true);
        loadMoreFiles().finally(() => setLoading(false));
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, hasMore])

  useEffect(() => {
    const clearPostCache = () => {
      sessionStorage.removeItem('postCache');
    };
    window.addEventListener('beforeunload', clearPostCache);
    return () => {
      window.removeEventListener('beforeunload', clearPostCache);
    };
  }, []);

  return (
    <>
      {page !== 'profile' ? <PublicFiles filesPublic={files} user={user} favorites={page === 'favoritesPublic' ? 'public' : page === 'favoritesUser' ? 'user' : ''} /> : <UserFiles files={files} />}
      {loading && (
        <div className='flex justify-center items-center p-4 col-span-1 sm:col-span-3' ref={ref}>
          <Spinner />
        </div>
      )}
    </>
  )
}

export default LoadMore;