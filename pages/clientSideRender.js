import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { drupal } from '../lib/drupal';
import { getParams } from '../lib/getParam';
import { toBaseUrl } from '../lib/urlBuilder';

function CSG() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [filterArr, setFilterArr] = useState([]);
    const isFirstRender = useRef(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            try {
                const books = await drupal.getResourceCollection('node--book', {
                    params: getParams()
                        .addInclude(['field_image.uid'])
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

                setFilterArr(books);
                setData(books);
                //console.log(books)
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false; // toggle flag after first render/mounting
            return;
        }

        if (keyword) {
            let filteredData = data.filter((node) => {
                return node.title.toLowerCase().includes(keyword);
            });

            setFilterArr(filteredData);
        } else {
            setFilterArr(data);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyword]);

    const handleChange = (e) => {
        //set the search keyword
        setKeyword(e.target.value);
    };

    const handleClick = () => {
        //apply keyword to filter function
        if (keyword) {
            let filteredData = data.filter((node) => {
                return node.title.toLowerCase().includes(keyword);
            });

            setFilterArr(filteredData);
        } else {
            setFilterArr(data);
        }
    };

    return (
        <>
            <h2>Client Side Rendering</h2>
            <div>
                <input type='text' onChange={handleChange} />
                <button onClick={handleClick}>Filter</button>
            </div>
            {isLoading ? (
                <div>Loading ...</div>
            ) : (
                <>
                    <div className='d-flex flex-wrap container'>
                        {filterArr.map((node) => {
                            return (
                                <div
                                    className='card col-3 m-2'
                                    key={node.field_image?.id}
                                    style={{ width: '18rem' }}
                                >
                                    {node.field_image ? (
                                        <Image
                                            src={toBaseUrl(
                                                node.field_image?.uri?.url
                                            )}
                                            width={200}
                                            height={200}
                                            alt='image'
                                            className='card-img-top'
                                        />
                                    ) : null}
                                    <div className='card-body'>
                                        <h5 className='card-title'>
                                            {node.title}
                                        </h5>
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
                    <div>
                        <pre>{JSON.stringify(filterArr, undefined, 2)}</pre>
                    </div>
                </>
            )}
        </>
    );
}

export default CSG;
