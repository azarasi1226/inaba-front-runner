import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "~/components/ui/sidebar"
import { FilePlus2 , Home, Inbox, Search, Settings } from "lucide-react"
 
const menus = [
  { 
    groupTitle: "商品",
    items: [
      {
        title: "商品登録",
        url: "/admin/product/create",
        icon: FilePlus2,
      },
      {
        title: "商品検索",
        url: "/admin/product/search",
        icon: Search,
      }
    ]
  },
  {
    groupTitle: "ブランド",
    items: [
      {
        title: "ブランド登録",
        url: "/admin/brand/create",
        icon: FilePlus2,
      },
      {
        title: "ブランド検索",
        url: "/admin/brand/search",
        icon: Search,
      }
    ]
  },
  {
    groupTitle: "ユーザー",
    items: [
      {
        title: "ユーザー検索",
        url: "/admin/users",
        icon: Search,
      },
    ]
  }
]

export function AppSidebar() {
  return (
      <Sidebar>
      <SidebarContent>
        {menus.map((menu) => (
          <SidebarGroup key={menu.groupTitle}>
            <SidebarGroupLabel>{menu.groupTitle}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menu.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}