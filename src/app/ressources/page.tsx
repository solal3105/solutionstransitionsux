import { redirect } from "next/navigation";

// /ressources is now merged into the unified hub at /fiches
export default function RessourcesPage() {
  redirect("/fiches?type=ressource");
}
