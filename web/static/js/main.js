console.log("loaded")


const reader = new FileReader();
reader.onload = (evt) => {
    console.log(evt.target.result);
};

reader.readAsText("./htmx.min.js.gz");

const blob = new Blob(reader.error)

const ds = new DecompressionStream("gzip");
const decompressedStream = blob.stream().pipeThrough(ds);

