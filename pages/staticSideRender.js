import Image from 'next/image'
import { drupal } from "../lib/drupal"
import {getParams} from "../lib/getParam"

function SSG({articles}) {
  console.log(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL)
  return (
    <>
      {/* {data.included.map(image => {
        <Image  src={image.attributes.uri.meta.}></Image>
      })} */}
      
      <pre>{JSON.stringify(articles, undefined, 2)}</pre>
    </>
  )
}

// This function gets called at build time
export async function getStaticProps() {
  const articles = await drupal.getResourceCollection("node--article", {
    params: getParams()
      .addInclude(["field_image.uid", "field_article_news.field_media.field_media_image", "field_opinion_list"])
      .addFields('node--article', ["title","created","field_image","field_article_news", "field_opinion_list"])
      .addFields("node--news", ["title", "body", "field_media"])
      .addFields("media--image", ["thumbnail"])
      .addFields("file--file", ["uri"])
      .getQueryObject(),
  })

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      articles,
    },
  }
}

export default SSG