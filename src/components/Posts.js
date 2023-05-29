import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useApi } from '../contexts/ApiProvider';
import Post from './Post';

export default function Posts() {
    const [posts, setPosts] = useState();
    const api = useApi();

    useEffect(() => {
        (async () => {
            const response = await api.get('/feed');
            if (response.ok) {
                setPosts(response.body.data);
            }
            else {
                setPosts(null);
            }
        })();
    }, [api]);

    return (
        <>
            {posts === undefined ?
                <Spinner animation="border" />
                :
                <>
                    {posts === null ?
                        <p>Could not retrieve blog posts.</p>
                        :
                        <>
                            {posts.length !== 0 ?
                                posts.map(post => <Post key={post.id} post={post}/>)
                                :
                                <p>There are no blog posts.</p>
                            }
                        </>
                    }
                </>
            }
        </>
    );
}