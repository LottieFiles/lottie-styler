/**
 * Copyright 2023 Design Barn Inc.
 */

import { createStyler } from '@lottiefiles/lottie-styler';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import type { Monaco } from '@monaco-editor/react';
import Editor from '@monaco-editor/react';
import React from 'react';

interface IProps {
  code: string;
  fileUrl: string;
}

const Loader = (): JSX.Element => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '200px',
      width: '200px',
    }}
  >
    Loading...
  </div>
);

export default function Example(props: IProps): JSX.Element {
  const { fileUrl } = props;

  const [code, setCode] = React.useState<string>(props.code);
  const [loading, setLoading] = React.useState<boolean>(true);

  const [animationData, setAnimationData] = React.useState<string>('');
  const [styledAnimationData, setStyledAnimationData] = React.useState<string>('');

  React.useLayoutEffect(() => {
    async function load(): Promise<void> {
      setLoading(true);
      const response = await fetch(fileUrl);

      setAnimationData(await response.text());
      setLoading(false);
    }

    load();
  }, [fileUrl]);

  React.useEffect(() => {
    async function style(): Promise<void> {
      if (animationData) {
        try {
          const styler = createStyler(animationData);

          const out = await styler.style(code);

          setStyledAnimationData(out.toString());
        } catch (err) {
          console.log(err);
        }
      }
    }

    style();
  }, [code, animationData]);

  function editorWillMount(monaco: Monaco): void {
    monaco.languages.css.cssDefaults.options.lint.unknownProperties = 'ignore';
  }

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: '8px',
      }}
    >
      <div style={{ flex: 1, height: '100%' }}>
        <Editor
          options={{
            minimap: {
              enabled: false,
            },
          }}
          onChange={(value): void => setCode(value)}
          defaultLanguage="css"
          value={code}
          height="200px"
          width="100%"
          beforeMount={editorWillMount}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flex: 0.5,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {loading ? (
          <Loader />
        ) : (
          <Player
            style={{
              height: '200px',
              minWidth: '200px',
            }}
            src={styledAnimationData}
            autoplay
            loop
          >
            <Controls />
          </Player>
        )}
      </div>
    </div>
  );
}
