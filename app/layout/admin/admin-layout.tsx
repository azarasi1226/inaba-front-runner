import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { AppSidebar } from "./sidebar"
import { Outlet } from "react-router";

export default function AdminLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
                <Outlet />
            </main>
        </SidebarProvider>
    )
}

// export function ErrorBoundary() {
//     return ErrorPage()
// }

// export function ErrorPage() {
//     const error = useRouteError();

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
//             <div className="bg-white shadow-md rounded-lg p-8 max-w-lg text-center">
//                 <h1 className="text-4xl font-bold text-red-500 mb-4">
//                     {isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : "エラーが発生しました"}
//                 </h1>
//                 <p className="text-lg text-gray-600 mb-6">
//                     {isRouteErrorResponse(error)
//                         ? error.data || "リクエストの処理中にエラーが発生しました。"
//                         : error instanceof Error
//                             ? error.message
//                             : "不明なエラーが発生しました。"}
//                 </p>
//                 {error instanceof Error && (
//                     <details className="bg-gray-100 p-4 rounded-lg text-left text-sm text-gray-600">
//                         <summary className="cursor-pointer font-semibold text-gray-800">
//                             スタックトレースの表示
//                         </summary>
//                         <pre className="mt-2 whitespace-pre-wrap">{error.stack}</pre>
//                     </details>
//                 )}
//             </div>
//         </div>
//     );
// }