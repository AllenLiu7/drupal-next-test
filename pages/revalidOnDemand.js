import {useState} from "react";

function RevalidOnDemand({ timestamp }) {

  const [result, setResult] = useState("");

  const revalidate = async () => {
    await fetch("/api/revalidate");
    setResult("Done. Try to refresh the page");
  }

  return (
    <div className="root">
      <h1 className="timestamp m-5">{timestamp}</h1>
      <div>{result}</div>
      <div className="actions mx-5">
        <button onClick={() => { revalidate()}}>Revalidate</button>
        <a className="mx-5" href="">Refresh</a>
      </div>

    </div>
  );
}

// This function gets called at build time
export async function getStaticProps() {
  return {
    props: {
      timestamp: new Date().toISOString()
    },
  }
}

export default RevalidOnDemand