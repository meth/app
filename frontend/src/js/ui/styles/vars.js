exports.COLORS = {
  /* https://color.adobe.com/create/color-wheel/?copy=true&base=1&rule=Custom&selected=0&name=Copy%20of%20Flat%20UI&mode=rgb&rgbvalues=0.172549,0.243137,0.313725,0.905882,0.298039,0.235294,0.92549,0.941176,0.945098,0.203922,0.596078,0.858824,0.160784,0.501961,0.72549&swatchOrder=0,1,2,3,4 */
  c1: "#2C3E50",
  c2: "#E74C3C",
  c3: "#ECF0F1",
  c4: "#3498DB",
  c5: "#2980B9",
  white: "#fff", 
  black: "#000",
  light_gray: '#999',
};


const FONT_PATH = '../fonts/';

exports.FONTS = {
  body: 'Verdana',
  roboto: {
    Regular: {
      fontFamily: "RobotoRegular",
      fontStyle: 'normal',
      fontWeight: 300,
      src: `url('${FONT_PATH}/roboto/Roboto-Regular') format('ttf')`    
    },
    RegularItalic: {
      fontFamily: "RobotoRegularItalic",
      fontStyle: 'italic',
      fontWeight: 300,
      src: `url('${FONT_PATH}/roboto/Roboto-Italic') format('ttf')`    
    },
    Light: {
      fontFamily: "RobotoLight",
      fontStyle: 'normal',
      fontWeight: 100,
      src: `url('${FONT_PATH}/roboto/Roboto-Light') format('ttf')`    
    },
    LightItalic: {
      fontFamily: "RobotoLightItalic",
      fontStyle: 'italic',
      fontWeight: 100,
      src: `url('${FONT_PATH}/roboto/Roboto-LightItalic') format('ttf')`    
    },
    Medium: {
      fontFamily: "RobotoMedium",
      fontStyle: 'normal',
      fontWeight: 500,
      src: `url('${FONT_PATH}/roboto/Roboto-Medium') format('ttf')`    
    },
    MediumItalic: {
      fontFamily: "RobotoMediumItalic",
      fontStyle: 'italic',
      fontWeight: 500,
      src: `url('${FONT_PATH}/roboto/Roboto-MediumItalic') format('ttf')`    
    },
    Bold: {
      fontFamily: "RobotoBold",
      fontStyle: 'normal',
      fontWeight: 700,
      src: `url('${FONT_PATH}/roboto/Roboto-Bold') format('ttf')`    
    },
    BoldItalic: {
      fontFamily: "RobotoBoldItalic",
      fontStyle: 'italic',
      fontWeight: 700,
      src: `url('${FONT_PATH}/roboto/Roboto-BoldItalic') format('ttf')`    
    },    
  },
};
