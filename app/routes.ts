import { type RouteConfig, index, prefix, layout, route } from "@react-router/dev/routes";

export default [
    ...prefix("/admin", [
        layout("./layout/admin/admin-layout.tsx", [
            index("./page/home.tsx")
        ]),
    ])
] satisfies RouteConfig;
