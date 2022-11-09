import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
    return (
        <Html>
            <Head />
            <body className="flex flex-col font-body min-h-screen bg-gray-100 dark:bg-gray-900">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

export default Document;
