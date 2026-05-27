import Link from "next/link";
import { getPoints, getCompany } from "@/app/lib/actions";
import CompanyPlaceDetailsPage from "../company/places/[id]/page";

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
                        <h1>Точка не найдена</h1>
                        <p>
                            Возможно, точка была удалена или не принадлежит текущей компании.
                        </p>
                        <Link
                            href="/company/places"
                            className="company-btn company-btn--secondary"
                        >
                            Вернуться к списку
                        </Link>
                    </section>
                </div>
            </main>
        );
    }

    return <CompanyPlaceDetailsCkient place={place}/>
}