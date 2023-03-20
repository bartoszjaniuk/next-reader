import { UploadFile } from "@/components/UploadFile/UploadFile";
import { Inter } from "next/font/google";
import { Layout } from "../components/Layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="mt-10">
      <UploadFile />
    </div>
  );
}
