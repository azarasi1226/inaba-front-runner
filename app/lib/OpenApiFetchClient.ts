import createClient, { type Middleware } from "openapi-fetch";
import type { paths } from "../../api/schema";

// 何らかのエラーが起こった際、例外をthrowするようにするミドルウェア
const fetchResponseRaiseErrorMiddleware: Middleware = {
    onResponse({ response }) {
        if (response.status >= 400) {
            console.error("APIの通信でエラーが発生しました");
            throw new Response(response.body, { status: response.status });
        }
        return response;
    },
};

export const openApiFetchClient = createClient<paths>({ baseUrl: "http://localhost:8082" });
openApiFetchClient.use(fetchResponseRaiseErrorMiddleware);
