import axios from "axios";

export const CommentUnLike = async (token: string, postId: string, commentId: string) => {


    const response = await axios.delete(`http://5.34.194.155:4000/posts/${postId}/comments/${commentId}/unlike`, 
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
    return response.data;
}
