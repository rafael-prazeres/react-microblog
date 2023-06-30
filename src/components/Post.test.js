import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Post from './Post';

test ('it renders all the components of the post', () => {
    const timestampUTC = '2023-06-11T22:00:00.000Z';
    const post = {
        text: 'hello',
        author: {username: 'susan', avatar_url: 'https://example.com/avatar/susan'},
        timestamp: timestampUTC,
    };

    render (
        <BrowserRouter>
            <Post post={post} />
        </BrowserRouter>
    );

    const message = screen.getByText('hello');
    const authorlink = screen.getByText('susan');
    const avatar = screen.getByAltText('susan');
    const timestamp = screen.getByText(/.* semanas$/);

    expect(message).toBeInTheDocument();
    expect(authorlink).toBeInTheDocument();
    expect(authorlink).toHaveAttribute('href', '/user/susan');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'https://example.com/avatar/susan&s=48');
    expect(timestamp).toBeInTheDocument();
    expect(timestamp).toHaveAttribute(
        'title', new Date(Date.parse(timestampUTC)).toString());
});