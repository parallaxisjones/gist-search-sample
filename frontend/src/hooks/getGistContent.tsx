/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react"
import { File } from "../components/Gist/Gist";

interface Descriptor {
  content: string;
  filename: string;
  url: string;
}

function getFileContent(file: File) {
    const [content, setContent] = useState<Descriptor>();
      useEffect(() => {
        async function fetchData(file: File) {
          const response = await fetch(file.raw_url);
          const text = await response.text();
          setContent({
            url: file.raw_url,
            content: text,
            filename: file.filename
          });
        }
        fetchData(file);
      });
    return content;
}

export default getFileContent