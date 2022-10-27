import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => {
	return (
		<Html>
			<Head />
			<body className="mx-auto max-w-xl bg-[#1B202C] text-[#F9FAFB]">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

export default Document;
