import { useState, useEffect } from 'react';
import { drupal } from '../lib/drupal';
import { getParams } from '../lib/getParam';

function CSG() {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)

            try{
              const articles = await drupal.getResourceCollection(
                  'node--article',
                  {
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
                          .addFields('node--news', [
                              'title',
                              'body',
                              'field_media',
                          ])
                          .addFields('media--image', ['thumbnail'])
                          .addFields('file--file', ['uri'])
                          .getQueryObject(),
                  }           
                  );

                  setData(articles);
                  //console.log(articles)
                 
          } catch (error) {
            console.log(error)
          }
            setIsLoading(false);
        };

        fetchData();
    }, []);

    return (
        <>
            {isLoading ? (
                <div>Loading ...</div>
            ) : (
                <div>
                    <pre>{JSON.stringify(data, undefined, 2)}</pre>
                </div>
            )}
        </>
    );
}

export default CSG;
