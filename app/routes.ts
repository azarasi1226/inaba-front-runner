import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
    route("/admin", "./layout/admin/admin-layout.tsx", [
        route("product/search", "./page/admin/product/search/index.tsx"),
    ]),
] satisfies RouteConfig;
