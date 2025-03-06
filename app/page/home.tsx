import type { Route } from "./+types/home";

export async function loader({ params }: Route.LoaderArgs) {
  return {
    name: "",
    ahe: "あへええ",
    unko: "unko"
  };
}
export default function Home({
  loaderData,
}: Route.ComponentProps) {
  return (
    <>
      <p>{loaderData.unko}</p>
      <p>{loaderData.ahe}</p>
    </>
  );
}
