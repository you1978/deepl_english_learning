import axios, { AxiosInstance } from "axios";

//const BASE_URL = "http://localhost:3000/api"
//const BASE_URL = "https://d33a2u3dm2hqzc.cloudfront.net/api"
const BASE_URL = "https://oobwhr9vsh.execute-api.ap-northeast-1.amazonaws.com/Prod"
export class ApiClientSecret {
    private instance: AxiosInstance
    constructor() {
        this.instance = axios.create({
            baseURL: BASE_URL,
            timeout: 10000
        });
    }

    public async get(path: string, params: Object) {
        return this.instance.get(path, {
            params
        })
    }

    public async post(path: string, body: Object) {
        return this.instance.post(path, {
            data: body
        })
    }

}