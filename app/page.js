import Link from "next/link";
import Map from "./(home)/Map";
import TopLists from "./(home)/TopLists";

export default function Home() {
  return (
    <main className=" items-center">
      <div>
        <Link href="/details/1">
          <h4
            className={`font-bold hover:text-accent-green
          `}
          >
            Test
          </h4>
        </Link>
      </div>
      <div className="flex lg:flex-row xs:flex-col sm:flex-col items-center lg:justify-start sm:justify-center xs:justify-center p-2">
        <TopLists />
        <Map />
      </div>
    </main>
  );
}
