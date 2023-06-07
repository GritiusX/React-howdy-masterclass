import { useRouter } from "next/router";
//our-domain.com/news/detail
function DetailPage() {
	const router = useRouter();
	console.log(router.query.newsId);
	return <h1>The Detail Page</h1>;
}
export default DetailPage;
