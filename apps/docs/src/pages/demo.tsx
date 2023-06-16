/**
 * Copyright 2023 Design Barn Inc.
 */

/* eslint-disable no-secrets/no-secrets */

import { createStyler } from '@lottiefiles/lottie-styler';
import { Player } from '@lottiefiles/react-lottie-player';
import React from 'react';

function Animation({ src }: { src: string }): JSX.Element {
  return (
    <div className="w-[300px] h-[300px] border">
      <Player src={src} autoplay loop />
    </div>
  );
}

const animations: string[] = [
  'https://assets2.lottiefiles.com/packages/lf20_Mp5Zsg1rAG.json',
  'https://assets9.lottiefiles.com/packages/lf20_O4XdR0iORJ.json',
  'https://assets5.lottiefiles.com/packages/lf20_2fTP0cWkg2.json',
];

const theme1 = `
FillShape {
  fill-color: #ED824D
}

StrokeShape {
  stroke-color: blue;
  stroke-width: 1
}
`;

const theme2 = `
FillShape {
  fill-color: white
}

StrokeShape {
  stroke-color: red;
  stroke-width: 1
}
`;

const defaultTheme = ``;

const themes: Record<string, string> = {
  dark: theme1,
  light: theme2,
  default: defaultTheme,
};

async function fetchAnimations(urls: string[]): Promise<string[]> {
  return Promise.all(urls.map(async (url) => fetch(url).then(async (res) => res.text())));
}

export default function Demo(): JSX.Element {
  const [theme, setTheme] = React.useState<'dark' | 'light' | 'default'>('default');
  const [lotties, setLotties] = React.useState([]);
  const [styledLotties, setStyledLotties] = React.useState([]);

  React.useEffect(() => {
    fetchAnimations(animations)
      .then((res) => setLotties(res))
      .catch((err) => console.error(err));
  }, []);

  React.useEffect(() => {
    const stylers = lotties.map((lottie) => createStyler(lottie));
    const lss = themes[theme];

    if (lss) {
      Promise.all(stylers.map((styler) => styler.style(lss)))
        .then((vFiles) => {
          const themedLotties = vFiles.map((vFile) => vFile.toString()) as string[];

          setStyledLotties(themedLotties);
        })
        .catch((err) => console.error(err));
    } else {
      setStyledLotties(lotties);
    }
  }, [lotties, theme]);

  return (
    <>
      <div className={`mr-auto ml-auto mt-10 w-90`}>
        <div className="flex flex-row flex-wrap items-center justify-center mb-12">
          <button
            onClick={(): void => setTheme('default')}
            type="button"
            autoFocus={theme === 'default'}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4  focus:bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
          >
            Default
          </button>
          <button
            onClick={(): void => setTheme('dark')}
            type="button"
            autoFocus={theme === 'dark'}
            className="text-white bg-orange-700 hover:bg-blue-800 focus:ring-4  focus:bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
          >
            Orange
          </button>
          <button
            onClick={(): void => setTheme('light')}
            type="button"
            autoFocus={theme === 'light'}
            className="text-white bg-gray-700 hover:bg-blue-800 focus:ring-4  focus:bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
          >
            Light
          </button>
        </div>
      </div>
      <div className="flex flex-wrap justify-around">
        {(styledLotties.length > 0 ? styledLotties : lotties).map((lottie) => (
          <Animation src={lottie} />
        ))}
      </div>
    </>
  );
}
