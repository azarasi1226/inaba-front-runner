import { type RouteConfig, index, prefix, layout, route } from "@react-router/dev/routes";

export default [

    // route("products", "./page/admin/product/Products.tsx"),
    route("productsInsert", "./page/admin/product/ProductsInsert.tsx"),
    
    // ...prefix("products", [
    //     route(":productId", "./page/admin/product/ProductsDetail.tsx"),
    //     ]),

    route("admin", "./layout/admin/admin-layout.tsx", [
        index("./page/admin/product/search-product.tsx"),
       // route("search-product", "./page/admin/product/search-product.tsx")
    ])
] satisfies RouteConfig;
