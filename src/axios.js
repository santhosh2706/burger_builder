import axios from 'axios';

const instance=axios.create({
    baseURL:'[DB_URL]'
});

export default instance;
