import { type RouteConfig, index, prefix, layout, route } from "@react-router/dev/routes";

export default [
    route("/admin", "./layout/admin/admin-layout.tsx", [
        //index("./page/admin/product/search-product.tsx"),
        route("product/search", "./page/admin/product/search-product.tsx")
    ])
] satisfies RouteConfig;
