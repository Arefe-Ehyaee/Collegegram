import axios from "axios";

export const CommentLike = async (token: string, postId: string, commentId: string) => {


    const response = await axios.post(`http://5.34.194.155:4000/posts/${postId}/comments/${commentId}/like`, 
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    return response.data;
}

