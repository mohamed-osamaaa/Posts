import { useEffect, useState } from "react";

import PostAPICall from "./apiCalls/postApiCall";
import CreatePostForm from "./components/CreatePostForm";
import PostItem from "./components/PostItem";
import Post from "./models/post.interface";

const postApiCall = new PostAPICall();
function App(): JSX.Element {
    const [posts, setPosts] = useState<Post[]>([]);
    const fetchPosts = async () => {
        const result: Post[] = await postApiCall.getAllPosts();
        setPosts(result);
    };
    const deletePost = async (postId: number) => {
        await postApiCall.removePost(postId);
        setPosts(posts.filter((p: Post) => p.id !== postId));
    };
    const addPost = async (newPost: Post) => {
        const result: Post = await postApiCall.createPost(newPost);
        setPosts([result, ...posts]);
    };
    useEffect(() => {
        fetchPosts();
    }, []);
    return (
        <>
            <div className="container my-4">
                <CreatePostForm addPost={addPost} />
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Post ID</th>
                            <th>Post Title</th>
                            <th>Post Body</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post: Post) => (
                            <PostItem
                                deletePost={deletePost}
                                post={post}
                                key={post.id}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default App;
