import axios from "axios";

const server = "http://localhost:3001/";

export default function axiosApi(type, url, data, response, error) {
    axios[type](server + url, data)
        .then((res) => {
            response(res);
        })
        .catch(function () {
            error();
        });
}
