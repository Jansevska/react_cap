import Card from 'react-bootstrap/Card'

import PostType from "../types/post";

type PostProps = {
    post: PostType
}

export default function Post({ post }: PostProps) {
    return (
        <Card className='mt-3 bg-primary-subtle' data-bs-theme="light">
            {/* <Card.Img variant='top' src={post.imageUrl} /> */}
            <Card.Body>
                <Card.Title>{ post.title }</Card.Title>
                <Card.Text>{ post.body }</Card.Text>
                <Card.Subtitle>Posted at {post.dateCreated} by {post.author.username}</Card.Subtitle>
            </Card.Body>
        </Card>
    );
}