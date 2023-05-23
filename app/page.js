import Image from "next/image";
import Map from "./(shared)/Map";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start p-2">
      <Map />
    </main>
  );
}
