import { redirect } from "next/navigation";
import { lessons } from "@/lib/curriculum";
export default function LearnIndex() { redirect(`/learn/${lessons[0].slug}`); }
