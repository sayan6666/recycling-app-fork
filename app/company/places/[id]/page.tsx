import Link from "next/link";
import { getPoints, getCompany } from "@/app/lib/actions";
import CompanyPlaceDetailsClient from "@/app/company/places/[id]/CompanyPlaceDetailsClient";

type PageProps = {
    params: Promise<{ id: string }>;
};

export default async function placeInfoSetup({ params }: PageProps) {
    const { id } = await params;
    const company = await getCompany();
    let points = await getPoints();

    const currentCompany = company?.[0];
    points = points.filter(
        (point) => point["company_id"] == currentCompany?.["id"],
    );

    const place = points.find((point) => String(point["id"]) === id);

    if (!place) {
        return (
            <main className="company-page">
                <div className="company-container">
                    <section className="company-empty company-empty--wide">
                        <h1>Point not found</h1>
                        <p>
                            Potentially was deleted, or does not belong to this company.
                        </p>
                        <Link
                            href="/company/places"
                            className="company-btn company-btn--secondary"
                        >
                            Go back to list
                        </Link>
                    </section>
                </div>
            </main>
        );
    }

    return <CompanyPlaceDetailsClient place={place}/>
}