import React, {useEffect, useState} from "react"
import BadgerMessage from "./BadgerMessage.jsx";
import {Row, Col} from "react-bootstrap";
import {Pagination} from "react-bootstrap";
import {Form, Button} from "react-bootstrap";
import {useContext} from "react";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";


export default function BadgerChatroom(props)
{

    const [messages, setMessages] = useState([]);
    // Step 3 - Implement Pagination
    const [currentPage, setCurrentPage] = useState(1);

    const [loginStatus] = useContext(BadgerLoginStatusContext);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');


    const loadMessages = (pageNum) =>
    {
        fetch(`https://cs571api.cs.wisc.edu/rest/su25/hw6/messages?chatroom=${props.name}&page=${pageNum}`, {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res => res.json()).then(json =>
        {
            setMessages(json.messages)
        })
    };

    const handleCreatePost = () =>
    {
        // Validate inputs
        if (!title || !content)
        {
            alert("You must provide both a title and content!");
            return;
        }

        // Post to API
        fetch(`https://cs571api.cs.wisc.edu/rest/su25/hw6/messages?chatroom=${props.name}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CS571-ID": CS571.getBadgerId()
            },
            credentials: "include",
            body: JSON.stringify({
                title: title,
                content: content
            })
        }).then(res =>
        {
            if (res.ok)
            {
                alert("Successfully posted!");
                setTitle(''); // Clear form
                setContent('');
                loadMessages(currentPage); // Refresh messages
            }
        });
    };

    const handleDeletePost = (id) =>
    {
        // Did this for fun
        let isSure = confirm("Are you sure you want to delete?");

        if (isSure)
        {
            fetch(`https://cs571api.cs.wisc.edu/rest/su25/hw6/messages?id=${id}`, {
                method: "DELETE",
                headers: {
                    "X-CS571-ID": CS571.getBadgerId()
                },
                credentials: "include"
            }).then(res =>
            {
                if (res.ok)
                {
                    alert("Successfully deleted the post!");
                    loadMessages(currentPage); // Refresh messages
                }
            });
        }
    };


    // Why can't we just say []?
    // The BadgerChatroom doesn't unload/reload when switching
    // chatrooms, only its props change! Try it yourself.
    useEffect(() =>
    {
        loadMessages(currentPage);
    }, [props, currentPage]);


    return <>
        <h1>{props.name} Chatroom</h1>
        {
            loginStatus ? (
                <Form>
                    <Form.Group className="mb-3" controlId="postTitle">
                        <Form.Label>Post Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter post title"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="postContent">
                        <Form.Label>Post Content</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Enter post content"
                        />
                    </Form.Group>

                    <Button variant="primary" onClick={handleCreatePost}>Create Post</Button>
                </Form>
            ) : (
                <p><i>You must be logged in to post!</i></p>
            )
        }

        <hr/>
        {
            messages.length > 0 ?
                <>
                    {
                        <Row>
                            {messages.map(message => (
                                <Col
                                    key={message.id}
                                    xs={12}
                                    sm={12}
                                    md={6}
                                    lg={4}
                                    xl={3}
                                >
                                    <BadgerMessage
                                        title={message.title}
                                        poster={message.poster}
                                        content={message.content}
                                        created={message.created}
                                        id={message.id}
                                        loggedInUser={loginStatus?.username} // Pass current user
                                        onDelete={handleDeletePost} // Pass delete function
                                    />
                                </Col>
                            ))}
                        </Row>
                    }
                </>
                :
                <>
                    <p>There are no messages on this page yet!</p>
                </>
        }

        <Pagination>
            {[1, 2, 3, 4].map(page => (
                <Pagination.Item
                    key={page}
                    active={page === currentPage}
                    onClick={() => setCurrentPage(page)}
                >
                    {page}
                </Pagination.Item>
            ))}
        </Pagination>
    </>
}
