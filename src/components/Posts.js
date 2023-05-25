export default function Posts() {
    // const posts = []
    const posts = [
        {
            id: 1,
            text: 'Hello, world!',
            timestamp: 'a minute ago',
            author: {
                username: 'susan',
            },
        },
        {
            id: 2,
            text: 'Second post',
            timestamp: 'an hour ago',
            author: {
                username: 'john',
            },
        },
    ];

    return (
        <>
            {posts.length !== 0 ?
                posts.map(post => {
                    return (
                        <p key={post.id}>
                            <b>{post.author.username}</b> &mdash; {post.timestamp}
                            <br />
                            {post.text}
                        </p>
                    );
                })
            :
                <p>There are no blog posts.</p>
            }
        </>
    );
}