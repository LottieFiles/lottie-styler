/**
 * Copyright 2023 Design Barn Inc.
 */

import '@uiw/react-textarea-code-editor/dist.css';
import { createStyler } from '@lottiefiles/lottie-styler';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import CodeEditor from '@uiw/react-textarea-code-editor';
import React, { useEffect, useState } from 'react';
import { useAsyncFn, useSearchParam } from 'react-use';

const useLottie = (): string | undefined => {
  const fileUrl = useSearchParam('fileUrl') || './animation.json';
  const [state, run] = useAsyncFn(async (url: string) => {
    const response = await fetch(url);
    const text = await response.text();

    return text;
  });

  useEffect(() => {
    if (fileUrl) {
      run(fileUrl);
    }
  }, [fileUrl, run]);

  return state.value;
};

const useStyler = (lss: string, lottie?: string): string | undefined => {
  const [styledLottie, setStyledLottie] = useState(lottie);

  useEffect(() => {
    if (lottie) {
      const styler = createStyler(lottie);

      const style = async (lottieStyleSheets: string): Promise<void> => {
        const file = await styler.style(lottieStyleSheets);

        setStyledLottie(file.toString());
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
 solid-color: rgba(255, 2, 243, 0.5);
}

`;

const App: React.FC = () => {
  const [lss, setLss] = useState(initialLssCode);

  const lottie = useLottie();
  const styledLottie = useStyler(lss, lottie);

  return (
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
  );
};

export default App;
