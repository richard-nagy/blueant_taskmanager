import axios from "axios";

const server = "http://localhost:3001/";

export default function axiosApi(type, url, data = null, response, error) {
    const stuff = { params: { username: "user0", password: "passw0" } };

    if (!Array.isArray(url)) {
        axios[type](server + url, data, stuff)
            .then((res) => {
                response(res);
            })
            .catch(() => {
                error();
            });
        return;
    }

    axios
        .all([
            axios[type[0]](server + url[0], type === "get" ? stuff : (data, stuff)),
            axios[type[1]](server + url[1], type === "get" ? stuff : (data, stuff)),
        ])
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
