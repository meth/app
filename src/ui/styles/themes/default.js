export const ROOT_FONT_SIZE = 18

const color1 = '#2c3e50'
// const color2 = '#2980b9'
// const color3 = '#3498db'
const color4 = '#bedb39'
const color5 = '#fd7400'

const textColor1 = '#fff'
const textColor2 = '#ccc'

export default {
  rem: ROOT_FONT_SIZE,
  /* https://color.adobe.com/Copy-of-Vitamin-C-color-theme-10071328/edit/?copy=true&base=2&rule=Custom&selected=4&name=Copy%20of%20Copy%20of%20Vitamin%20C&mode=rgb&rgbvalues=0,0.2627450980392157,0.34509803921568627,0.12156862745098039,0.5411764705882353,0.4392156862745098,0.7450980392156863,0.8588235294117647,0.2235294117647059,1,0.8823529411764706,0.10196078431372549,0.9921568627450981,0.4549019607843137,0&swatchOrder=0,1,2,3,4 */
  header: {
    backgroundColor: color1,
    textColor: textColor1
  },
  startScreen: {
    backgroundColor: color1,
    textColor: textColor1
  },
  browser: {
    tabBar: {
      backgroundColor: '#ccc',
      tab: {
        inactive: {
          borderColor: '#999',
          backgroundColor: '#ccc'
        },
        active: {
          borderColor: '#666',
          backgroundColor: '#eee'
        }
      }
    },
    navBar: {
      borderBottomColor: '#ccc'
    }
  },
  alert: {
    error: {
      backgroundColor: color5,
      textColor: '#fff'
    },
    info: {
      backgroundColor: '#aaf',
      textColor: '#fff'
    }
  },
  modal: {
    content: {
      backgroundColor: color1,
      textColor: textColor1
    },
    overlay: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)'
    }
  },
  form: {
    textInput: {
      borderColor: '#999'
    },
    picker: {
      borderColor: color1,
      backgroundColor: textColor1,
      textColor: color1
    }
  },
  button: {
    picker: {
      enabled: {
        borderColor: textColor1,
        backgroundColor: color1,
        textColor: textColor1
      },
      disabled: {
        borderColor: textColor2,
        backgroundColor: color1,
        textColor: textColor2
      }
    },
    default: {
      enabled: {
        borderColor: color4,
        backgroundColor: color4,
        textColor: color1
      },
      disabled: {
        borderColor: '#ccc',
        backgroundColor: '#ccc',
        textColor: '#999'
      }
    }
  }
}
