/**
 * Copyright 2023 Design Barn Inc.
 */

import '@uiw/react-textarea-code-editor/dist.css';
import { createStyler } from '@lottiefiles/lottie-styler';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import Layout from '@theme/Layout';
import CodeEditor from '@uiw/react-textarea-code-editor';
import React from 'react';
import { useAsyncFn, useSearchParam } from 'react-use';

const useLottie = (): string | undefined => {
  const fileUrl = useSearchParam('fileUrl') || './animation.json';
  const [state, run] = useAsyncFn(async (url: string) => {
    const response = await fetch(url);
    const text = await response.text();

    return text;
  });

  React.useEffect(() => {
    if (fileUrl) {
      run(fileUrl);
    }
  }, [fileUrl, run]);

  return state.value;
};

const useStyler = (lss: string, lottie?: string): string | undefined => {
  const [styledLottie, setStyledLottie] = React.useState(lottie);

  React.useEffect(() => {
    if (lottie) {
      const styler = createStyler(lottie);

      const style = async (lottieStyleSheets: string): Promise<void> => {
        try {
          const file = await styler.style(lottieStyleSheets);

          setStyledLottie(file.toString());
        } catch (err) {
          console.error(err);
          setStyledLottie(lottie);
        }
      };

      style(lss);
    }
  }, [lss, lottie]);

  return styledLottie;
};

const initialLssCode = `
/* Lottie Style Sheets (.LSS) */
#cloud{
 fill-color: red;
 opacity: 90%
}
.cloud-borders{ 
 stroke-color: black;
 stroke-width: 4;
 opacity: 0.3;
}
.sea{
 fill-color: #F3F666;
}
#solid-cloud{
 fill-color: rgba(255, 2, 243, 0.5);
}
GradientFillShape {
  fill-color: radial-gradient(red 10%, blue 20%, green 40%, black 60%, yellow 70%, pink 100%);
}
`;

export default function Playground(): JSX.Element {
  const [lss, setLss] = React.useState(initialLssCode);

  const lottie = useLottie();
  const styledLottie = useStyler(lss, lottie);

  return (
    <Layout title="LSS Playground" description="Lottie Style Sheets Playground">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyItems: 'center', textAlign: 'center' }}>
          <h2>Original</h2>
          {lottie && (
            <Player autoplay loop src={lottie} style={{ height: '300px', width: '300px' }}>
              <Controls visible={true} buttons={['play', 'repeat', 'frame', 'debug']} />
            </Player>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <h2>Lottie Style Sheets (.LSS)</h2>
          <CodeEditor
            value={lss}
            language="css"
            placeholder={`/* Lottie Style Sheets (.LSS) */\n\n#cloud{\n fill-color: red;\n}`}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
              setLss(event.target.value);
            }}
            minHeight={300}
            style={{
              minWidth: '400px',
              fontSize: 16,
              fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
            }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyItems: 'center',
            textAlign: 'center',
          }}
        >
          <h2>Styled Lottie</h2>
          {styledLottie && (
            <Player autoplay loop src={styledLottie} style={{ height: '300px', width: 'auto' }}>
              <Controls visible={true} buttons={['play', 'repeat', 'frame', 'debug']} />
            </Player>
          )}
        </div>
      </div>
    </Layout>
  );
}
