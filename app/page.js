import Map from "./(shared)/Map";
import TopLists from "./(shared)/TopLists";

export default function Home() {
  return (
    <main className="flex lg:flex-row xs:flex-col sm:flex-col items-center lg:justify-start sm:justify-center xs:justify-center p-2">
      <TopLists />
      <Map />
    </main>
  );
}
