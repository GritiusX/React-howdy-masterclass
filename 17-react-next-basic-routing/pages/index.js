import Link from "next/link";
//our-domain.com/

function HomePage() {
	return (
		<>
			<h1>The Home Page</h1>
			<ul>
				<li>
					<Link href="/news/test1">test1</Link>
				</li>
				<li>
					<Link href="/news/test2">test2</Link>
				</li>
			</ul>
		</>
	);
}
export default HomePage;
