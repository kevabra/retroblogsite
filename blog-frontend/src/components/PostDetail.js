import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/posts/${id}`)
      .then(response => setPost(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <Container>
      <Card className="my-4">
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.content}</Card.Text>
          <Link to="/">
            <Button variant="secondary">Back to Home</Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PostDetail;

