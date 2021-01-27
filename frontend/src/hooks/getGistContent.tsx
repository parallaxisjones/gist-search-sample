import { File } from "../components/Gist/Gist";
function getFileContent(content: { content: string, filename: string, url: string}, file: File) {

    async function fetchData(file: File) {
      const response = await fetch(file.raw_url);
      const text = await response.text();
      content.content = text;
      content.filename = file.filename;
      content.url = file.raw_url;
    }

    fetchData(file);
    return content;
}

export default getFileContent