import axios from 'axios';

const instance=axios.create({
    baseURL:'https://burger-builder-76627.firebaseio.com/'
});

export default instance;