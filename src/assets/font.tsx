const BariolRegular = "./fonts/Bariol/Bariol_Regular.otf";
const BariolRegularItalic = './fonts/Bariol/Bariol_Regular_Italic.ttf';
const BariolBold = './fonts/Bariol/Bariol_Bold.ttf';
const BariolLight = './fonts/Bariol/Bariol_Light.ttf';
const BariolSerifRegular = './fonts/Bariol/Bariol_Serif_Regular.otf';
const BariolSerifBold = './fonts/Bariol/Bariol_Serif_Bold.otf';
const BariolSerifRegularItalic = './fonts/Bariol/Bariol_Serif_Regular_Italic.otf';

export const appFonts = `
@font-face {
    font-family: 'Bariol';
    src: url(${BariolRegular}) format('opentype');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'Bariol';
    src: url('${BariolLight}') format('truetype');
    font-weight: 100;
    font-style: normal;
}
@font-face {
    font-family: 'Bariol';
    src: url('${BariolBold}') format('truetype');
    font-weight: bold;
    font-style: normal;
}
@font-face {
    font-family: 'Bariol';
    src: url('${BariolRegularItalic}') format('truetype');
    font-weight: normal;
    font-style: italic;
}
@font-face {
    font-family: 'Bariol Serif';
    src: url('${BariolSerifRegular}') format('opentype');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'Bariol Serif';
    src: url('${BariolSerifBold}') format('opentype');
    font-weight: bold;
    font-style: normal;
}
@font-face {
    font-family: 'Bariol Serif';
    src: url('${BariolSerifRegularItalic}') format('opentype');
    font-weight: normal;
    font-style: italic;
    }
`