import Image from 'next/image';
import { drupal } from '../lib/drupal';
import { getParams } from '../lib/getParam';
import { toBaseUrl } from '../lib/urlBuilder';

function SSG({ books }) {
    console.log(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL);
    return (
        <>
            <h2>Client Side Rendering</h2>
            <div className='d-flex flex-wrap container'>
        {books.map((node) => {
            return (
                // <div key={node.field_image.id} className="m-3 col-3 flex-wrap">
                //   <Image  src={toBaseUrl(node.field_image.uri.url)} width={200} height={200} alt="image" class="card-img-top"/>
                // </div>
                <div
                    className='card col-3 m-2'
                    key={node.field_image?.id}
                    style={{width: '18rem'}}
                >
                    {
                        node.field_image ?    <Image
                        src={toBaseUrl(node.field_image?.uri?.url)}
                        width={200}
                        height={200}
                        alt='image'
                        className='card-img-top'
                    /> : null
                    }
                 
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

            <pre>{JSON.stringify(books, undefined, 2)}</pre>
        </>
    );
}

// This function gets called at build time
export async function getStaticProps() {
    const books = await drupal.getResourceCollection('node--book', {
        params: getParams()
            .addInclude([
                'field_image.uid',
            ])
            .addFields('node--book', [
                'title',
                'created',
                'field_image',
            ])
            //.addFields('node--news', ['title', 'body', 'field_media'])
            //.addFields('media--image', ['thumbnail'])
            //.addFields('file--file', ['uri'])
            .getQueryObject(),
    });
  
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            books,
        },
        revalidate: 10, // In seconds
    };
  }

export default SSG;
