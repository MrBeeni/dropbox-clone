import { ArrowBigRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-10 p-5 bg-[#1e1919] md:p-10 md:flex-row md:gap-2 dark:bg-slate-800">
      <div>
        <div className="flex flex-col gap-10 text-white">
          <h1 className="text-5xl font-bold">
            welcome to dropbox.
            <br />
            <br />
            Storing everything for you and your business needs. All in one place
          </h1>
          <p className=" text-justify">
            Enhance your personal storage with Dropbox. We offers seamless file
            synchronization across devices, enabling users to access their
            documents, photos, and videos from anywhere. Its collaborative
            features allow real-time sharing and editing of files, enhancing
            team productivity. With version history and file recovery, Dropbox
            ensures data integrity. Its user-friendly interface and
            cross-platform compatibility make it a versatile cloud storage
            solution.
          </p>
          <Link
            href="/dashboard"
            className="flex gap-2 items-center text-lg font-bold bg-blue-500 px-5 py-3 w-fit cursor-pointer rounded-lg"
          >
            Try it for free
            <ArrowRight className="" />
          </Link>
        </div>
      </div>
      <div className="h-full ">
        <video autoPlay loop muted className="rounded-lg">
          <source src="/Dropbox.com.mp4" />
        </video>
      </div>
    </main>
  );
}
