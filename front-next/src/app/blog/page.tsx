import PageCard from "@/components/PageCard";
import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/PagePagination";
import { fetchApi } from "@/helpers/fetch-api";
import { Post } from "@/interfaces/post";

const getData = async (page=1, pageSize=2) =>{

    const path = "/posts"
    const urlParams = {
      populate: "*",
      sort: {
        createdAt: "ASC"
      },
      pagination: {
        page, 
        pageSize
      }
    }

    const {data, meta} = await fetchApi(path, urlParams, )
    return { data, pagination: meta.pagination };
}
    interface Props {
      searchParams: {
        page?: string
      }
    }

const Blog = async({searchParams}: Props) => {

  const {page} = searchParams;
  let pageNumber = page ? parseInt(page) : 1;
  if (isNaN(pageNumber) || pageNumber < 1) {
    pageNumber = 1;
  }

    const {data, pagination} = await getData(pageNumber);

  return (
    <div className="space-y-7">
        <PageHeader text="Latest Posts" />
        <Pagination pagination={pagination}/>
        <div className="grid gap-4">
        {
          data.map((post: Post) => (
          <PageCard
            key={post.id}
            post={post}
          />
        ))}
        </div>
    </div>
  )
}

export default Blog