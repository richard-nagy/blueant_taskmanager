import axios from "axios";

const server = "http://localhost:3001/";

export default function axiosApi(type, url, data, response, error) {
    data = { params: { username: "user6", password: "passw0" }, ...data };

    if (!Array.isArray(url)) {
        axios[type](server + url, data)
            .then((res) => {
                response(res);
            })
            .catch(() => {
                error();
            });
        return;
    }

    axios
        .all([axios[type[0]](server + url[0], data), axios[type[1]](server + url[1], data)])
        .then(
            axios.spread((res1, res2) => {
                response(res1, res2);
            })
        )
        .catch((err) => {
            alert(err.response.data.message);
            error();
        });
}
