import Image from 'next/image'
import { drupal } from "../lib/drupal"
import {getParams} from "../lib/getParam"
import {toBaseUrl} from "../lib/urlBuilder"

function SSG({articles}) {
  console.log(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL)
  return (
    <>
      <h2>Images</h2>
      {articles.map(Node => {
        return (
          <div key={Node.field_image.id}>
            <Image  src={toBaseUrl(Node.field_image.uri.url)} width={200} height={200} alt="image"/>
          </div>
        ) 
      })}
      
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