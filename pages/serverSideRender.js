import { useState, useEffect } from 'react';
import Image from 'next/image';
import { drupal } from '../lib/drupal';
import { getParams } from '../lib/getParam';
import { toBaseUrl } from '../lib/urlBuilder';

function SSR({articles}) {
  return (
    <>
    <h2>Client Side Rendering</h2>
    <div className='d-flex flex-wrap container'>
        {articles.map((node) => {
            return (
                // <div key={node.field_image.id} className="m-3 col-3 flex-wrap">
                //   <Image  src={toBaseUrl(node.field_image.uri.url)} width={200} height={200} alt="image" class="card-img-top"/>
                // </div>
                <div
                    className='card col-3 m-2'
                    key={node.field_image.id}
                    style={{width: '18rem'}}
                >
                    <Image
                        src={toBaseUrl(node.field_image.uri.url)}
                        width={200}
                        height={200}
                        alt='image'
                        className='card-img-top'
                    />
                    <div className='card-body'>
                        <h5 className='card-title'>{node.title}</h5>
                        <p className='card-text'>
                            node id: {node.id}
                        </p>
                        <a href='#' className='btn btn-primary'>
                            Go somewhere
                        </a>
                    </div>
                </div>
            );
        })}
    </div>

    <pre>{JSON.stringify(articles, undefined, 2)}</pre>
</>
  )
}

export async function getServerSideProps() {
  const articles = await drupal.getResourceCollection('node--article', {
      params: getParams()
          .addInclude([
              'field_image.uid',
              'field_article_news.field_media.field_media_image',
              'field_opinion_list',
          ])
          .addFields('node--article', [
              'title',
              'created',
              'field_image',
              'field_article_news',
              'field_opinion_list',
          ])
          .addFields('node--news', ['title', 'body', 'field_media'])
          .addFields('media--image', ['thumbnail'])
          .addFields('file--file', ['uri'])
          .getQueryObject(),
  });

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
      props: {
          articles,
      },
  };
}

export default SSR