import Color from 'color'

export const ROOT_FONT_SIZE = 18

const color1 = '#2c3e50'
const color2 = '#2980b9'
const color3 = '#3498db'
const color4 = '#bedb39'
const color5 = '#fd7400'
const color6 = '#1F8A70'
const color7 = '#FFE11A'

const colorBlack = '#000'
const colorWhite = '#fff'
const colorLightGray = '#ccc'
const colorGray = '#9a9a9a'
const colorDarkGray = '#777'

/* https://color.adobe.com/Copy-of-Vitamin-C-color-theme-10071328/edit/?copy=true&base=2&rule=Custom&selected=4&name=Copy%20of%20Copy%20of%20Vitamin%20C&mode=rgb&rgbvalues=0,0.2627450980392157,0.34509803921568627,0.12156862745098039,0.5411764705882353,0.4392156862745098,0.7450980392156863,0.8588235294117647,0.2235294117647059,1,0.8823529411764706,0.10196078431372549,0.9921568627450981,0.4549019607843137,0&swatchOrder=0,1,2,3,4 */

const toRgbWithAlpha = (color, opacity) => (
  `rgba(${
    Color(color && color.hex ? color.hex() : color).rgb().array().join(', ')
  }, ${opacity})`
)


const buttonDisabledStyles = {
  default: {
    borderColor: colorLightGray,
    backgroundColor: colorLightGray,
    textColor: colorGray
  },
  hover: {
    borderColor: colorLightGray,
    backgroundColor: colorLightGray,
    textColor: colorGray
  }
}


export default {
  rem: ROOT_FONT_SIZE,
  header: {
    backgroundColor: color1,
    textColor: colorLightGray,
    dividerColor: Color(color1).lighten(0.5).hex()
  },
  startScreen: {
    backgroundColor: color1,
    textColor: colorWhite,
    linkTextColor: colorGray
  },
  browser: {
    tabBar: {
      backgroundColor: color2,
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
  log: {
    unseenAlert: {
      backgroundColor: color2,
      textColor: colorWhite,
      metaTextColor: Color(color2).lighten(0.2).hex()
    },
    event: {
      backgroundColor: colorWhite,
      textColor: colorBlack,
      metaTextColor: colorLightGray,
      warnColor: color7,
      errorColor: color5,
      alertColor: color2
    }
  },
  modal: {
    content: {
      backgroundColor: color1,
      textColor: colorWhite
    },
    overlay: {
      backgroundColor: toRgbWithAlpha(colorWhite, 0.8)
    },
    alert: {
      overlay: {
        backgroundColor: toRgbWithAlpha(colorBlack, 0.8)
      }
    },
    log: {
      overlay: {
        backgroundColor: toRgbWithAlpha(colorWhite, 0.8)
      }
    },
    connectNode: {
      darkTextColor: colorGray
    }
  },
  form: {
    textInput: {
      blurred: {
        borderColor: 'transparent',
        backgroundColor: colorWhite,
        textColor: colorBlack,
        placeholderTextColor: colorGray
      },
      focussed: {
        borderColor: 'transparent',
        backgroundColor: colorWhite,
        textColor: colorBlack,
        placeholderTextColor: colorGray
      }
    },
    picker: {
      borderColor: color1,
      backgroundColor: colorWhite,
      hoverBackgroundColor: colorLightGray,
      textColor: color1
    },
    section: {
      layout: {
        borderColor: colorLightGray
      },
      title: {
        textColor: colorLightGray
      }
    },
    switch: {
      on: {
        trackColor: color2,
        thumbColor: color3,
        label: {
          textColor: colorWhite
        }
      },
      off: {
        trackColor: colorLightGray,
        thumbColor: colorDarkGray,
        label: {
          textColor: colorGray
        }
      }
    },
    checkbox: {
      on: {
        box: {
          backgroundColor: 'transparent',
          borderColor: colorWhite,
          tickIconColor: colorWhite
        },
        label: {
          textColor: colorWhite
        }
      },
      off: {
        box: {
          backgroundColor: 'transparent',
          borderColor: colorDarkGray,
          tickIconColor: colorDarkGray
        },
        label: {
          textColor: colorDarkGray
        }
      }
    }
  },
  button: {
    picker: {
      enabled: {
        default: {
          borderColor: colorWhite,
          backgroundColor: color1,
          textColor: colorWhite
        },
        hover: {
          borderColor: colorWhite,
          backgroundColor: color1,
          textColor: colorWhite
        }
      },
      disabled: { ...buttonDisabledStyles }
    },
    mask: {
      enabled: {
        default: {
          borderColor: color6,
          backgroundColor: toRgbWithAlpha(color6, 0.97),
          textColor: colorWhite
        },
        hover: {
          borderColor: color6,
          backgroundColor: toRgbWithAlpha(Color(color6).lighten(0.2), 0.97),
          textColor: colorWhite
        }
      },
      disabled: { ...buttonDisabledStyles }
    },
    browserTab: {
      enabled: {
        default: {
          borderColor: 'transparent',
          backgroundColor: 'transparent',
          textColor: colorGray
        },
        hover: {
          borderColor: 'transparent',
          backgroundColor: colorGray,
          textColor: colorLightGray
        }
      },
      disabled: { ...buttonDisabledStyles }
    },
    browserPanel: {
      enabled: {
        default: {
          borderColor: 'transparent',
          backgroundColor: 'transparent',
          textColor: color3
        },
        hover: {
          borderColor: 'transparent',
          backgroundColor: color3,
          textColor: color2
        }
      },
      disabled: { ...buttonDisabledStyles }
    },
    header: {
      enabled: {
        default: {
          borderColor: 'transparent',
          backgroundColor: 'transparent',
          textColor: colorGray
        },
        hover: {
          borderColor: 'transparent',
          backgroundColor: Color(color1).lighten(0.5).hex(),
          textColor: colorWhite
        }
      },
      disabled: { ...buttonDisabledStyles }
    },
    default: {
      enabled: {
        default: {
          borderColor: color4,
          backgroundColor: color4,
          textColor: color1
        },
        hover: {
          borderColor: color4,
          backgroundColor: Color(color4).lighten(0.2).hex(),
          textColor: color1
        }
      },
      disabled: { ...buttonDisabledStyles }
    }
  },
  mnemonic: {
    confirmationBox: {
      backgroundColor: color7,
      textColor: color1
    },
    backgroundColor: color3,
    textColor: colorWhite
  }
}
