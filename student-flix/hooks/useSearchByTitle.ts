import useSWR from 'swr'
import fetcher from '@/lib/fetcher'

const useSearchByTitle = (id?: string) => {
    const {data, error, isLoading} = useSWR(id ? `/api/search/${id}` : null , fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })
    
    return {
        data,
        error,
        isLoading
    }
}

export default useSearchByTitle