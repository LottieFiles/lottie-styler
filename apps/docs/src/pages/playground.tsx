/**
 * Copyright 2023 Design Barn Inc.
 */

import '@uiw/react-textarea-code-editor/dist.css';

import { Player } from '@lottiefiles/react-lottie-player';
import { relottie } from '@lottiefiles/relottie';
import style from '@lottiefiles/relottie-style';
import Editor from '@monaco-editor/react';
import Layout from '@theme/Layout';
import React from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
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
    let lssJSON = {};

    try {
      lssJSON = JSON.parse(lss);
    } catch (_err) {
      //
    }

    if (lottie) {
      relottie()
        .data('settings', {
          parse: {
            messages: {
              warning: false,
            },
          },
        })
        .use(style, {
          lss: lssJSON,
        })
        .process(lottie)
        .then(({ value }) => {
          setStyledLottie(value);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [lss, lottie]);

  return styledLottie;
};

const initialLssJson = {
  '#cloud': {
    'fill-color': 'red',
    opacity: '90%',
  },
  '.cloud-borders': {
    'stroke-color': 'black',
    'stroke-width': '4',
    opacity: '0.3',
  },
  '.sea': {
    'fill-color': '#F3F666',
  },
  '#solid-cloud': {
    'fill-color': 'rgba(255, 2, 243, 0.5)',
  },
  GradientFillShape: {
    'fill-color': 'radial-gradient(red 10%, blue 20%, green 40%, black 60%, yellow 70%, pink 100%)',
  },
};

export default function Playground(): JSX.Element {
  const [lss, setLss] = React.useState(() => JSON.stringify(initialLssJson, null, 2));

  const lottie = useLottie();
  const styledLottie = useStyler(lss, lottie);

  return (
    <Layout title="LSS Playground" description="Lottie Style Sheets Playground">
      <PanelGroup direction="horizontal" className="h-full">
        <Panel minSize={80}>
          <Editor
            className="flex-1 h-full"
            language={'json'}
            width="100%"
            theme="vs-dark"
            options={{
              fontSize: 15,
              formatOnPaste: true,
              formatOnType: true,
              minimap: {
                enabled: false,
              },
            }}
            loading="Loading..."
            value={lss}
            onChange={(value): void => {
              setLss(value);
            }}
          />
        </Panel>
        <PanelResizeHandle className="bg-gray-500 w-1" />
        <Panel>
          {lottie && <Player autoplay loop src={lottie}></Player>}
          {styledLottie && <Player autoplay loop src={styledLottie}></Player>}
        </Panel>
      </PanelGroup>
    </Layout>
  );
}
