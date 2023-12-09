import NotFound from "@/app/not-Found"
import PageHeader from "@/components/PageHeader"
import { fetchApi } from "@/helpers/fetch-api"
import { Post } from "@/interfaces/post"
import {formatDate} from "@/helpers/apiDate"
import Image from "next/image"
import { MDXRemote } from "next-mdx-remote/rsc";

const getData = async(slug = "")=>{
  const path = "/posts"
  const urlParams = {
    populate: "*",
    filters: {
      slug
    },
  }

  const {data} = await fetchApi(path, urlParams, )
  return data[0];
}

interface Props {
  params: {
    slug: string
  }
}

const Slug = async ({params}: Props) => {

  const {slug} = params;
  const post: Post = await getData(slug);
  if(!post){
    return NotFound();
  }

  const { title, description,  publishedAt, image } = post.attributes;
  const { url, width, height } = image.data.attributes.formats.medium;
  const {
      body: [{
        children: [{
          text
        }]
      }]
  } = post.attributes


  return (
    <div className="space-y-8">
      <PageHeader text={title}/>
      <p className="text-gray-500">{formatDate(publishedAt)}</p>
      <Image
          className="h-auto rounded-lg"
          src={url}
          alt={`imagen de ${title}`}
          width={width}
          height={height}
        />
        <p className="mb-3 text-gray-500 dark:text-gray-400 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:mr-3 first-letter:float-left">
        {description}
      </p>
      <br />
      <MDXRemote source={text} />
    </div>
  )
}

export default Slug