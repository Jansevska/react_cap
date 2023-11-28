import axios from 'axios';
import PostType from '../types/post';
import APIResponse from '../types/api';



const base: string = 'https://flask-cap.onrender.com/api'
const postEndpoint: string = '/posts'


const apiClientNoAuth = () => axios.create(
    {
        baseURL: base
    }
)


async function getAllPosts(): Promise<APIResponse<PostType[]>> {
    let data;
    let error;
    try {
        const response = await apiClientNoAuth().get(postEndpoint);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)) {
            error = err.message
        } else {
            error = 'Something is wrong'
        }
    }
    return {data, error}
}

export {
    getAllPosts
}