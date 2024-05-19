"use client";
import { FC, useEffect, useState } from "react";
import { FileDTO } from "@/api/dto/file.dto";
import { useInView } from "react-intersection-observer";
import { Spinner } from "@/components/ui/spinner";
import { getPublicFiles } from "@/api/public";
import PublicFiles from "@/components/public/PublicFiles";
import { UserDTO } from "@/api/dto/user.dto";
import { getFavorites, getFavoritesPublic } from "@/api/favorite";
import { getUserFiles } from "@/api/file";
import UserFiles from "@/components/profile/UserFiles";
import { useDelBanLoad } from "@/store/useDelBanLoad";

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
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const { block } = useDelBanLoad()

  const { ref } = useInView()

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
  }, [selectedSortCookie])

  useEffect(() => {
    if (!isFirstLoad) {
      const postCacheString = sessionStorage.getItem('postCache');
      if (postCacheString) {
        const postCache = JSON.parse(postCacheString);
        if (postCache.posts) {
          setFiles(postCache.posts);
        }
      } else {
        newFuncInitialFiles();
      }
    }
    setIsFirstLoad(false);
  }, [block]);

  const newFilesFunc = async (pageLoaded: number, nextPage: number) => {
    if (page === 'userPubic' && userId) {
      return await getPublicFiles(String(userId), '', 'newest', nextPage, pageLoaded);
    } else if (page === 'favoritesPubic' && userId) {
      return await getFavoritesPublic(userId, nextPage, pageLoaded)
    } else if (page === 'favoritesUser') {
      return await getFavorites(nextPage, selectedSortCookie, pageLoaded)
    } else if (page === 'publicUser' && user) {
      return await getPublicFiles(String(user.id), '', selectedSortCookie, nextPage, pageLoaded);
    } else if (page === 'public') {
      return await getPublicFiles('', '', selectedSortCookie, nextPage, pageLoaded)
    } else if (pageFilter === 'all') {
      return await getUserFiles('', nextPage, selectedSortCookie, pageLoaded)
    } else if (pageFilter === 'gifs') {
      return await getUserFiles('gifs', nextPage, selectedSortCookie, pageLoaded)
    } else if (pageFilter === 'pending') {
      return await getUserFiles('sent', nextPage, selectedSortCookie, pageLoaded)
    } else if (pageFilter === 'photos') {
      return await getUserFiles('photos', nextPage, selectedSortCookie, pageLoaded)
    }
  }

  const newFuncInitialFiles = async () => {
    let newInitialFiles: FileDTO[] =  await newFilesFunc(pageLoaded * 50, 1)
    setFiles(newInitialFiles)
  }

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const loadMoreFiles = async () => {
    await delay(300);
    const nextPage = pageLoaded + 1;
    const newFiles: FileDTO[] = await newFilesFunc(50, nextPage)
    if (newFiles) {
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
      {page !== 'profile' ?
        <PublicFiles filesPublic={files} user={user} favorites={page === 'favoritesPublic' ? 'public' : page === 'favoritesUser' ? 'user' : ''} />
        : <UserFiles files={files} />}
      {loading && (
        <div className='flex justify-center items-center p-4 col-span-1 sm:col-span-3' ref={ref}>
          <Spinner />
        </div>
      )}
    </>
  )
}

export default LoadMore;