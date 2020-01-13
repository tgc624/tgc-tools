import React from "react";
// 参考https://blog.vivita.io/entry/2019/04/08/070000
const VideoUploader = ({ setFileSrc }: any) => {
  const onLoad = (setSrc: (arg: any) => void) => (event: any) => {
    const src = event.target?.result;
    if (src) {
      setSrc(src);
    }
  };
  const onChange = (setSrc: (arg: any) => void) => (event: any) => {
    event.persist();
    const file = event?.target?.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = onLoad(setSrc);
    reader.readAsDataURL(file);
  };
  return (
    <section>
      <input type="file" onChange={onChange(setFileSrc)} />
    </section>
  );
};
const VideoViewer = ({ src }: { src?: string }) => {
  if (!src) {
    return <section></section>;
  }
  return (
    <section>
      <video controls src={src} width="100%"></video>
    </section>
  );
};

const VideoEditor: React.FC = () => {
  const [fileSrc, setFileSrc] = React.useState("");
  return (
    <article>
      <header>
        <h1>動画編集</h1>
      </header>
      <VideoUploader setFileSrc={setFileSrc} />
      <VideoViewer src={fileSrc} />
    </article>
  );
};

export default VideoEditor;
